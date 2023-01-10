import { useRef, useState } from "react";
import { ColorValue, View, Text, StyleSheet } from "react-native";
import { toHoursMinutesSeconds } from "../../Helpers/Helper";
import { Colors, Style } from "../../styles";
import AnimatedProgressBarLine, {
  ProgressBarRef,
} from "./AnimatedProgressBarLine";

export type ProgressBarLineTimedRef = {
  start: () => void;
  stop: () => void;
};

interface IProgressBarLineTimedProps {
  progressBarRef?: React.MutableRefObject<ProgressBarLineTimedRef>;
  style?: Style;
  color?: ColorValue;
  progressColor?: ColorValue;
  totalSeconds?: number;
  onComplete?: () => void;
}

const ProgressBarLineTimed: React.FC<IProgressBarLineTimedProps> = ({
  progressBarRef,
  style,
  color,
  progressColor,
  totalSeconds: defaultValue,
  onComplete,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(defaultValue);
  const currentProgressRef = useRef<number>(0);

  const intervalRef = useRef<any>();
  const ref = useRef<ProgressBarRef>();

  const animateProgress = () => {
    if (currentProgressRef.current >= 1) {
      onComplete?.();

      return;
    }
    const percentageTick = 1 / defaultValue;
    currentProgressRef.current = currentProgressRef.current + percentageTick;

    ref.current.setProgress(currentProgressRef.current, 1000);
  };

  const tickByOneSecond = () => {
    animateProgress();

    setTotalSeconds((prev) => {
      if (prev - 1 <= 0) {
        clearInterval(intervalRef.current);

        return 0;
      }

      return --prev;
    });
  };

  if (progressBarRef !== undefined) {
    progressBarRef.current = {
      start() {
        tickByOneSecond();
        intervalRef.current = setInterval(() => {
          tickByOneSecond();
        }, 1000);
      },
      stop() {
        ref.current.reset();
        setTotalSeconds(defaultValue);
        currentProgressRef.current = 0;

        clearInterval(intervalRef.current);
      },
    };
  }

  const { hours, minutes, seconds } = toHoursMinutesSeconds(totalSeconds);

  return (
    <View style={[style, styles.container]}>
      <AnimatedProgressBarLine
        color={color}
        progressColor={progressColor}
        progressBarRef={ref}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{pad(hours, 2)}</Text>
        <Text style={styles.text}>:</Text>
        <Text style={styles.text}>{pad(minutes, 2)}</Text>
        <Text style={styles.text}>:</Text>
        <Text style={styles.text}>{pad(seconds, 2)}</Text>
      </View>
    </View>
  );
};

const pad = (value: number, size: number) => {
  let padded = value.toString();

  while (padded.length < size) padded = "0" + value;

  return padded;
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 25,
  },
  someContainer: {},
  text: {
    marginLeft: 1,
    marginRight: 1,
    color: Colors.WhiteColor,
    fontWeight: "200",
    fontSize: 17,
  },
});

export default ProgressBarLineTimed;
