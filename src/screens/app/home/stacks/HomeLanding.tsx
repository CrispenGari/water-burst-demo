import { Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { HomeStackNavProps } from "../../../../params";
import { COLORS, FONTS } from "../../../../constants";

const Landing: React.FC<HomeStackNavProps<"HomeLanding">> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "HOME",
      headerTitleStyle: {
        fontFamily: FONTS.regularBold,
        color: COLORS.gray,
      },
    });
  }, []);
  return (
    <ScrollView style={{ paddingVertical: 10, backgroundColor: "white" }}>
      <Text>Hello</Text>
    </ScrollView>
  );
};

export default Landing;
