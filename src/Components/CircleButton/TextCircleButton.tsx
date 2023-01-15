import React from "react";
import { Text, StyleSheet, ColorValue, Pressable } from "react-native";

interface ITextCircleButtonProps {
  text?: string;
  textSize?: number;
  textColor?: ColorValue;
  size?: number;
  color?: ColorValue;
  pressedColor?: ColorValue;
  disabled?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const TextCircleButton: React.FC<ITextCircleButtonProps> = ({
  text,
  textSize,
  textColor,
  size,
  color,
  pressedColor,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: pressed ? pressedColor : color,
          opacity: disabled === true ? 0.5 : 1,
        },
      ]}
    >
      <Text style={{ fontSize: textSize, color: textColor, fontWeight: "200" }}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export { TextCircleButton };
