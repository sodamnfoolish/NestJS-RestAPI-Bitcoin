export declare class UtxoDto {
    txId: string;
    vout: number;
    value: number;
    address: string;
    scriptPubKey: string;
    confirmations: number;
    constructor(data: {
        mintTxid: string;
        mintIndex: number;
        value: number;
        address: string;
        script: string;
        confirmations: number;
    });
}
