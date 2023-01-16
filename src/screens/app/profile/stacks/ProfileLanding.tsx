import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ProfileStackNavProps } from "../../../../params";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { setUser } from "../../../../actions";
import { useDispatch } from "react-redux";
import { BoxIndicator } from "../../../../components";
import { async } from "@firebase/util";

const ProfileLanding: React.FunctionComponent<
  ProfileStackNavProps<"ProfileLanding">
> = ({ navigation }) => {
  const { user } = useSelector((state: StateType) => state.user);
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const [avatar, setAvatar] = useState(user?.photoURL ?? "");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
      headerTitleStyle: {
        fontFamily: FONTS.regularBold,
        color: COLORS.gray,
      },
      headerStyle: {
        backgroundColor: COLORS.main,
        elevation: 0,
        borderBottomColor: "transparent",
        borderBottomWidth: 0,
      },
    });
  }, [user]);

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!user) {
      if (!image?.cancelled) {
        setAvatar(image ? image.uri : user?.photoURL);
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, image]);

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

  const selectProfile = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (granted) {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (image.cancelled) return;
      setImage(image);
    } else {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) return;
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (image.cancelled) return;
      setImage(image);
    }
  };
  const takeProfile = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (granted) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (image.cancelled) return;
      setImage(image);
    } else {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) return;
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (image.cancelled) return;
      setImage(image);
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
      <View
        style={{
          marginVertical: 10,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regularBold,
            fontSize: 25,
            marginBottom: 10,
          }}
        >
          {user?.displayName}
        </Text>
        <Image
          source={{
            uri: !!avatar
              ? avatar
              : Image.resolveAssetSource(
                  require("../../../../../assets/default-avatar.jpg")
                ).uri,
          }}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            color: COLORS.gray,
            textAlign: "center",
            marginTop: 3,
            fontFamily: FONTS.regular,
          }}
        >
          You can change your profile avatar. Note that this avatar is only
          visible within your workspace.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              paddingVertical: 5,
              flex: 1,
              backgroundColor: COLORS.main,
              marginRight: 5,
            }}
            onPress={selectProfile}
          >
            <Entypo name="images" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              paddingVertical: 5,
              flex: 1,
              backgroundColor: COLORS.main,
            }}
            onPress={takeProfile}
          >
            <Entypo name="camera" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginBottom: 100,
          marginTop: 10,
          alignItems: "center",
        }}
      >
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
    </ScrollView>
  );
};

export default ProfileLanding;
