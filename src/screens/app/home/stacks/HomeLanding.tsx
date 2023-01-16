import { Text, ScrollView, View, Image, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { HomeStackNavProps } from "../../../../params";
import {
  COLORS,
  FONTS,
  mapTypes,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../../constants";
import { useLocationPermission } from "../../../../hooks";
import MapView, { Callout, MapTypes, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";

const Landing: React.FC<HomeStackNavProps<"HomeLanding">> = ({
  navigation,
}) => {
  const { granted } = useLocationPermission();
  const [mapType, setMapType] = useState<MapTypes>("none");
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
    <ScrollView style={{ backgroundColor: COLORS.dark, flex: 1 }}>
      {!!location ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          zoomControlEnabled
          minZoomLevel={7}
          showsUserLocation={true}
          liteMode
          mapType={mapType}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 2,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
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
      <View>
        <View
          style={{
            padding: 10,
          }}
        >
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
        <View style={{ padding: 10 }}>
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
      </View>
    </ScrollView>
  );
};

export default Landing;
