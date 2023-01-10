import { StyleProp, ViewStyle, TextStyle } from "react-native";

export const Colors = {
  BackgroundColor: "#E7EBF0",
  BackgroundDarkColor: "#d7dbe0",
  WhiteColor: "#FFFFFF",
  FirstColor: "#76B6A2",
  FirstDarkColor: "#56A38A",
  FirstDarkerColor: "#3A6F5D",
  SecondColor: "#4099FF",
  SecondDarkColor: "#0D7EFF",
  SecondDarkerColor: "#0065D9",
  SecondLightColor: "#06F6FF",
};

export type Style = StyleProp<ViewStyle> | undefined | TextStyle;
