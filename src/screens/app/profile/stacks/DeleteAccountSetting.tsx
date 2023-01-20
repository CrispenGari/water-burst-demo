import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../types";
import {
  AppStackBackButton,
  BoxIndicator,
  CustomTextInput,
} from "../../../../components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  signOut,
} from "firebase/auth";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../../../../firebase";
import { setUser } from "../../../../actions";
const DeleteAccountSettings: React.FunctionComponent<
  ProfileStackNavProps<"DeleteAccountSettings">
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { user } = useSelector((state: StateType) => state.user);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Delete Account",
      headerLeft: ({ label }) => (
        <AppStackBackButton
          label={label as any}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  const deleteAccount = async () => {
    if (auth.currentUser) {
      setLoading(true);
      const credentials = EmailAuthProvider.credential(
        user?.email as string,
        password.trim()
      );
      await reauthenticateWithCredential(auth.currentUser, credentials)
        .then(async () => {
          if (auth.currentUser) {
            const profileRef = ref(storage, "profiles/" + user?.uid + ".jpg");
            await deleteObject(profileRef);
            await deleteDoc(doc(db, "users", user?.uid as any)).finally(
              async () => {
                if (auth.currentUser) {
                  await deleteUser(auth.currentUser);
                  setLoading(false);
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
                }
              }
            );
          }
        })
        .catch(() => {
          setError("Invalid current account password.");
          setLoading(false);
        });
    } else {
      setError("You are not authenticated.");
    }
  };

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
          marginTop: 30,
        }}
      >
        Delete your Account
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
        Note that deleting your account is an irreversible action, and you will
        lost all your details including the issues you have submitted. To delete
        your account your current account password.
      </Text>

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
          backgroundColor: COLORS.main,
          alignItems: "center",
          padding: 10,
          marginTop: 10,
        }}
        activeOpacity={0.7}
        onPress={deleteAccount}
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
          Delete Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DeleteAccountSettings;
