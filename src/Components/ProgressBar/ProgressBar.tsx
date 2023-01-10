import React, { useState } from "react";
import { View, StyleSheet, ColorValue, Text } from "react-native";
import { Colors, Style } from "../../styles";
import AnimatedProgressBarLine, {
  ProgressBarRef,
} from "./AnimatedProgressBarLine";

interface IProgressBarProps {
  style?: Style;
  color?: ColorValue;
  progressColor?: ColorValue;
  progressBarRef?: React.MutableRefObject<ProgressBarRef>;
  onComplete?: () => void;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  style,
  color,
  progressColor,
  progressBarRef,
  onComplete,
}) => {
  const [progressValue, setProgressValue] = useState(0);

  const handleProgressChange = (percentage: number) =>
    setProgressValue(+(percentage * 100).toFixed());

  return (
    <View style={style}>
      <AnimatedProgressBarLine
        progressBarRef={progressBarRef}
        color={color}
        progressColor={progressColor}
        onProgressChange={handleProgressChange}
        onComplete={onComplete}
      />
      <View style={styles.textContainer}>
        {progressValue === 0 ? undefined : (
          <Text style={styles.text}>{progressValue}%</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    height: 25,
  },
  text: {
    color: Colors.WhiteColor,
    fontWeight: "200",
    fontSize: 17,
  },
});

export default ProgressBar;
