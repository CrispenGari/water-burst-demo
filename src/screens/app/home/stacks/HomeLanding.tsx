import { Text, ScrollView, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { HomeStackNavProps } from "../../../../params";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../../constants";
import { useLocationPermission } from "../../../../hooks";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

const Landing: React.FC<HomeStackNavProps<"HomeLanding">> = ({
  navigation,
}) => {
  const { granted } = useLocationPermission();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [currentReversedLocation, setCurrentReversedLocation] =
    useState<Location.LocationGeocodedAddress>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentReversedLocation
        ? `${currentReversedLocation.name}`
        : "No Location",
      headerTitleStyle: {
        fontFamily: FONTS.regularBold,
        color: COLORS.gray,
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

  return (
    <View style={{ backgroundColor: "white" }}>
      {!!location ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          zoomControlEnabled
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            icon={require("../../../../../assets/location-marker.png")}
          >
            <Callout>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                }}
              >
                {currentReversedLocation?.name}
              </Text>
              <Text>{currentReversedLocation?.district}</Text>
              <Text>{currentReversedLocation?.city}</Text>
            </Callout>
          </Marker>
        </MapView>
      ) : null}
    </View>
  );
};

export default Landing;
