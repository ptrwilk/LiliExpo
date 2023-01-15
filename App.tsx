import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LiliContext, ServerStatus } from "./src/Context/LiliContext";
import Heading from "./src/Core/Heading";
import Main from "./src/Core/Main";
import { Colors } from "./src/styles";

const Header = () => {
  return <View style={{ height: 30, backgroundColor: Colors.WhiteColor }} />;
};

export default function App() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>("unknown");

  return (
    <>
      <StatusBar backgroundColor={Colors.WhiteColor} />
      <LiliContext.Provider value={{ serverStatus, setServerStatus }}>
        <View style={styles.container}>
          <Header />
          <Heading />
          <Main />
        </View>
      </LiliContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
  },
});
