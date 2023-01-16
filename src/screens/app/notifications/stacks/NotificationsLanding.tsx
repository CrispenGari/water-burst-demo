import { ScrollView, Text, View, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS, FONTS } from "../../../../constants";
import { NotificationsStackNavProps } from "../../../../params";

const Landing: React.FC<NotificationsStackNavProps<"NotificationsLanding">> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Issues",
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
  }, []);
  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: Dimensions.get("screen").height - 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.regularBold, color: "gray" }}>
          No Notifications
        </Text>
      </View>
    </ScrollView>
  );
};

export default Landing;
