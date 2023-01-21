import "react-native-get-random-values";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NewProblemStackNavProps } from "../../../../params";
import { FONTS, COLORS, mapTypes, SCREEN_HEIGHT } from "../../../../constants";
import { useLocationPermission } from "../../../../hooks";
import * as Location from "expo-location";
import { BoxIndicator, CustomTextInput } from "../../../../components";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MapView, { Callout, MapTypes, Marker } from "react-native-maps";
import { pick } from "lodash";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db, timestamp } from "../../../../firebase";
import { v4 as uuid_v4 } from "uuid";
import { generateBobFile } from "../../../../utils";

const NewProblemLanding: React.FunctionComponent<
  NewProblemStackNavProps<"NewProblemLanding">
> = ({ navigation }) => {
  const { granted } = useLocationPermission();
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [problemNote, setProblemNote] = useState<string>("");
  const [location, setLocation] = useState<Location.LocationObject>();
  const [images, setImages] = useState<ImagePicker.ImageInfo[]>([]);
  const [currentReversedLocation, setCurrentReversedLocation] =
    useState<Location.LocationGeocodedAddress>();
  const [mapType, setMapType] = useState<MapTypes>("none");
  const [locationName, setLocationName] = useState<string>("");
  const { user } = useSelector((state: StateType) => state.user);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentReversedLocation
        ? `${currentReversedLocation.name}`
        : "No Location",
      headerTitleStyle: {
        fontFamily: FONTS.regularBold,
        color: COLORS.gray,
      },
      headerStyle: {
        backgroundColor: COLORS.main,
        elevation: 0,
        borderBottomColor: "transparent",
        borderBottomWidth: 0,
        shadowOpacity: 0,
      },
    });
  }, [currentReversedLocation]);

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && granted) {
      (async () => {
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [granted]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted)
      (async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted && mounted && location) {
          const reversed = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setCurrentReversedLocation(reversed[0]);
        }
      })();
    return () => {
      mounted = false;
    };
  }, [location]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && currentReversedLocation) {
      setLocationName(currentReversedLocation.name ?? "");
    }

    return () => {
      mounted = false;
    };
  }, [currentReversedLocation]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && currentReversedLocation) {
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [currentReversedLocation]);

  const selectImages = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (granted) {
      const images = await ImagePicker.launchImageLibraryAsync({
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });
      if (images.cancelled) return;
      setImages([...images.selected]);
    } else {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) return;
      const images = await ImagePicker.launchImageLibraryAsync({
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });
      if (images.cancelled) return;
      setImages(images.selected);
    }
  };
  const takeImages = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (granted) {
      const images = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (images.cancelled) return;
      setImages([images]);
    } else {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) return;
      const images = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (images.cancelled) return;
      setImages([images]);
    }
  };

  const submitIssue = async () => {
    if (images.length === 0) {
      Alert.alert(
        "water-burst-app",
        "Image(s) are required when submitting a water issue.",
        [
          {
            text: "OK",
            style: "destructive",
            onPress: () => {},
          },
        ]
      );

      return;
    }

    if (!!!problemNote) {
      Alert.alert(
        "water-burst-app",
        "Problem Note is required when submitting a water issue.",
        [
          {
            text: "OK",
            style: "destructive",
            onPress: () => {},
          },
        ]
      );
      return;
    }
    if (!!!problemDescription) {
      Alert.alert(
        "water-burst-app",
        "Problem description is required when submitting a water issue.",
        [
          {
            text: "OK",
            style: "destructive",
            onPress: () => {},
          },
        ]
      );
      return;
    }

    setLoading(true);
    const geoCoords = pick(location?.coords, ["latitude", "longitude"]);
    const _issueData = {
      geoCoords,
      locationDetails: currentReversedLocation,
      images: [],
      problemDescription,
      problemNote,
      user: pick(user, [
        "uid",
        "email",
        "displayName",
        "photoURL",
        "phoneNumber",
      ]),
      timestamp: timestamp,
      status: "submitted",
    };

    let _images: string[] = [];
    if (images.length > 0 && !!user) {
      try {
        for (let i = 0; i < images.length; i++) {
          const { fileName, uri } = images[i];
          const _fileName =
            uuid_v4().slice(0, 10) + "." + (fileName as any).split(".")[1];
          const storageRef = ref(storage, `images/${_fileName}`);
          const blob = await generateBobFile(uri);
          await uploadBytes(storageRef, blob as any)
            .then(async (snapshot) => {
              await getDownloadURL(snapshot.ref)
                .then(async (url) => {
                  _images.push(url);
                })
                .catch((e) => console.error(e.message));
            })
            .catch((error) => console.log({ error }));
        }
      } catch (error) {
        console.log({ error });
      }
    }
    if (_images.length === images.length) {
      await addDoc(collection(db, "issues"), {
        ..._issueData,
        images: _images,
      })
        .then(async (issue) => {
          const docRef = doc(db, "issues", issue.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            navigation.navigate("NewIssueSubmittedResult", {
              issue: JSON.stringify(docSnap.data()),
            });
          }
        })
        .catch((error) => {
          console.log({ error });
        })
        .finally(() => {
          setLoading(false);
          setProblemDescription("");
          setProblemNote("");
          setImages([]);
        });
    }
  };

  if (!!!currentReversedLocation)
    return (
      <View
        style={{
          backgroundColor: COLORS.dark,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxIndicator size={30} color={COLORS.main} />
      </View>
    );
  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
        position: "relative",
      }}
      onPress={Keyboard.dismiss}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.dark,
          padding: 10,
        }}
      >
        {loading ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, .5)",
              paddingTop: SCREEN_HEIGHT / 2,
              alignItems: "center",
            }}
          >
            <BoxIndicator size={20} color={COLORS.main} />
          </View>
        ) : null}
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            marginBottom: 3,
          }}
        >
          You current location is {`"${currentReversedLocation?.name}"`}.
        </Text>
        <CustomTextInput
          placeholder="Enter location name"
          text={locationName}
          onChangeText={(text) => setLocationName(text)}
          leftIcon={<Ionicons name="location" size={24} color={COLORS.main} />}
          rightIcon={<Ionicons name="search" size={24} color={COLORS.main} />}
        />
        <View style={{ padding: 10, alignItems: "flex-end" }}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONTS.regularBold,
              fontSize: 20,
              marginBottom: 2,
            }}
          >
            {currentReversedLocation?.name}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONTS.regular,
              fontSize: 16,
              marginBottom: 2,
            }}
          >
            {currentReversedLocation?.district}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONTS.regular,
              fontSize: 16,
              marginBottom: 2,
            }}
          >
            {`${currentReversedLocation?.city} (${currentReversedLocation?.region})`}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONTS.regular,
              fontSize: 16,
              marginBottom: 2,
            }}
          >
            {`${
              currentReversedLocation?.country
            } (${currentReversedLocation?.isoCountryCode?.toLocaleLowerCase()})`}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONTS.regular,
              fontSize: 16,
              marginBottom: 2,
            }}
          >
            {currentReversedLocation?.postalCode}
          </Text>
        </View>
        {/* Location */}
        {/* decription */}
        {/* Note */}
        <CustomTextInput
          placeholder="Enter problem note"
          text={problemNote}
          onChangeText={(text) => setProblemNote(text)}
          containerStyles={{
            marginTop: 10,
          }}
          leftIcon={<Entypo name="pencil" size={24} color={COLORS.main} />}
        />

        <CustomTextInput
          placeholder="Enter problem description"
          text={problemDescription}
          onChangeText={(text) => setProblemDescription(text)}
          containerStyles={{
            marginTop: 10,
            height: 200,
          }}
          multiline
          inputStyle={{
            width: "100%",
            height: "100%",
          }}
        />
        {/* image */}
        <View
          style={{
            backgroundColor: COLORS.gray,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 150,
              borderStyle: "dashed",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: images.length === 0 ? 2 : 0,
              borderColor: COLORS.main,
              flexDirection: images.length === 0 ? "column" : "row",
            }}
            activeOpacity={0.7}
            onPress={selectImages}
          >
            {images.length === 0 ? (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Select an image or images (max limit = 5).
              </Text>
            ) : (
              images.map(({ uri }, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{ width: "20%", height: 100, margin: 2, flex: 1 }}
                  resizeMode="cover"
                />
              ))
            )}
          </TouchableOpacity>
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
              onPress={selectImages}
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
              onPress={takeImages}
            >
              <Entypo name="camera" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        </View>

        {/* map */}

        <View
          style={{
            width: "100%",
            height: 200,
            marginTop: 10,
            padding: 10,
            backgroundColor: COLORS.gray,
            borderRadius: 5,
          }}
        >
          {!!location ? (
            <MapView
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              zoomControlEnabled
              minZoomLevel={5}
              showsUserLocation={true}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <Callout>
                  <View>
                    <Text
                      style={{
                        fontFamily: FONTS.regularBold,
                      }}
                    >
                      {currentReversedLocation?.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                      }}
                    >
                      {currentReversedLocation?.district}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                      }}
                    >
                      {currentReversedLocation?.city}
                    </Text>

                    <View style={{ flexDirection: "row", padding: 10 }}>
                      {images.map(({ uri }, index) => (
                        <Image
                          key={index.toString()}
                          source={{ uri }}
                          style={{
                            width: 50,
                            height: 50,
                            margin: 2,
                          }}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          ) : null}
        </View>
        {!!location ? (
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: COLORS.gray,
                fontFamily: FONTS.regularBold,
                fontSize: 20,
                marginBottom: 2,
              }}
            >
              Map Styles
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                fontFamily: FONTS.regular,
                marginBottom: 10,
              }}
            >
              Select a map style you want
            </Text>
            <FlatList
              data={mapTypes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setMapType(item as any)}
                  style={{
                    backgroundColor:
                      item === mapType
                        ? COLORS.gray
                        : index % 2 === 0
                        ? COLORS.main
                        : COLORS.green,
                    padding: 10,
                    width: 100,
                    height: 50,
                    marginRight: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: item === mapType ? COLORS.main : COLORS.gray,
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
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
            onPress={submitIssue}
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
              SUBMIT ISSUE
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 150,
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default NewProblemLanding;
