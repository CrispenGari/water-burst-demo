import { View, ScrollView } from "react-native";
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

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: StateType) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
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
      <SignOutButton setLoading={setLoading} />
    </ScrollView>
  );
};

export default ProfileLanding;
