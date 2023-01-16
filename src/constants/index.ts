import { Dimensions } from "react-native";

export const SCREEN_WIDTH: number = Dimensions.get("screen").width;
export const SCREEN_HEIGHT: number = Dimensions.get("screen").height;

export const mapTypes = [
  "none",
  "hybrid",
  "mutedStandard",
  "satellite",
  "standard",
  "terrain",
];
export const constants = {
  SET_USER: "SET_USER",
};

export const COLORS = {
  main: "#045757",
  dark: "#222222",
  green: "#044343",
  gray: "#E4E4E4",
};

export const Fonts = {
  EpilogueItalic: require("../../assets/fonts/static/Epilogue-Italic.ttf"),
  Epilogue: require("../../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  EpilogueBold: require("../../assets/fonts/static/Epilogue-Bold.ttf"),
  EpilogueBoldItalic: require("../../assets/fonts/static/Epilogue-BoldItalic.ttf"),
  EpilogueExtraBold: require("../../assets/fonts/static/Epilogue-ExtraBold.ttf"),
  EpilogueExtraBoldItalic: require("../../assets/fonts/static/Epilogue-ExtraBoldItalic.ttf"),
};

export const FONTS = {
  regular: "Epilogue",
  italic: "EpilogueItalic",
  italicBold: "EpilogueBoldItalic",
  italicExtraBold: "EpilogueExtraBoldItalic",
  regularBold: "EpilogueBold",
  regularExtraBold: "EpilogueExtraBold",
};
