import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsWalletAddress } from '../decorators/is-wallet-address.decorator';

export class GetUtxoDto {

  @IsNotEmpty()
  @IsString()
  @IsWalletAddress()
  @ApiProperty({
    required: true,
    example: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
    description: 'address',
  })
  address: string;
  
}