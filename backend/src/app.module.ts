import { Module } from '@nestjs/common';
import {
  CompaniesController,
  ContactsController,
  LeadsController,
} from './modules/amoCRM.controller';
import {
  AuthService,
  CompaniesService,
  ContactsService,
  LeadsService,
} from './modules/amoCRM.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [LeadsController, ContactsController, CompaniesController],
  providers: [LeadsService, ContactsService, CompaniesService, AuthService],
})
export class AppModule {}
