import Action from "../../interfaces/action";
import { SigninCredential, User } from "../../interfaces/entity";
import { userActionType } from "../action-types";
import * as userService from "./service";
import * as alert from "../alert/action";

export function authenticate(username: string, password: string) {
  return (dispatch: (action: Action) => void) => {
    dispatch(alert.clear());
    dispatch(request({ username }));

    userService.authenticate(username, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alert.error(error?.toString()));
      }
    );
  };

  function request(user: SigninCredential) {
    return { type: userActionType.LOGIN_REQUEST, payload: user };
  }

  function success(user: User) {
    return { type: userActionType.LOGIN_SUCCESS, payload: user };
  }

  function failure(error: string) {
    return { type: userActionType.LOGIN_FAILURE, error };
  }
}

export function logout() {
  userService.logout();
  return { type: userActionType.LOGOUT };
}
