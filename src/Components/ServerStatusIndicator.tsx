import React from "react";
import { Colors } from "../styles";
import { FontCircleButton } from "./CircleButton";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import { ServerStatus } from "../Context/LiliContext";

interface IServerStatusIndicator {
  status: ServerStatus;
  onPress?: () => void;
}

const ServerStatusIndicator: React.FC<IServerStatusIndicator> = ({
  status,
  onPress,
}) => {
  return (
    <FontCircleButton
      size={40}
      color={Colors.BackgroundColor}
      pressedColor={Colors.BackgroundDarkColor}
      onPress={onPress}
    >
      <Entypo name="signal" size={24} color="black" />
      <View
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          right: 0,
          bottom: 0,
          borderRadius: 8,
          borderColor: "transparent", //TODO: Without this the shape is rectangle for some reason instead of circle
          backgroundColor:
            status === "unknown"
              ? undefined
              : status === "on"
              ? Colors.ServerStatusOn
              : Colors.ServerStatusOff,
        }}
      />
    </FontCircleButton>
  );
};

export default ServerStatusIndicator;
