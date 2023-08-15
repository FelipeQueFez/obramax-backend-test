import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsFirebaseService, ICatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [{ provide: ICatsService, useClass: CatsFirebaseService },],
})
export class CatsModule { }
