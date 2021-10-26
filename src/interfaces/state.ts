import { Country, User } from "./entity";

export interface AlertState {
  isError?: boolean;
  message?: string;
  type?: string;
}

export interface CountryState {
  countries?: Country[];
  loading?: boolean;
}

export interface UserState {
  loggedIn?: boolean;
  loggingIn?: boolean;
  user?: User;
}
