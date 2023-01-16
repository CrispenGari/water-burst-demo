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
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { StateType } from "../../../types";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { useDispatch } from "react-redux";
import { setUser } from "../../../actions";

const Profile: React.FunctionComponent<AuthNavProps<"Profile">> = ({
  navigation,
}) => {
  const user = useSelector((state: StateType) => state.user);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const saveProfile = async () => {
    if (firstName.trim().length < 3) {
      setError("First name must be at least 3 characters.");
      return;
    }
    if (lastName.trim().length < 3) {
      setError("Last name must be at least 3 characters.");
      return;
    }
    if (!!!user?.user) {
      setError("Authentication error the user is invalid!");
    }
    setLoading(true);
    if (!!!image?.cancelled) {
      const childName = user.user?.uid + ".jpg";
      const uploadRef = ref(storage, `profiles/${childName}`);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image?.uri as any, true);
        xhr.send(null);
      });
      await uploadBytes(uploadRef, blob as any).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            await setDoc(
              doc(db, "users", user.user?.uid as any),
              {
                user: {
                  photoURL: url,
                },
              },
              {
                merge: true,
              }
            ).catch((error) => console.log(error));
            if (auth.currentUser) {
              await updateProfile(auth.currentUser, {
                photoURL: url,
              }).catch((error) => console.log(error));
            }
          })
          .catch((e) => setError(e.message))
          .finally(() => {
            setLoading(false);
          });
      });
    }
    setLoading(true);
    await setDoc(
      doc(db, "users", user.user?.uid as any),
      {
        user: {
          displayName: `${firstName.trim()} ${lastName.trim()}`,
          phoneNumber,
        },
      },
      {
        merge: true,
      }
    )
      .then(() => {})
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    setLoading(true);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      })
        .then(() => {
          setPhoneNumber("");
          setFirstName("");
          setLastName("");
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          setLoading(false);
          dispatch(
            setUser({
              user,
              isLoggedIn: true,
            })
          );
        });
    }
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
          bounces={true}
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
                USER PROFILE
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
                Set up your profile so that we can identify you.
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                maxWidth: 500,
              }}
            >
              <View
                style={{
                  marginVertical: 10,
                  position: "relative",
                }}
              >
                <Image
                  source={{
                    uri:
                      image?.cancelled || !!!image?.uri
                        ? Image.resolveAssetSource(
                            require("../../../../assets/default-avatar.jpg")
                          ).uri
                        : image.uri,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 5,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      alignItems: "center",
                      paddingVertical: 5,
                      flex: 1,
                      backgroundColor: COLORS.dark,
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
                      backgroundColor: COLORS.dark,
                    }}
                    onPress={takeProfile}
                  >
                    <Entypo name="camera" size={24} color={COLORS.gray} />
                  </TouchableOpacity>
                </View>
              </View>
              <CustomTextInput
                leftIcon={
                  <AntDesign name="user" size={24} color={COLORS.main} />
                }
                placeholder="first name"
                text={firstName}
                onChangeText={(text) => setFirstName(text)}
                keyboardType="default"
                containerStyles={{
                  marginBottom: 10,
                }}
              />
              <CustomTextInput
                leftIcon={
                  <AntDesign name="user" size={24} color={COLORS.main} />
                }
                placeholder="last name"
                text={lastName}
                onChangeText={(text) => setLastName(text)}
                keyboardType="default"
                containerStyles={{
                  marginBottom: 10,
                }}
              />
              <CustomTextInput
                leftIcon={
                  <AntDesign name="phone" size={24} color={COLORS.main} />
                }
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
                onPress={saveProfile}
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
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Profile;
