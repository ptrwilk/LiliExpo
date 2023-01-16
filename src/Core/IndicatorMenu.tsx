import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { getShutdownState } from "../Api/Shutdown";
import Address, { AddressType } from "../Components/Address";
import HttpHttps from "../Components/HttpHttps";
import { useLiliContext } from "../Context/LiliContext";
import { ApiUri, setApiUri } from "../global";
import { Colors } from "../styles";

type IndicatorMenuType = {
  address: AddressType;
  protocol: "http" | "https";
};

const IndicatorMenu = () => {
  const { setServerStatus } = useLiliContext();

  const uriToIndicatorMenuType = (): IndicatorMenuType => {
    const match = ApiUri.match(/(\w+):\/\/(\d+).(\d+).(\d+).(\d+):(\d+)/);

    return {
      address: {
        a: +match[2],
        b: +match[3],
        c: +match[4],
        d: +match[5],
        port: +match[6],
      },
      protocol: match[1] as any,
    };
  };

  const [{ address, protocol }, setValue] = useState<IndicatorMenuType>(
    uriToIndicatorMenuType()
  );

  const indicatorMenuTypeToUri = () => {
    return `${protocol}://${address.a}.${address.b}.${address.c}.${address.d}:${address.port}`;
  };

  const handleCheckConnection = () => {
    setServerStatus("unknown");

    getShutdownState()
      .then(() => setServerStatus("on"))
      .catch(() => setServerStatus("off"));
  };

  useEffect(() => {
    setApiUri(indicatorMenuTypeToUri());
  }, [address, protocol]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: Colors.WhiteColor,
      }}
    >
      <Address
        address={address}
        onLostFocus={(value) =>
          setValue((prev) => ({ ...prev, address: value }))
        }
      />
      <HttpHttps
        style={{ marginTop: 40 }}
        selectedOption={protocol}
        selectedOptionChange={(value) =>
          setValue((prev) => ({ ...prev, protocol: value }))
        }
      />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button title="Check connection" onPress={handleCheckConnection} />
      </View>
    </View>
  );
};

export default IndicatorMenu;
