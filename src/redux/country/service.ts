import { baseUrl, headers } from "../api";
import { handleResponse } from "../user/service";

export function getCountriesByName(name: string) {
  return fetch(`${baseUrl}/api/v1/countries/name/${name}`, {
    headers: headers(),
  })
    .then(handleResponse)
    .then((countries) => countries.data);
}
