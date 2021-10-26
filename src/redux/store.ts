import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import * as alertReducer from "./alert/reducer";
import * as countryReducer from "./country/reducer";
import * as userReducer from "./user/reducer";

const reducers = {
  alerts0: alertReducer.alerts,
  countries0: countryReducer.countries,
  users0: userReducer.users,
};

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunkMiddleware)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type:
// { alerts0: AlertState, countries0: CountryState, users0: UserState }
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
