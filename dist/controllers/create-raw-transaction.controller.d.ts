import { CreateTxDto } from '../dtos/create-tx.dto';
import { TxDto } from '../dtos/tx.dto';
import { AppService } from '../app.service';
export declare class CreateRawTransactionController {
    private appService;
    constructor(appService: AppService);
    CreateRawTransaction(createTx: CreateTxDto): Promise<TxDto>;
}
