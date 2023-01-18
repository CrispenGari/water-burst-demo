import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { BoxIndicator, CustomTextInput } from "../../../../components";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
const PersonalInformation: React.FunctionComponent<
  ProfileStackNavProps<"PersonalInformation">
> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: StateType) => state.user);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Personal Information",
    });
  }, []);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!user) {
      setPhoneNumber(user?.phoneNumber);
      setEmail(user?.email);
      setFullName(user?.displayName);
    }

    return () => {
      mounted = false;
    };
  }, [user]);
  const updateDetails = async () => {};

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
      <Text
        style={{
          fontFamily: FONTS.regularBold,
          color: COLORS.gray,
          fontSize: 25,
          marginVertical: 30,
        }}
      >
        Update your Personal Information
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
        text={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        containerStyles={{
          marginBottom: 10,
        }}
      />
      <CustomTextInput
        leftIcon={<AntDesign name="user" size={24} color={COLORS.main} />}
        placeholder="full name"
        text={fullName}
        onChangeText={(text) => setFullName(text)}
        keyboardType="default"
        containerStyles={{
          marginBottom: 10,
        }}
      />
      <CustomTextInput
        leftIcon={<AntDesign name="phone" size={24} color={COLORS.main} />}
        placeholder="phone number"
        text={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
        containerStyles={{
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          color: "red",
          fontFamily: FONTS.regular,
          fontSize: 16,
        }}
      >
        {error}
      </Text>
      <TouchableOpacity
        style={{
          width: "80%",
          maxWidth: 300,
          backgroundColor: COLORS.main,
          alignItems: "center",
          padding: 10,
          marginTop: 10,
        }}
        activeOpacity={0.7}
        onPress={updateDetails}
      >
        <Text
          style={{
            fontSize: 20,
            marginRight: 10,
            color: COLORS.gray,
            textTransform: "uppercase",
            fontFamily: FONTS.regular,
          }}
        >
          Update
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PersonalInformation;
