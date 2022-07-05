import * as appSec from "./crypto";

export const baseUrl =
  process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3502";

export function headers() {
  const { token } = appSec.decryptAndReturn() || {};
  const headers0 = {
    "Content-Type": "application/json",
  };

  return token
    ? {
        ...headers0,
        Authorization: "Bearer " + token,
      }
    : headers0;
}
