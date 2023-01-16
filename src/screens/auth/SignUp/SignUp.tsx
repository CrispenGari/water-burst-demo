import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { pick } from "lodash";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../../actions";

const SignUp: React.FunctionComponent<AuthNavProps<"SignUp">> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfPassword, setHideConfPassword] = useState<boolean>(true);
  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();
  const [conf, setConf] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (password !== conf) {
      setError("The two passwords must match.");
      return;
    }

    setLoading(true);
    await createUserWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password.trim()
    )
      .then(async ({ user }) => {
        const _user = pick(user, [
          "displayName",
          "email",
          "phoneNumber",
          "emailVerified",
          "photoURL",
          "uid",
        ]);
        await setDoc(
          doc(db, "users", _user.uid),
          {
            user: _user,
          },
          {
            merge: true,
          }
        )
          .then(() => {
            setLoading(false);
            setError("");
            setEmail("");
            setPassword("");
            setConf("");
            setHideConfPassword(true);
            setHidePassword(true);
            dispatch(
              setUser({
                user,
                isLoggedIn: false,
              })
            );
            navigation.replace("Profile", {});
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((error) => {
        setLoading(false);
        setError(
          (error.message as string).includes("email")
            ? "The email address is invalid or it has already been taken."
            : "The password must contain at least 6 characters."
        );
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
                SIGN UP
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
                If you don't have an account go ahead and create one by signing
                up.
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
                onSubmitEditing={signUp}
              />
              <CustomTextInput
                leftIcon={
                  <AntDesign name="lock" size={24} color={COLORS.main} />
                }
                placeholder="confirm password"
                text={conf}
                onChangeText={(text) => setConf(text)}
                keyboardType="default"
                containerStyles={{
                  marginBottom: 10,
                }}
                rightIcon={
                  !hideConfPassword ? (
                    <FontAwesome name="eye" size={24} color={COLORS.main} />
                  ) : (
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color={COLORS.main}
                    />
                  )
                }
                secureTextEntry={hideConfPassword}
                onRightIconPress={() => setHideConfPassword((state) => !state)}
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
                onPress={signUp}
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
                  SIGN UP
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
                  backgroundColor: COLORS.dark,
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
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
