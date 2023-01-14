import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./app";
import Auth from "./auth";

const Routes = () => {
  const user: any = false;
  return (
    <NavigationContainer>{!!user ? <Tabs /> : <Auth />}</NavigationContainer>
  );
};

export default Routes;
