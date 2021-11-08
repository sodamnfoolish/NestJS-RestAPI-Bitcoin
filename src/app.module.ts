import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHeightController } from './controllers/get-height.controller';
import { GetUtxoController } from './controllers/get-utxo.controller';
import { CreateRawTransactionController } from './controllers/create-raw-transaction.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    GetHeightController,
    GetUtxoController,
    CreateRawTransactionController,
  ],
  providers: [AppService],
})
export class AppModule {}
