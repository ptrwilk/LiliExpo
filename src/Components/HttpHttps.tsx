import React, { useState } from "react";
import { Style } from "../styles";
import RadioGroup, { RadioGroupOption } from "./RadioButton/RadioGroup";

type HttpHttpsType = "http" | "https";

interface IHttpHttpsProps {
  style?: Style;
  selectedOption?: HttpHttpsType;
  selectedOptionChange?: (options: HttpHttpsType) => void;
}

const HttpHttps: React.FC<IHttpHttpsProps> = ({
  style,
  selectedOption,
  selectedOptionChange,
}) => {
  const radioGroupOptions = [
    { value: 1, label: "http" },
    { value: 2, label: "https" },
  ];

  const [option, setOption] = useState(selectedOption);

  const handlePress = ({ label }: RadioGroupOption) => {
    setOption(label as HttpHttpsType);

    if (option !== label) {
      selectedOptionChange?.(label as HttpHttpsType);
    }
  };

  return (
    <RadioGroup
      style={style}
      selectedOption={radioGroupOptions.find((x) => x.label === option)}
      options={radioGroupOptions}
      onPress={handlePress}
    />
  );
};

export default HttpHttps;
