import { AppService } from '../app.service';
import { GetUtxoDto } from '../dtos/get-utxo.dto';
import { UtxoDto } from "../dtos/utxo.dto";
export declare class GetUtxoController {
    private appService;
    constructor(appService: AppService);
    getUtxo(getUtxo: GetUtxoDto): Promise<UtxoDto[]>;
}
