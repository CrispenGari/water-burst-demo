import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { COLORS, FONTS } from "../../constants";

interface Props {
  tableData: Array<any[]>;
}
const LocationTable: React.FunctionComponent<Props> = ({ tableData }) => {
  return (
    <View style={{ width: "100%", borderRadius: 5 }}>
      <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.main }}>
        <Rows
          data={tableData}
          flexArr={[1, 2]}
          textStyle={{
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontFamily: FONTS.regular,
            fontSize: 16,
            textTransform: "capitalize",
          }}
        />
      </Table>
    </View>
  );
};

export default LocationTable;
