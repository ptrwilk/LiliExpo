import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { toHoursMinutesSeconds, toTotalSeconds } from "../Helpers/Helper";
import { Style } from "../styles";
import TimeInput from "./TimeInput";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface IHourMinutesSeconds {
  style?: Style;
  totalSeconds?: number;
  onLostFocus?: (totalSeconds: number) => void;
}

const HourMinutesSeconds: React.FC<IHourMinutesSeconds> = ({
  style,
  totalSeconds = 0,
  onLostFocus,
}) => {
  const [time, setTime] = useState<Time | undefined>(undefined);

  useEffect(() => {
    setTime(toHoursMinutesSeconds(totalSeconds));
  }, [totalSeconds]);

  const handleLostFocus = (time: Time) => {
    setTime(time);

    onLostFocus?.(toTotalSeconds(time.hours, time.minutes, time.seconds));
  };

  if (time === undefined) return undefined;

  return (
    <View style={style}>
      <TimeInput
        value={time.hours}
        caption="H"
        maxValue={23}
        onLostFocus={(value) => handleLostFocus({ ...time, hours: value })}
      />
      <TimeInput
        value={time.minutes}
        style={{ marginLeft: 10 }}
        caption="M"
        maxValue={59}
        onLostFocus={(value) => handleLostFocus({ ...time, minutes: value })}
      />
      <TimeInput
        value={time.seconds}
        style={{ marginLeft: 10 }}
        caption="S"
        maxValue={59}
        onLostFocus={(value) => handleLostFocus({ ...time, seconds: value })}
      />
    </View>
  );
};

export default HourMinutesSeconds;
