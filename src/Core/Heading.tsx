import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles";
import { Entypo } from "@expo/vector-icons";
import { FontCircleButton } from "../Components/CircleButton";

const Heading = () => {
  return (
    <SingleSidedShadowBox>
      <View style={styles.container}>
        <Text style={styles.text}>L I L I</Text>
        <View style={styles.rightContainer}>
          <FontCircleButton
            size={40}
            color={Colors.BackgroundColor}
            pressedColor={Colors.BackgroundDarkColor}
          >
            <Entypo name="signal" size={24} color="black" />
          </FontCircleButton>
        </View>
      </View>
    </SingleSidedShadowBox>
  );
};

const SingleSidedShadowBox = ({ children }) => (
  <View style={{ overflow: "hidden", paddingBottom: 5 }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    elevation: 8,
    backgroundColor: Colors.WhiteColor,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rightContainer: {
    position: "absolute",
    right: 10,
  },
});

export default Heading;
