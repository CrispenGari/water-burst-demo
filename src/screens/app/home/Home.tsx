import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../params";
import HomeLanding from "./stacks/HomeLanding";
import { COLORS } from "../../../constants";

const Stack = createStackNavigator<HomeStackParamList>();
const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeLanding"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
        },
      }}
    >
      <Stack.Screen name="HomeLanding" component={HomeLanding} />
    </Stack.Navigator>
  );
};

export default Home;
