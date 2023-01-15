import { constants } from "../../constants";
import { ActionType } from "../../types";

export const userReducer = (
  state: any = null,
  {
    payload,
    type,
  }: ActionType<{
    user: any;
    isLoggedIn: boolean;
  }>
) => {
  switch (type) {
    case constants.SET_USER:
      return (state = payload);
    default:
      return state;
  }
};
