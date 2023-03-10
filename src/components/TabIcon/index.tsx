import React from "react";
import { View, Image, Text } from "react-native";
import { COLORS } from "../../constants";
interface IconI {
  IconComponent: any;
  name: string;
}
interface Props {
  title?: string;
  Icon: IconI;
  focused: boolean;
}
const TabIcon: React.FC<Props> = ({ focused, Icon, title }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: 300,
        },
      ]}
    >
      <Icon.IconComponent
        name={Icon.name}
        size={20}
        color={focused ? COLORS.dark : COLORS.gray}
      />
      <Text style={{ color: focused ? COLORS.dark : COLORS.gray }}>
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;
