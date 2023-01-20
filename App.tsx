import "react-native-gesture-handler";
import { StyleSheet, Text, View, LogBox, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ReduxProvider from "./src/providers/ReduxProvider";
import Routes from "./src/pages/Routes";
import { COLORS, Fonts } from "./src/constants";
import { BoxIndicator } from "./src/components";

export default function App() {
  const [loaded] = useFonts(Fonts);

  LogBox.ignoreLogs;

  if (!loaded) {
    return (
      <View style={styles.container}>
        <BoxIndicator size={30} color={COLORS.green} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar animated barStyle={"light-content"} />
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
