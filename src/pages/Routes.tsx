import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./app";
import Auth from "./auth";
import { useSelector } from "react-redux";
import { StateType } from "../types";
import { setUser } from "../actions";
import { pick } from "lodash";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

const Routes = () => {
  const { isLoggedIn, user } = useSelector((state: StateType) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            user,
            isLoggedIn: !!user.displayName,
          })
        );
      } else {
        // user in not logged in
        dispatch(
          setUser({
            user: null,
            isLoggedIn: false,
          })
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn && !!user ? <Tabs /> : <Auth />}
    </NavigationContainer>
  );
};

export default Routes;
