import { StyleSheet, View } from "react-native";
import Heading from "./src/Core/Heading";
import Main from "./src/Core/Main";
import { Colors } from "./src/styles";

const Header = () => {
  return (
    <View style={{ height: 30, backgroundColor: Colors.WhiteColor }}></View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Heading />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
  },
});
