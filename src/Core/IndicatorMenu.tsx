import { View, Text, Button } from "react-native";
import Address from "../Components/Address";
import HttpHttps from "../Components/HttpHttps";
import { Colors } from "../styles";

const IndicatorMenu = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: Colors.WhiteColor,
      }}
    >
      <Address />
      <HttpHttps style={{ marginTop: 40 }} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button title="Check connection" />
      </View>
    </View>
  );
};

export default IndicatorMenu;
