import { View, Text } from "react-native";
import React from "react";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditDetailsForm: React.FunctionComponent<Props> = ({ setLoading }) => {
  return (
    <View>
      <Text>EditDetailsForm</Text>
      <Text>{}</Text>
    </View>
  );
};

export default EditDetailsForm;
