import { View, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import {
  BoxIndicator,
  ChangePasswordCard,
  ResetPasswordCard,
} from "../../../../components";

const ChangePasswordSettings: React.FunctionComponent<
  ProfileStackNavProps<"ChangePasswordSettings">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Passwords Manager",
    });
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior="padding"
      enabled
      style={{
        flex: 1,
        width: "100%",
      }}
    >
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
        <Text
          style={{
            fontFamily: FONTS.regularBold,
            color: COLORS.gray,
            fontSize: 25,
            marginTop: 30,
          }}
        >
          Password Manager
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: "red",
            fontSize: 16,
            marginBottom: 30,
            marginTop: 5,
          }}
        >
          Note that you can change and reset password on this page.
        </Text>

        <ResetPasswordCard setLoading={setLoading} />
        <ChangePasswordCard setLoading={setLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordSettings;
