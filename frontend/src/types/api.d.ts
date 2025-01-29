declare namespace API {
  interface Record {
    id: number;
    type: "lead" | "contact" | "company";
  }
  interface createEntityResponse {
    id?: number;
    status: number;
    statusText?: string;
  }
}
