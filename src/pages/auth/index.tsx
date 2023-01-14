import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "../../params";
import { Welcome, SignIn, SignUp } from "../../screens/auth";

const Stack = createStackNavigator<AuthParamList>();
const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Auth;
