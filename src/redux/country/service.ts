import { baseUrl, headers } from "../api";
import { handleResponse } from "../user/service";

export async function getCountriesByName(name: string) {
  const response = await fetch(`${baseUrl}/api/v1/countries/name/${name}`, {
    headers: headers(),
  });
  const countries = await handleResponse(response);
  return countries.data;
}
