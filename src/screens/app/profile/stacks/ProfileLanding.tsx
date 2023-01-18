import { View, ScrollView, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import {
  BoxIndicator,
  ProfileCard,
  SignOutButton,
} from "../../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: StateType) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
    });
  }, [user]);

  return (
    <ScrollView style={{ padding: 10, backgroundColor: COLORS.dark }}>
      {loading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, .3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BoxIndicator size={20} color={COLORS.green} />
        </View>
      ) : null}
      <ProfileCard setLoading={setLoading} />

      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("PersonalInformation")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Personal Information
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NotificationsSettings")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Notification Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ContactDetails")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Contact Details
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("LanguageSettings")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Language Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ChangePasswordSettings")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Password Manager
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("DeleteAccountSettings")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Delete Account Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Developers")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Developers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 0.5,
          marginBottom: 30,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("TnC")}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          TnC
        </Text>
      </TouchableOpacity>

      <SignOutButton setLoading={setLoading} />
    </ScrollView>
  );
};

export default ProfileLanding;
