import React from "react";
import { View } from "react-native";
import { Colors } from "../styles";
import ShutdownNowCard from "./ShutdownNowCard";
import ShutdownTimedCard from "./ShutdownTimedCard";

const Main = () => {
  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: Colors.BackgroundColor }}
    >
      <ShutdownNowCard />
      <ShutdownTimedCard style={{ marginTop: 40 }} />
    </View>
  );
};

export default Main;
