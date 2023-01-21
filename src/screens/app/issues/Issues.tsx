import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IssuesStackParamList } from "../../../params";
import IssueDetails from "./stacks/IssueDetails";
import IssuesLanding from "./stacks/IssuesLanding";
import { FONTS, COLORS } from "../../../constants";

const Stack = createStackNavigator<IssuesStackParamList>();
const Notifications: React.FunctionComponent = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="IssuesLanding"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: FONTS.regularBold,
          color: COLORS.gray,
        },
        headerStyle: {
          backgroundColor: COLORS.main,
          elevation: 0,
          borderBottomColor: "transparent",
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen name={"IssuesLanding"} component={IssuesLanding} />
      <Stack.Screen name={"IssueDetails"} component={IssueDetails} />
    </Stack.Navigator>
  );
};

export default Notifications;
