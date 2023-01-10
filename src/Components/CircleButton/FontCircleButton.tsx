import React from "react";
import { StyleSheet, ColorValue, Pressable } from "react-native";

interface ICircleButtonProps {
  children: any;
  size?: number;
  color?: ColorValue;
  pressedColor?: ColorValue;
}

const FontCircleButton: React.FC<ICircleButtonProps> = ({
  children,
  size,
  color,
  pressedColor,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: pressed ? pressedColor : color,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export { FontCircleButton };
