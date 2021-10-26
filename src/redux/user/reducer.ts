import Action from "../../interfaces/action";
import { UserState } from "../../interfaces/state";
import { userActionType } from "../action-types";
import * as appSec from "../crypto";

let user = appSec.decryptAndReturn();
const initialState: UserState = user
  ? {
      loggedIn: true,
      user,
    }
  : {};

export function users(state = initialState, action: Action) {
  switch (action.type) {
    case userActionType.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };

    case userActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.payload,
      };

    case userActionType.LOGIN_FAILURE:
    case userActionType.LOGOUT:
      return {
        loggingIn: false,
      };

    default:
      return state;
  }
}
