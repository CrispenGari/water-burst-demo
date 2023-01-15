import { constants } from "../constants";

export const setUser = (payload: { user: any; isLoggedIn: boolean }) => {
  return {
    payload,
    type: constants.SET_USER,
  };
};
