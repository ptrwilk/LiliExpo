import React from "react";
import { Style } from "../styles";
import Caption from "./Caption";
import BorderNumericInput from "./NumericInput/BorderNumericInput";

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
  return (
    <Caption style={style} caption={caption}>
      <BorderNumericInput
        value={value}
        maxLength={2}
        maxValue={maxValue}
        onLostFocus={onLostFocus}
      />
    </Caption>
  );
};

export default TimeInput;
