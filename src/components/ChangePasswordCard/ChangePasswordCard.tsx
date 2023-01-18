import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FONTS, COLORS } from "../../constants";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import { setUser } from "../../actions";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StateType } from "../../types";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChangePasswordCard: React.FunctionComponent<Props> = ({ setLoading }) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConf, setNewPasswordConf] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPasswordHidden, setNewPasswordHidden] = useState<boolean>(true);
  const [newPasswordConfHidden, setNewPasswordConfHidden] =
    useState<boolean>(true);
  const [currentPasswordHidden, setCurrentPasswordHidden] =
    useState<boolean>(true);

  const { user } = useSelector((state: StateType) => state.user);
  const [error, setError] = useState<string>("");

  const changePassword = async () => {
    setLoading(true);
    const credentials = EmailAuthProvider.credential(
      user?.email as string,
      currentPassword.trim()
    );
    if (!auth.currentUser) {
      setError("You are not authenticated.");
      return;
    }
    await reauthenticateWithCredential(auth.currentUser, credentials)
      .then(async () => {
        if (!auth.currentUser) {
          setError("You are not authenticated.");
          return;
        }

        if (newPassword.trim() !== newPasswordConf.trim()) {
          setError("The two passwords must match.");
          return;
        }
        await updatePassword(auth.currentUser, newPassword.trim())
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
    <View style={{ marginBottom: 60, marginTop: 10 }}>
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
          Change Password
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
        Change password requires you to give us your current account password
        together with the new password that need to be confirmed. Note that this
        action will require you to re-authenticate for security reasons.
      </Text>
      <CustomTextInput
        leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
        placeholder="current account password"
        text={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
        keyboardType="default"
        containerStyles={{
          marginBottom: 10,
        }}
        rightIcon={
          !currentPasswordHidden ? (
            <FontAwesome name="eye" size={24} color={COLORS.main} />
          ) : (
            <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
          )
        }
        secureTextEntry={currentPasswordHidden}
        onRightIconPress={() => setCurrentPasswordHidden((state) => !state)}
      />

      <CustomTextInput
        leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
        placeholder="new password"
        text={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        keyboardType="default"
        containerStyles={{
          marginBottom: 10,
        }}
        rightIcon={
          !newPasswordHidden ? (
            <FontAwesome name="eye" size={24} color={COLORS.main} />
          ) : (
            <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
          )
        }
        secureTextEntry={newPasswordHidden}
        onRightIconPress={() => setNewPasswordHidden((state) => !state)}
      />
      <CustomTextInput
        leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
        placeholder="confirm new password"
        text={newPasswordConf}
        onChangeText={(text) => setNewPasswordConf(text)}
        keyboardType="default"
        containerStyles={{
          marginBottom: 10,
        }}
        rightIcon={
          !newPasswordConfHidden ? (
            <FontAwesome name="eye" size={24} color={COLORS.main} />
          ) : (
            <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
          )
        }
        secureTextEntry={newPasswordConfHidden}
        onRightIconPress={() => setNewPasswordConfHidden((state) => !state)}
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
        onPress={changePassword}
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
          CHANGE PASSWORD
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordCard;
