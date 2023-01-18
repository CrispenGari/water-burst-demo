import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FONTS, COLORS } from "../../constants";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { setUser } from "../../actions";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { StateType } from "../../types";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResetPasswordCard: React.FunctionComponent<Props> = ({ setLoading }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { user } = useSelector((state: StateType) => state.user);
  const [error, setError] = useState<string>("");
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!user) {
      setEmail(user?.email);
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  const resetPassword = async () => {
    setLoading(true);
    const credentials = EmailAuthProvider.credential(
      user?.email as string,
      password.trim()
    );
    if (!auth.currentUser) {
      setError("You are not authenticated.");
      return;
    }
    await reauthenticateWithCredential(auth.currentUser, credentials)
      .then(async () => {
        await sendPasswordResetEmail(auth, email.toLowerCase().trim())
          .then(async () => {
            await signOut(auth)
              .then(async () => {
                await dispatch(
                  setUser({
                    user: null,
                    isLoggedIn: false,
                  })
                );
              })
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            setLoading(false);
            setError("Something went wrong, please try again.");
          });
      })
      .catch((err) => setError("Invalid current account password"))
      .finally(() => setLoading(false));
  };

  return (
    <View style={{ marginBottom: 10, marginTop: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            textTransform: "uppercase",
            fontFamily: FONTS.regular,
            fontSize: 20,
            color: COLORS.gray,
            marginRight: 10,
          }}
        >
          Reset Password
        </Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          marginTop: 5,
          color: COLORS.gray,
          fontFamily: FONTS.regular,
          marginBottom: 20,
        }}
      >
        Note that we advice you to use this option when you forgot your
        password. We use your email address to send you the reset password link.
        Note that this action will require `re-authentication`.
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
        editable={false}
      />
      <CustomTextInput
        leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
        placeholder="current account password"
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
            <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
          )
        }
        secureTextEntry={hidePassword}
        onRightIconPress={() => setHidePassword((state) => !state)}
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
          backgroundColor: COLORS.green,
          alignItems: "center",
          padding: 10,
          marginVertical: 20,
        }}
        activeOpacity={0.7}
        onPress={resetPassword}
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
          RESET PASSWORD
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordCard;
