import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { IssuesStackParamList } from "../../params";

interface Props {
  issue: any;
  navigation: StackNavigationProp<
    IssuesStackParamList,
    "IssuesLanding",
    undefined
  >;
}
const Issue: React.FunctionComponent<Props> = ({ issue, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("IssueDetails", {
          issue: JSON.stringify(issue),
        });
      }}
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.green,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: FONTS.regularBold,
            color: "white",
            fontSize: 23,
            marginBottom: 5,
          }}
        >
          {issue?.problemNote}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: "gray",
            fontSize: 16,
          }}
        >
          {`${new Date(issue?.timestamp?.seconds * 1000).toDateString()} - ${
            issue?.locationDetails?.district
          }, ${issue?.locationDetails?.city}`}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: FONTS.regular,
          color: "gray",
          fontSize: 16,
        }}
      >
        {issue?.status}
      </Text>
    </TouchableOpacity>
  );
};

export default Issue;
