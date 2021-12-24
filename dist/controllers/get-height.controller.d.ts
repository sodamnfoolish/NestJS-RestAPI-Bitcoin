import { AppService } from '../app.service';
import { HeightDto } from "../dtos/height.dto";
export declare class GetHeightController {
    private appService;
    constructor(appService: AppService);
    getHeight(): Promise<HeightDto>;
}
