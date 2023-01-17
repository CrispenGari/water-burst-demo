import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import { useSelector } from "react-redux";
import { StateType } from "../../types";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileCard: React.FunctionComponent<Props> = () => {
  const { user } = useSelector((state: StateType) => state.user);
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const [avatar, setAvatar] = useState(user?.photoURL ?? "");
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

  return (
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
                require("../../../assets/default-avatar.jpg")
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
  );
};

export default ProfileCard;
