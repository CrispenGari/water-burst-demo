import "react-native-gesture-handler";
import { StyleSheet, Text, View, LogBox, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ReduxProvider from "./src/providers/ReduxProvider";
import Routes from "./src/pages/Routes";
import { COLORS, Fonts } from "./src/constants";
import { BoxIndicator } from "./src/components";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

const App = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <BoxIndicator size={30} color={COLORS.green} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <StatusBar animated barStyle={"light-content"} />
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
});
