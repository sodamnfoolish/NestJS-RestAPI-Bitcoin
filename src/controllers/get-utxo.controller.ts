import { Controller, Get, HttpStatus, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../app.service';
import { GetUtxoDto } from '../dtos/get-utxo.dto';
import { UtxoDto } from "../dtos/utxo.dto";

@ApiTags('Requests')
@Controller('get-utxo')
export class GetUtxoController {
  constructor(private appService: AppService) {}
  @Get(':address')
  @ApiResponse({ type: UtxoDto, isArray: true, description: 'OK', status: HttpStatus.OK })
  @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ description: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true }))
  async getUtxo(@Param() getUtxo: GetUtxoDto): Promise<UtxoDto[]> {
    return await this.appService.getUtxo(getUtxo.address);
  }
}
