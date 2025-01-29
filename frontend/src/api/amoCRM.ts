import axios from "./axios";

export async function createLead(): Promise<API.createEntityResponse | undefined> {
  try {
    const response = await axios.post(
      "/leads",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.warn(JSON.stringify(error))
  }
}

export async function createContact(): Promise<API.createEntityResponse | undefined> {
  try {
    const response = await axios.post(
      "/contacts",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.warn(JSON.stringify(error));
  }
}

export async function createCompany(): Promise<API.createEntityResponse | undefined> {
  try {
    const response = await axios.post(
      "/companies",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.warn(JSON.stringify(error));
  }
}
