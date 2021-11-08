import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IsWalletAddress } from '../decorators/is-wallet-address.decorator';

export class CreateTxDto {
  @IsNotEmpty()
  @IsString()
  @IsWalletAddress()
  @ApiProperty({
    required: true,
    example: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
    description: 'address from',
  })
  addressFrom: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'cUrnQ6qZL7pXxAb98QjwSyghY6xqvk2aevb8DvNzMMk42543WpVU',
    description: 'WIF address from',
  })
  addressFromWif?: string;

  @IsNotEmpty()
  @IsString()
  @IsWalletAddress()
  @ApiProperty({
    required: true,
    example: 'n1ufspXJwafVPxyHgYbTCdDq3S74m9zTV1',
    description: 'address to',
  })
  addressTo: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: true,
    example: 1000,
    description: 'amount (value in satoshis)',
  })
  amount: number;
}
