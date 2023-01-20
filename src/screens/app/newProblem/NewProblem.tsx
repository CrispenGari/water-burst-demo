import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewProblemStackParamList } from "../../../params";
import NewProblemLanding from "./stacks/NewProblemLanding";
import NewIssueSubmittedResult from "./stacks/NewIssueSubmittedResult";

const Stack = createStackNavigator<NewProblemStackParamList>();
const NewProblem = () => {
  return (
    <Stack.Navigator
      initialRouteName="NewProblemLanding"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen name="NewProblemLanding" component={NewProblemLanding} />
      <Stack.Screen
        name="NewIssueSubmittedResult"
        component={NewIssueSubmittedResult}
      />
    </Stack.Navigator>
  );
};

export default NewProblem;
