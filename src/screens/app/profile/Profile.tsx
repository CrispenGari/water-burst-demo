import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../params";
import ProfileLanding from "./stacks/ProfileLanding";

const Stack = createStackNavigator<ProfileStackParamList>();
const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileLanding" screenOptions={{}}>
      <Stack.Screen name="ProfileLanding" component={ProfileLanding} />
    </Stack.Navigator>
  );
};

export default Profile;
