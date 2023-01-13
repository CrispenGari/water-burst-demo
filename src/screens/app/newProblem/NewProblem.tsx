import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewProblemStackParamList } from "../../../params";
import NewProblemLanding from "./stacks/NewProblemLanding";

const Stack = createStackNavigator<NewProblemStackParamList>();
const NewProblem = () => {
  return (
    <Stack.Navigator initialRouteName="NewProblemLanding" screenOptions={{}}>
      <Stack.Screen name="NewProblemLanding" component={NewProblemLanding} />
    </Stack.Navigator>
  );
};

export default NewProblem;
