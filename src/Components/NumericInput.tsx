import React, { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { Style } from "../styles";

interface INumericInput {
  maxLength?: number;
  style?: Style;
  inputRef?: React.MutableRefObject<number | undefined>;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  onValueChange?: (value: number) => void;
  onLostFocus?: () => void;
  onFocus?: () => void;
}

const NumericInput: React.FC<INumericInput> = ({
  maxLength,
  style,
  inputRef,
  defaultValue = 0,
  maxValue,
  minValue,
  onValueChange,
  onLostFocus,
  onFocus,
}) => {
  const [value, setValue] = useState<string | undefined>(
    defaultValue?.toString()
  );

  const ref = useRef<TextInput>();

  if (inputRef) {
    inputRef.current = value === undefined ? undefined : +value;
  }

  const handleTextChange = (text: string) => {
    //Check if text is a number
    if (!isNaN(text as any)) {
      const newValue = text === "" ? undefined : text;
      const numericValue = Number(newValue);

      if (maxValue && numericValue > maxValue) return;
      if (minValue && numericValue < minValue) return;

      setValue(newValue);

      onValueChange?.(isNaN(+newValue) ? 0 : Number(newValue));
    }
  };

  const keyboardBackPress = () => {
    ref.current.blur();
    return true;
  };

  const handleLostFocus = () => {
    if (value === undefined || value === "") {
      setValue(minValue !== undefined ? minValue.toString() : "0");
    }

    Keyboard.removeAllListeners("keyboardDidHide");

    onLostFocus?.();
  };

  const handleFocus = () => {
    Keyboard.addListener("keyboardDidHide", keyboardBackPress);

    onFocus?.();
  };

  return (
    <TextInput
      ref={ref}
      style={style}
      maxLength={maxLength}
      keyboardType="phone-pad"
      value={value ?? ""}
      selectTextOnFocus
      onChangeText={handleTextChange}
      onBlur={handleLostFocus}
      onFocus={handleFocus}
    />
  );
};

export default NumericInput;
