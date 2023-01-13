import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AuthNavProps } from "../../../params";
import { COLORS, FONTS } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";

const Welcome: React.FunctionComponent<AuthNavProps<"Welcome">> = ({
  navigation,
}) => {
  return (
    <LinearGradient
      colors={[COLORS.green, "rgba(0, 0, 0, .5)"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
      }}
      start={{
        x: 1,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
    >
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
          }}
          source={{
            uri: Image.resolveAssetSource(
              require("../../../../assets/icon.png")
            ).uri,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            marginRight: 10,
            color: COLORS.gray,
            textTransform: "uppercase",
            fontFamily: FONTS.regular,
            marginTop: 50,
          }}
        >
          {"<App Name>"}
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginTop: 5,
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            textAlign: "center",
          }}
        >
          If you have a water pipe burst in your area feel free to report using
          this app.
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginVertical: 10,
            marginTop: 40,
          }}
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
            Already have an account?
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              flex: 1,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            maxWidth: 300,
            backgroundColor: COLORS.main,
            alignItems: "center",
            padding: 10,
            marginVertical: 20,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.replace("SignIn")}
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
            SIGN IN
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginVertical: 10,
            marginTop: 50,
          }}
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
            New to this App?
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              flex: 1,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            maxWidth: 300,
            backgroundColor: COLORS.dark,
            alignItems: "center",
            padding: 10,
            marginVertical: 20,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.replace("SignUp", {})}
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
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
