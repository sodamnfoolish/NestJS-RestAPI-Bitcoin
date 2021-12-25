import { Controller, Get, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../app.service';
import { HeightDto } from "../dtos/height.dto";

@ApiTags('Requests')
@Controller('get-height')
export class GetHeightController {

  constructor(private appService: AppService) {}

  @Get()
  @ApiResponse({ type: HeightDto, description: 'OK', status: HttpStatus.OK })
  @ApiResponse({ description: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true }))
  async getHeight(): Promise<HeightDto> {

    return new HeightDto(await this.appService.getHeight());

  }

}
