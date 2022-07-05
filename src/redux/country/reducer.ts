import Action from "../../interfaces/action";
import { CountryState } from "../../interfaces/state";
import { countryActionType } from "../action-types";

const initialState: CountryState = {
  loading: false,
  countries: [],
};

export function countries(state = initialState, action: Action = { type: "" }) {
  switch (action.type) {
    case countryActionType.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case countryActionType.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
      };

    case countryActionType.SEARCH_FAILURE:
    case countryActionType.SEARCH_CLEARED:
      return {
        ...state,
        loading: false,
        countries: [],
      };

    default:
      return state;
  }
}
