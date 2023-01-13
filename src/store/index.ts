import { legacy_createStore, combineReducers, Store } from "redux";
import { ActionType, StateType } from "../types";

export const store: Store<StateType, ActionType<any>> = legacy_createStore(
  combineReducers({
    counter: (state = 0, { payload, type }: ActionType<any>) => {
      switch (type) {
        case "hello":
          return state;
        default:
          return state;
      }
    },
  })
);
