import { Controller, Post } from '@nestjs/common';
import {
  LeadsService,
  ContactsService,
  CompaniesService,
} from './amoCRM.service';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Post()
  async create() {
    return await this.leadsService.create();
  }
}

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post()
  async create() {
    return await this.contactsService.create();
  }
}

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  async create() {
    return await this.companiesService.create();
  }
}
