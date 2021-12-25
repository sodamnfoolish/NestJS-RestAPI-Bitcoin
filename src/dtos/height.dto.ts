import { ApiProperty } from '@nestjs/swagger';
import { NETWORK } from "../config";

export class HeightDto {

  @ApiProperty({
    required: true,
    example: 2101816,
    description: `current ${NETWORK} height`
  })
  height: number;
  constructor(height: number) {
    this.height = height;
  }
  
}