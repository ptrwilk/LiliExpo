import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Style } from "../styles";
import NumericInput from "./NumericInput";

interface ITimeInputProps {
  style?: Style;
  maxValue?: number;
  caption?: string;
  value?: number;
  onLostFocus?: (value: number) => void;
}

const TimeInput: React.FC<ITimeInputProps> = ({
  style,
  maxValue,
  caption,
  value,
  onLostFocus,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleLostFocus = (value: number) => {
    setIsFocus(false);
    onLostFocus?.(value);
  };

  return (
    <View style={[style, styles.container]}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocus ? Colors.SecondLightColor : Colors.WhiteColor,
          },
        ]}
      >
        <NumericInput
          style={styles.input}
          value={value}
          maxLength={2}
          maxValue={maxValue}
          onFocus={() => setIsFocus(true)}
          onLostFocus={handleLostFocus}
        />
      </View>
      <Text style={styles.text}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    width: 50,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "200",
    color: Colors.WhiteColor,
    outlineStyle: "none",
  },
  text: {
    fontSize: 18,
    fontWeight: "200",
    color: Colors.WhiteColor,
  },
});

export default TimeInput;
