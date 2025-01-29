declare namespace amoCRM {
  interface createLeadResponse {
    _embedded: {
      leads: {
        id: number;
        request_id: string;
      }[];
    };
  }
  interface createContactResponse {
    _embedded: {
      contacts: {
        id: number;
        request_id: string;
      }[];
    };
  }
  interface createCompanyResponse {
    _embedded: {
      companies: {
        id: number;
        request_id: string;
      }[];
    };
  }
}
