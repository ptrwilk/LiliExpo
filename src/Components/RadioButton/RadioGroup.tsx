import React from "react";
import { View, StyleSheet } from "react-native";
import { Style } from "../../styles";
import RadioButton from "./RadioButton";

export type RadioGroupOption = {
  value: any;
  label: string;
};

interface IRadioGroupProps {
  style?: Style;
  optionsMargin?: number;
  selectedOption?: RadioGroupOption;
  options?: RadioGroupOption[];
  onPress?: (option: RadioGroupOption) => void;
}

const RadioGroup: React.FC<IRadioGroupProps> = ({
  style,
  optionsMargin = 30,
  selectedOption,
  options = [],
  onPress,
}) => {
  const handlePress = (option: RadioGroupOption) => {
    onPress?.(option);
  };

  return (
    <View style={[style, styles.container]}>
      {options!.map((option, index) => (
        <RadioButton
          key={index}
          text={option.label}
          checked={
            selectedOption === undefined
              ? false
              : option.value === selectedOption.value
          }
          style={{ marginLeft: index === 0 ? 0 : optionsMargin }}
          onPress={() => handlePress(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RadioGroup;
