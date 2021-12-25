import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTxDto } from './dtos/create-tx.dto';
import { UtxoDto } from "./dtos/utxo.dto";
import axios from 'axios';
import { NETWORK, FEE_PER_BYTE, BYTES_PER_IN, BYTES_PER_OUT, CONST_BYTES } from './config';

@Injectable()
export class AppService {

  async getHeight(): Promise<number> {
    const url = `https://api.bitcore.io/api/BTC/${NETWORK}/block/tip`;
    let response;
    try {
      response = await axios.get(url);
    }
    catch {
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return response.data.height;
  }

  async getUtxo(address: string): Promise<UtxoDto[]> {
    const url = `https://api.bitcore.io/api/BTC/${NETWORK}/address/${address}?unspent=true&limit=0`;
    let response;
    try {
      response = await axios.get(url);
    } catch {
      throw new HttpException(
        'Service Unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const utxo: UtxoDto[] = [];

    response.data.forEach((res) => {
      utxo.push(new UtxoDto(res));
    });

    utxo.sort(function (first, second) {
      return second.value - first.value;
    });

    return utxo;
  }

  async createRawTransaction(info: CreateTxDto): Promise<string> {
    const bitcoin = await require('bitcoinjs-lib');

    const network = await bitcoin.networks[NETWORK];

    const psbt = new bitcoin.Psbt({ network: network });

    const utxo = await this.getUtxo(info.addressFrom);

    let change = 0 - info.amount;
    let bytes = CONST_BYTES + BYTES_PER_OUT;

    for (const u of utxo) {
      change += u.value;
      bytes += BYTES_PER_IN;

      const url = `https://blockstream.info/${NETWORK}/api/tx/${u.txId}/hex`;
      let response;
      try {
        response = await axios.get(url);
      } catch {
        throw new HttpException(
          'Service Unavailable',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      await psbt.addInput({
        hash: u.txId,
        index: u.vout,
        nonWitnessUtxo: Buffer.from(response.data, 'hex'),
      });

      if (change >= bytes * FEE_PER_BYTE) break;
    }

    psbt.addOutput({
      address: info.addressTo,
      value: info.amount,
    });

    if (change < bytes * FEE_PER_BYTE)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    if (change > (bytes + BYTES_PER_OUT) * FEE_PER_BYTE) {
      psbt.addOutput({
        address: info.addressFrom,
        value: change - (bytes + BYTES_PER_OUT) * FEE_PER_BYTE,
      });
    }

    if (info.addressFromWif !== undefined) {
      try {
        const keypair = bitcoin.ECPair.fromWIF(info.addressFromWif, network);
        await psbt.signAllInputs(keypair);
        psbt.validateSignaturesOfAllInputs();
        psbt.finalizeAllInputs();
        const tx = psbt.extractTransaction();
        return tx.toHex();
      }
      catch {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    }
    else {
      const tx = psbt.__CACHE.__TX;
      return tx.toHex();
    }
  }

}

/*
testnet wallets

addr mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et
wif cUrnQ6qZL7pXxAb98QjwSyghY6xqvk2aevb8DvNzMMk42543WpVU

addr n1ufspXJwafVPxyHgYbTCdDq3S74m9zTV1
  wif cSgbuGskc6zEdNjEimTiA5Sy5UKAMfQ7mW8DYd1o5u5QW3X3PaTo

addr myUTdCQdxVeetCYs26zLzjv88dfbgyYTpN
wif cQRSeouTePvptrw2e3XD6vABwQAmyKPaHxJNPTG29PpDo3wKziW8
 */
