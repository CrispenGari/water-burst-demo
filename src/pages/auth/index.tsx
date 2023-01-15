import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "../../params";
import { Welcome, SignIn, SignUp, Profile } from "../../screens/auth";

const Stack = createStackNavigator<AuthParamList>();
const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default Auth;
