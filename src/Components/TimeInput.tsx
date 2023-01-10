import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Style } from "../styles";
import NumericInput from "./NumericInput";

interface ITimeInputProps {
  timeInputRef?: React.MutableRefObject<number>;
  style?: Style;
  maxValue?: number;
  minValue?: number;
  caption?: string;
}

const TimeInput: React.FC<ITimeInputProps> = ({
  timeInputRef,
  style,
  maxValue,
  minValue,
  caption,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (value: number) => {
    if (timeInputRef !== undefined) {
      timeInputRef.current = value;
    }
  };

  useEffect(() => {
    if (timeInputRef !== undefined && timeInputRef.current === undefined) {
      timeInputRef.current = 0;
    }
  }, []);

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
          defaultValue={timeInputRef !== undefined ? timeInputRef.current : 0}
          style={styles.input}
          maxLength={2}
          maxValue={maxValue}
          minValue={minValue}
          onFocus={() => setIsFocus(true)}
          onLostFocus={() => setIsFocus(false)}
          onValueChange={handleChange}
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
