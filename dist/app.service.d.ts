import { CreateTxDto } from './dtos/create-tx.dto';
import { UtxoDto } from "./dtos/utxo.dto";
export declare class AppService {
    getHeight(): Promise<number>;
    getUtxo(address: string): Promise<UtxoDto[]>;
    createRawTransaction(info: CreateTxDto): Promise<string>;
}
