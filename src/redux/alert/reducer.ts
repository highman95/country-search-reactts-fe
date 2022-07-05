import Action from "../../interfaces/action";
import { AlertState } from "../../interfaces/state";
import { alertActionType } from "../action-types";

export function alerts(state: AlertState = { isError: false }, action: Action = { type: "" }) {
  switch (action.type) {
    case alertActionType.SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
        isError: false,
      };

    case alertActionType.ERROR:
      return {
        type: "alert-warning",
        message: action.message,
        isError: true,
      };

    case alertActionType.CLEAR:
      return {
        isError: false,
      };

    default:
      return state;
  }
}
