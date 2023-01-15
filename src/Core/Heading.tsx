import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles";
import ServerStatusIndicator from "../Components/ServerStatusIndicator";
import { useEffect } from "react";
import { getShutdownState } from "../Api/Shutdown";
import { useLiliContext } from "../Context/LiliContext";

const Heading = ({ navigate }) => {
  const { serverStatus, setServerStatus } = useLiliContext();

  useEffect(() => {
    getShutdownState()
      .then(() => {
        setServerStatus("on");
      })
      .catch(() => {
        setServerStatus("off");
      });
  }, []);

  return (
    <SingleSidedShadowBox>
      <View style={styles.container}>
        <Text style={styles.text}>L I L I</Text>
        <View style={styles.rightContainer}>
          <ServerStatusIndicator
            status={serverStatus}
            onPress={() => navigate("indicator-menu")}
          />
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
