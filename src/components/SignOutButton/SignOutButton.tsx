import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, COLORS } from "../../constants";
import { signOut } from "firebase/auth";
import { setUser } from "../../actions";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const SignOutButton: React.FunctionComponent<Props> = ({ setLoading }) => {
  const dispatch = useDispatch();
  const logout = async () => {
    setLoading(true);
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
  };

  return (
    <View style={{ marginBottom: 100, marginTop: 10 }}>
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
          LOGOUT
        </Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
          }}
        />
      </View>
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
        onPress={logout}
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
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOutButton;
