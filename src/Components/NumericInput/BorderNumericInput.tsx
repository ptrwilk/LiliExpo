import { useState } from "react";
import { View, StyleSheet, ColorValue } from "react-native";
import { Colors, Style } from "../../styles";
import NumericInput from "./NumericInput";

interface IBorderNumericInputProps {
  style?: Style;
  maxLength?: number;
  maxValue?: number;
  value?: number;
  width?: number;
  color?: ColorValue;
  focusColor?: ColorValue;
  onLostFocus?: (value: number) => void;
}

const BorderNumericInput: React.FC<IBorderNumericInputProps> = ({
  style,
  maxLength,
  maxValue,
  value,
  width = 50,
  color = Colors.WhiteColor,
  focusColor = Colors.SecondLightColor,
  onLostFocus,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleLostFocus = (value: number) => {
    setIsFocus(false);
    onLostFocus?.(value);
  };

  return (
    <View
      style={[
        style,
        styles.container,
        {
          width: width,
          borderColor: isFocus ? focusColor : color,
        },
      ]}
    >
      <NumericInput
        style={{ ...styles.input, color: color }}
        maxLength={maxLength}
        maxValue={maxValue}
        value={value}
        onFocus={() => setIsFocus(true)}
        onLostFocus={handleLostFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "200",
    outlineStyle: "none",
  },
});

export default BorderNumericInput;
