import { useEffect, useRef, useState } from "react";
import { ColorValue, View, Text, StyleSheet } from "react-native";
import { toHoursMinutesSeconds } from "../../Helpers/Helper";
import { Colors, Style } from "../../styles";
import AnimatedProgressBarLine from "./AnimatedProgressBarLine";

interface IProgressBarLineTimedProps {
  style?: Style;
  color?: ColorValue;
  progressColor?: ColorValue;
  totalSeconds?: number;
  onComplete?: () => void;
}

const ProgressBarLineTimed: React.FC<IProgressBarLineTimedProps> = ({
  style,
  color,
  progressColor,
  totalSeconds: defaultValue,
  onComplete,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(defaultValue);
  const [progress, setProgress] = useState<number>(0);

  const { hours, minutes, seconds } = toHoursMinutesSeconds(totalSeconds);

  const update = (maxProgressReached?: () => void) => {
    setProgress((prev) => {
      if (prev >= 100) {
        maxProgressReached?.();

        onComplete?.();

        return 100;
      }

      return prev + 100 / defaultValue;
    });

    setTotalSeconds((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    update();

    const interval = setInterval(() => {
      update(() => {
        clearInterval(interval);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={[style, styles.container]}>
      <AnimatedProgressBarLine
        color={color}
        progressColor={progressColor}
        duration={1000}
        progress={progress}
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
