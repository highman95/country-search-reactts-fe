import { Action as AppAction } from "redux";
import { Country, SigninCredential, User } from "./entity";

export default interface Action extends AppAction {
  type: string;
  payload?: SigninCredential | User | { name: string } | Country[] | any;
  error?: string;
  message?: string;
}
