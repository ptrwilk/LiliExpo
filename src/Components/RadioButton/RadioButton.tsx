import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Style } from "../../styles";

interface IRadioButtonProps {
  style?: Style;
  text?: string;
  checked?: boolean;
  onPress?: () => void;
}

const RadioButton: React.FC<IRadioButtonProps> = ({
  style,
  text,
  checked,
  onPress,
}) => {
  return (
    <Pressable style={[style, styles.container]} onPress={onPress}>
      <View style={styles.outsideCircle}>
        {checked && <View style={styles.insideCircle} />}
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  outsideCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  insideCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "black",
    borderWidth: 1,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 2,
    fontWeight: "200",
  },
});

export default RadioButton;
