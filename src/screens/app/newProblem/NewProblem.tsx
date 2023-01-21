import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NewProblemStackParamList } from "../../../params";
import NewProblemLanding from "./stacks/NewProblemLanding";
import NewIssueSubmittedResult from "./stacks/NewIssueSubmittedResult";
import { FONTS, COLORS } from "../../../constants";

const Stack = createStackNavigator<NewProblemStackParamList>();
const NewProblem = () => {
  return (
    <Stack.Navigator
      initialRouteName="NewProblemLanding"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: FONTS.regularBold,
          color: COLORS.gray,
        },
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          borderBottomColor: "transparent",
          borderBottomWidth: 0,
          shadowOpacity: 0,
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
