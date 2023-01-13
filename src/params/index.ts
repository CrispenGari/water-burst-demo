import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//  Application Param Lists
export type AppParamList = {
  Home: undefined;
  NewProblem: {};
  Notifications: undefined;
  Profile: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: BottomTabNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

// Home Stacks Param List
export type HomeStackParamList = {
  HomeLanding: undefined;
};

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: BottomTabNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};
// NewProblem Stacks Param List
export type NewProblemStackParamList = {
  NewProblemLanding: undefined;
};

export type NewProblemStackNavProps<T extends keyof NewProblemStackParamList> =
  {
    navigation: BottomTabNavigationProp<NewProblemStackParamList, T>;
    route: RouteProp<NewProblemStackParamList, T>;
  };

// Notifications Stacks Param List
export type NotificationsStackParamList = {
  NotificationsLanding: undefined;
};

export type NotificationsStackNavProps<
  T extends keyof NotificationsStackParamList
> = {
  navigation: BottomTabNavigationProp<NotificationsStackParamList, T>;
  route: RouteProp<NotificationsStackParamList, T>;
};

// Profile Stacks Param List
export type ProfileStackParamList = {
  ProfileLanding: undefined;
};

export type ProfileStackNavProps<T extends keyof ProfileStackParamList> = {
  navigation: BottomTabNavigationProp<ProfileStackParamList, T>;
  route: RouteProp<ProfileStackParamList, T>;
};

// ================================= Auth Stack

export type AuthParamList = {
  SignIn: undefined;
  SignUp: {};
  Welcome: {};
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
