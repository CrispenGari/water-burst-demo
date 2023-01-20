import { View, ScrollView, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { AppStackBackButton, BoxIndicator } from "../../../../components";

const NotificationsSettings: React.FunctionComponent<
  ProfileStackNavProps<"NotificationsSettings">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: StateType) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Notification Settings",
      headerLeft: ({ label }) => (
        <AppStackBackButton
          label={label as any}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

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
    </ScrollView>
  );
};

export default NotificationsSettings;
