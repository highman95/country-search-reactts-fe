import Action from "../../interfaces/action";
import { Country } from "../../interfaces/entity";
import { countryActionType } from "../action-types";
import * as countryService from "./service";
import * as alert from "../alert/action";

export function getCountriesByName(name: string) {
  return (dispatch: (action: Action) => void) => {
    dispatch(alert.clear());
    dispatch(request({ name }));

    countryService.getCountriesByName(name).then(
      (countries) => dispatch(success(countries)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alert.error(error?.toString()));
      }
    );
  };

  function request(query: { name: string }) {
    return { type: countryActionType.SEARCH_REQUEST, payload: query };
  }

  function success(countries: Country[]) {
    return { type: countryActionType.SEARCH_SUCCESS, payload: countries };
  }

  function failure(error: string) {
    return { type: countryActionType.SEARCH_FAILURE, error };
  }
}
