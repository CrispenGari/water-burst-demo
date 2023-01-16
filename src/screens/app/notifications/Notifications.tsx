import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppNavProps, NotificationsStackParamList } from "../../../params";
import NotificationsLanding from "./stacks/NotificationsLanding";

const Stack = createStackNavigator<NotificationsStackParamList>();
const Notifications: React.FunctionComponent = ({}) => {
  return (
    <Stack.Navigator initialRouteName="NotificationsLanding">
      <Stack.Screen
        name={"NotificationsLanding"}
        component={NotificationsLanding}
      />
    </Stack.Navigator>
  );
};

export default Notifications;
