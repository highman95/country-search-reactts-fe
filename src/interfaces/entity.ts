export interface Country {
  name: string;
  region: string;
  callingCodes: string[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface SigninCredential {
  username?: string;
  password?: string;
}
