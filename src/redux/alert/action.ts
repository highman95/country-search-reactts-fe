import { alertActionType } from "../action-types";

export function success(message: string) {
  return {
    type: alertActionType.SUCCESS,
    message,
  };
}

export function error(message: string) {
  return {
    type: alertActionType.ERROR,
    message,
  };
}

export function clear() {
  return {
    type: alertActionType.CLEAR,
  };
}
