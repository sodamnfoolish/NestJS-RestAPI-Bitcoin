import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTxDto } from '../dtos/create-tx.dto';
import { TxDto } from '../dtos/tx.dto';
import { AppService } from '../app.service';

@ApiTags('Requests')
@Controller('create-raw-transaction')
export class CreateRawTransactionController {

  constructor(private appService: AppService) {}

  @Post()
  @ApiBody({ type: CreateTxDto, description: 'CreateTxDto'})
  @ApiResponse({ type: TxDto, description: 'Created', status: HttpStatus.CREATED })
  @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ description: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true }))
  async CreateRawTransaction(@Body() createTx: CreateTxDto): Promise<TxDto> {

    return new TxDto(await this.appService.createRawTransaction(createTx));

  }

}
