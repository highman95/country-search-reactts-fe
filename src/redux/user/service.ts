import * as appSec from "../crypto";
import { baseUrl, headers } from "../api";

export function authenticate(username: string, password: string) {
  return fetch(`${baseUrl}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: headers(),
  })
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage
      // to keep user logged in between page refreshes
      appSec.encryptAndStore(user.data);
      return user.data;
    });
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

export function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
