import { ApiProperty } from '@nestjs/swagger';

export class UtxoDto {
  
  @ApiProperty({
    required: true,
    example: '499804075c59befe501c29ec60747c54802396b5a64bd0d81e6cb471787b5a80',
    description: 'tx id(hash) in UTXO'
  })
  txId: string;

  @ApiProperty({
    required: true,
    example: 1,
    description: 'index of tx output in UTXO'
  })
  vout: number;

  @ApiProperty({
    required: true,
    example: 471214,
    description: 'amount of tx output in UTXO (value in satoshi)'
  })
  value: number;

  @ApiProperty({
    required: true,
    example: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
    description: 'address in UTXO'
  })
  address: string;

  @ApiProperty({
    required: true,
    example: '76a9143af4213a8c4d691197a901ad3122b1ffb5885b7288ac',
    description: 'scriptPubKey in UTXO'
  })
  scriptPubKey: string;

  @ApiProperty({
    required: true,
    example: -1,
    description: 'number of confirmed blocks'
  })
  confirmations: number;

  constructor(data: {
    mintTxid: string;
    mintIndex: number;
    value: number;
    address: string;
    script: string;
    confirmations: number;
  }) {
    this.txId = data.mintTxid;
    this.vout = data.mintIndex;
    this.value = data.value;
    this.address = data.address;
    this.scriptPubKey = data.script;
    this.confirmations = data.confirmations;
  }

}

