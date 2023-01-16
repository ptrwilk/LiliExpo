import { useState } from "react";
import { View } from "react-native";
import { Colors, Style } from "../styles";
import Caption from "./Caption";
import BorderNumericInput from "./NumericInput/BorderNumericInput";

export type AddressType = {
  a: number;
  b: number;
  c: number;
  d: number;
  port: number;
};

interface IAddressProps {
  address?: AddressType;
  style?: Style;
  onLostFocus?: (address: AddressType) => void;
}

const Address: React.FC<IAddressProps> = ({
  address: addressProp = { a: 0, b: 0, c: 0, d: 0, port: 0 },
  style,
  onLostFocus,
}) => {
  const [address, setAddress] = useState<AddressType>(addressProp);

  const handleLostFocus = (address: AddressType) => {
    setAddress(address);
    onLostFocus?.(address);
  };

  return (
    <View style={[style, { flexDirection: "row" }]}>
      <Caption caption="Address" color={Colors.BlackColor}>
        <View style={{ flexDirection: "row" }}>
          <BorderNumericInput
            value={address.a}
            maxLength={3}
            color={Colors.BlackColor}
            focusColor={Colors.SelectionColor}
            onLostFocus={(value) => handleLostFocus({ ...address, a: value })}
          />
          <BorderNumericInput
            value={address.b}
            style={[{ marginLeft: 10 }]}
            maxLength={3}
            color={Colors.BlackColor}
            focusColor={Colors.SelectionColor}
            onLostFocus={(value) => handleLostFocus({ ...address, b: value })}
          />
          <BorderNumericInput
            value={address.c}
            style={{ marginLeft: 10 }}
            maxLength={3}
            color={Colors.BlackColor}
            focusColor={Colors.SelectionColor}
            onLostFocus={(value) => handleLostFocus({ ...address, c: value })}
          />
          <BorderNumericInput
            value={address.d}
            style={{ marginLeft: 10 }}
            maxLength={3}
            color={Colors.BlackColor}
            focusColor={Colors.SelectionColor}
            onLostFocus={(value) => handleLostFocus({ ...address, d: value })}
          />
        </View>
      </Caption>
      <Caption
        caption="Port"
        style={{ marginLeft: 20 }}
        color={Colors.BlackColor}
      >
        <BorderNumericInput
          value={address.port}
          width={90}
          maxLength={5}
          color={Colors.BlackColor}
          focusColor={Colors.SelectionColor}
          onLostFocus={(value) => handleLostFocus({ ...address, port: value })}
        />
      </Caption>
    </View>
  );
};

export default Address;
