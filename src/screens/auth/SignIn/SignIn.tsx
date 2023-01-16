import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS, FONTS, SCREEN_HEIGHT } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { AuthNavProps } from "../../../params";
import { BoxIndicator, CustomTextInput } from "../../../components";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { setUser } from "../../../actions";
import { useDispatch } from "react-redux";

const SignIn: React.FunctionComponent<AuthNavProps<"SignIn">> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const signIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(
      auth,
      email ? email.trim().toLowerCase() : "",
      password ? password.trim() : ""
    )
      .then(async ({ user }) => {
        setError("");
        setEmail("");
        setPassword("");
        dispatch(
          setUser({
            user,
            isLoggedIn: true,
          })
        );
      })
      .catch((error) => {
        setError("Invalid email address or password.");
        setPassword("");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <LinearGradient
      colors={[COLORS.green, "rgba(0, 0, 0, .5)"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        enabled
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            padding: 10,

            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          bounces={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View
            style={{
              height: SCREEN_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  marginRight: 10,
                  color: COLORS.gray,
                  textTransform: "uppercase",
                  fontFamily: FONTS.regular,
                  marginBottom: 20,
                }}
              >
                SIGN IN
              </Text>
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
                  width: "100%",
                }}
              >
                If you already have an account in this go ahead and sign in.
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                maxWidth: 500,
              }}
            >
              {/* Email */}
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
              {/* Password */}
              <CustomTextInput
                leftIcon={
                  <AntDesign name="lock" size={24} color={COLORS.main} />
                }
                placeholder="password"
                text={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                containerStyles={{
                  marginBottom: 10,
                }}
                rightIcon={
                  !hidePassword ? (
                    <FontAwesome name="eye" size={24} color={COLORS.main} />
                  ) : (
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color={COLORS.main}
                    />
                  )
                }
                secureTextEntry={hidePassword}
                onRightIconPress={() => setHidePassword((state) => !state)}
                onSubmitEditing={signIn}
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
                onPress={signIn}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignIn;
