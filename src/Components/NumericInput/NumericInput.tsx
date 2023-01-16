import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { isEmptyOrUndefined } from "../../Helpers/Helper";
import { Style } from "../../styles";

interface INumericInput {
  maxLength?: number;
  style?: Style;
  value?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
  onLostFocus?: (value: number) => void;
  onFocus?: () => void;
}

const NumericInput: React.FC<INumericInput> = ({
  maxLength,
  style,
  value: propValue = 0,
  maxValue,
  onValueChange,
  onLostFocus,
  onFocus,
}) => {
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    setValue(propValue?.toString());
  }, [propValue]);

  const ref = useRef<TextInput>();

  const handleTextChange = (text: string) => {
    //Check if text is a number
    if (!isNaN(text as any)) {
      const newValue = isEmptyOrUndefined(text) ? undefined : text;
      const numericValue = Number(newValue);

      if (maxValue && numericValue > maxValue) return;

      setValue(newValue);

      onValueChange?.(isNaN(+newValue) ? 0 : Number(newValue));
    }
  };

  const keyboardBackPress = () => {
    ref.current?.blur();
    return true;
  };

  const handleLostFocus = () => {
    if (isEmptyOrUndefined(value)) {
      setValue("0");
    }

    Keyboard.removeAllListeners("keyboardDidHide");

    onLostFocus?.(!isEmptyOrUndefined(value) ? Number(value) : 0);
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
