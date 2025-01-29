import { Module } from '@nestjs/common';
import {
  CompaniesController,
  ContactsController,
  LeadsController,
} from './amoCRM.controller';
import {
  CompaniesService,
  ContactsService,
  LeadsService,
} from './amoCRM.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LeadsController, ContactsController, CompaniesController],
  providers: [LeadsService, ContactsService, CompaniesService],
  imports: [HttpModule],
})
export class AmoCRMModule {}
