import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../../params";
import ProfileLanding from "./stacks/ProfileLanding";
import ContactDetails from "./stacks/ContactDetails";
import Developers from "./stacks/Delelopers";
import LanguageSettings from "./stacks/LanguageSettings";
import NotificationsSettings from "./stacks/NotificationsSettings";
import PersonalInformation from "./stacks/PersonalInfomation";
import TnC from "./stacks/TnC";
import { FONTS, COLORS } from "../../../constants";
import ChangePasswordSettings from "./stacks/ChangePasswordSetting";
import DeleteAccountSettings from "./stacks/DeleteAccountSetting";

const Stack = createStackNavigator<ProfileStackParamList>();
const Profile = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileLanding"
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
        },
      }}
    >
      <Stack.Screen name="ProfileLanding" component={ProfileLanding} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} />
      <Stack.Screen name="TnC" component={TnC} />
      <Stack.Screen
        name="DeleteAccountSettings"
        component={DeleteAccountSettings}
      />
      <Stack.Screen
        name="ChangePasswordSettings"
        component={ChangePasswordSettings}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
      />
      <Stack.Screen name="Developers" component={Developers} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
    </Stack.Navigator>
  );
};

export default Profile;
