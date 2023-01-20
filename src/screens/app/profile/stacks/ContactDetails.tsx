import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { AppStackBackButton, CustomTextInput } from "../../../../components";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
const ContactDetails: React.FunctionComponent<
  ProfileStackNavProps<"ContactDetails">
> = ({ navigation }) => {
  const { user } = useSelector((state: StateType) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Contact Details",
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
      <Text
        style={{
          fontFamily: FONTS.regularBold,
          color: COLORS.gray,
          fontSize: 25,
          marginTop: 30,
        }}
      >
        Your Contact Details
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          color: COLORS.gray,
          fontSize: 16,
          marginBottom: 30,
          marginTop: 5,
        }}
      >
        Note that these details are used to contact you when more information
        about your issue is required.
      </Text>
      <CustomTextInput
        leftIcon={
          <MaterialCommunityIcons
            name="email-fast-outline"
            size={24}
            color={COLORS.main}
          />
        }
        placeholder="email address"
        text={user?.email}
        editable={false}
        keyboardType="email-address"
        containerStyles={{
          marginBottom: 10,
        }}
      />

      <CustomTextInput
        leftIcon={<AntDesign name="phone" size={24} color={COLORS.main} />}
        placeholder="phone number"
        text={user?.phoneNumber}
        keyboardType="phone-pad"
        containerStyles={{
          marginBottom: 10,
        }}
        editable={false}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            color: "red",
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}
        >
          To update your contact details please visit
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("PersonalInformation")}
        >
          <Text
            style={{
              color: COLORS.green,
              fontFamily: FONTS.regular,
              fontSize: 16,
            }}
          >
            {`"Personal Information" settings.`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactDetails;
