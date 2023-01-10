import React from "react";
import { View } from "react-native";
import ShutdownNowCard from "./ShutdownNowCard";
import ShutdownTimedCard from "./ShutdownTimedCard";

const Main = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ShutdownNowCard />
      <ShutdownTimedCard style={{ marginTop: 40 }} />
    </View>
  );
};

export default Main;
