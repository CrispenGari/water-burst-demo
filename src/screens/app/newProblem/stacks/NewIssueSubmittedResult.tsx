import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NewProblemStackNavProps } from "../../../../params";
import { FONTS, COLORS, mapTypes } from "../../../../constants";
import { AppStackBackButton, LocationTable } from "../../../../components";
import MapView, { Callout, MapTypes, Marker } from "react-native-maps";

const NewIssueSubmittedResult: React.FunctionComponent<
  NewProblemStackNavProps<"NewIssueSubmittedResult">
> = ({ route, navigation }) => {
  const [mapType, setMapType] = useState<MapTypes>("none");
  const issue = JSON.parse(route.params.issue);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: issue.problemNote,
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
      headerLeft: ({}) => (
        <AppStackBackButton
          label="New Issue"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.dark,
        padding: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regularExtraBold,
          letterSpacing: 1,
          fontSize: 25,
          marginBottom: 5,
          color: COLORS.gray,
        }}
      >
        {issue?.problemNote}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: 16,
          marginBottom: 5,
          color: COLORS.gray,
        }}
      >
        {issue?.problemDescription}
      </Text>

      <View style={{ padding: 10, alignItems: "flex-end" }}>
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regularBold,
            fontSize: 20,
            marginBottom: 2,
          }}
        >
          {issue?.locationDetails?.name}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 16,
            marginBottom: 2,
          }}
        >
          {issue?.locationDetails?.district}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 16,
            marginBottom: 2,
          }}
        >
          {`${issue?.locationDetails?.city} (${issue?.locationDetails?.region})`}
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
            issue?.locationDetails?.country
          } (${issue?.locationDetails?.isoCountryCode?.toLocaleLowerCase()})`}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regular,
            fontSize: 16,
            marginBottom: 2,
          }}
        >
          {issue?.locationDetails?.postalCode}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 400,
          marginTop: 10,
          padding: 10,
          backgroundColor: COLORS.gray,
          borderRadius: 5,
        }}
      >
        {!!issue?.geoCoords ? (
          <MapView
            initialRegion={{
              latitude: issue?.geoCoords?.latitude,
              longitude: issue?.geoCoords?.longitude,
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
                latitude: issue?.geoCoords?.latitude,
                longitude: issue?.geoCoords?.longitude,
              }}
            >
              <Callout>
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.regularBold,
                    }}
                  >
                    {issue?.locationDetails?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                    }}
                  >
                    {issue?.locationDetails?.district}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                    }}
                  >
                    {issue?.locationDetails?.city}
                  </Text>

                  <View style={{ flexDirection: "row", padding: 10 }}>
                    {issue?.images?.map((uri: any, index: number) => (
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
      {!!issue ? (
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
          width: "100%",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regularBold,
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Issue Images
        </Text>

        <FlatList
          data={issue?.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: 300, height: 300, marginRight: 5 }}
              source={{ uri: item }}
            />
          )}
        />
      </View>
      <View
        style={{
          width: "100%",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontFamily: FONTS.regularBold,
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Issues Location Address Table
        </Text>
        {!!Object.entries(issue?.locationDetails).length ? (
          <LocationTable tableData={Object.entries(issue?.locationDetails)} />
        ) : null}
      </View>

      <TouchableOpacity
        style={{
          width: "80%",
          maxWidth: 300,
          backgroundColor: COLORS.green,
          alignItems: "center",
          padding: 10,
          marginVertical: 20,
          alignSelf: "center",
        }}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
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
          SUBMIT NEW ISSUE
        </Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};
export default NewIssueSubmittedResult;
