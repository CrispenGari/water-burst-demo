import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { ScrollView } from "react-native-gesture-handler";

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ navigation }) => {
  const user = useSelector((state: StateType) => state.user);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: user.user?.email,
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
    <ScrollView style={{ padding: 10 }}>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </ScrollView>
  );
};

export default ProfileLanding;
