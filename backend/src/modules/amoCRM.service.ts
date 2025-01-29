import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AuthData } from './types/auth';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  private authData: AuthData | undefined;
  private readonly logger = new Logger(AuthService.name);

  async auth() {
    const { data } = await lastValueFrom(
      this.httpService
        .get<AuthData>('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': 32185358,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );
    return data;
  }

  getAuth(): AuthData | undefined {
    return this.authData;
  }

  setAuth(auth: AuthData) {
    this.authData = auth;
  }
}

@Injectable()
export class LeadsService {
  constructor(
    private authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(LeadsService.name);

  async create(): Promise<{
    status: number;
    statusText?: string;
    id?: number;
  }> {
    try {
      if (!this.authService.getAuth()) {
        this.authService.setAuth(await this.authService.auth());
      }
      const createLead = async () => {
        return await lastValueFrom(
          this.httpService.post<amoCRM.createLeadResponse>(
            'https://' +
              this.authService.getAuth()!.base_domain +
              '/api/v4/leads',
            [{}],
            {
              headers: {
                Authorization:
                  'Bearer ' + this.authService.getAuth()!.access_token,
              },
              validateStatus: (status) => {
                return status < 300 || status === 401;
              },
            },
          ),
        );
      };
      let response: Awaited<ReturnType<typeof createLead>>;
      response = await createLead();
      if (response.status === 401) {
        this.authService.setAuth(await this.authService.auth());
        response = await createLead();
      }
      return {
        id: response.data._embedded.leads[0].id,
        status: response.status,
      };
    } catch (error) {
      if ((error as AxiosError).response) {
        return {
          status: (error as AxiosError).response!.status,
          statusText: (error as AxiosError).response!.statusText,
        };
      } else if ((error as AxiosError).request) {
        this.logger.error((error as AxiosError).message);
        throw error;
      } else {
        throw error;
      }
    }
  }
}

@Injectable()
export class ContactsService {
  constructor(
    private authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(ContactsService.name);

  async create(): Promise<{
    status: number;
    statusText?: string;
    id?: number;
  }> {
    try {
      if (!this.authService.getAuth()) {
        this.authService.setAuth(await this.authService.auth());
      }
      const createContact = async () => {
        return await lastValueFrom(
          this.httpService.post<amoCRM.createContactResponse>(
            'https://' +
              this.authService.getAuth()!.base_domain +
              '/api/v4/contacts',
            [{}],
            {
              headers: {
                Authorization:
                  'Bearer ' + this.authService.getAuth()!.access_token,
              },
              validateStatus: (status) => {
                return status < 300 || status === 401;
              },
            },
          ),
        );
      };
      let response: Awaited<ReturnType<typeof createContact>>;
      response = await createContact();
      if (response.status === 401) {
        this.authService.setAuth(await this.authService.auth());
        response = await createContact();
      }
      return {
        id: response.data._embedded.contacts[0].id,
        status: response.status,
      };
    } catch (error) {
      if ((error as AxiosError).response) {
        return {
          status: (error as AxiosError).response!.status,
          statusText: (error as AxiosError).response!.statusText,
        };
      } else if ((error as AxiosError).request) {
        this.logger.error((error as AxiosError).message);
        throw error;
      } else {
        throw error;
      }
    }
  }
}

@Injectable()
export class CompaniesService {
  constructor(
    private authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(CompaniesService.name);

  async create(): Promise<{
    status: number;
    statusText?: string;
    id?: number;
  }> {
    try {
      if (!this.authService.getAuth()) {
        this.authService.setAuth(await this.authService.auth());
      }
      const createCompany = async () => {
        return await lastValueFrom(
          this.httpService.post<amoCRM.createCompanyResponse>(
            'https://' +
              this.authService.getAuth()!.base_domain +
              '/api/v4/companies',
            [{}],
            {
              headers: {
                Authorization:
                  'Bearer ' + this.authService.getAuth()!.access_token,
              },
              validateStatus: (status) => {
                return status < 300 || status === 401;
              },
            },
          ),
        );
      };
      let response: Awaited<ReturnType<typeof createCompany>>;
      response = await createCompany();
      if (response.status === 401) {
        this.authService.setAuth(await this.authService.auth());
        response = await createCompany();
      }
      return {
        id: response.data._embedded.companies[0].id,
        status: response.status,
      };
    } catch (error) {
      if ((error as AxiosError).response) {
        return {
          status: (error as AxiosError).response!.status,
          statusText: (error as AxiosError).response!.statusText,
        };
      } else if ((error as AxiosError).request) {
        this.logger.error((error as AxiosError).message);
        throw error;
      } else {
        throw error;
      }
    }
  }
}
