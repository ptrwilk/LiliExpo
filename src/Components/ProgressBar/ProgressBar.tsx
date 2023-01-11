import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../styles";
import AnimatedProgressBarLine, {
  IAnimatedProgressBarLineProps,
} from "./AnimatedProgressBarLine";

const ProgressBar: React.FC<IAnimatedProgressBarLineProps> = (props) => {
  const [progress, setProgress] = useState(0);

  const handleProgressChange = (progress: number) => {
    setProgress(progress);

    props.onProgressChange?.(progress);
  };

  return (
    <View style={props.style}>
      <AnimatedProgressBarLine
        {...{ ...props, style: undefined }}
        onProgressChange={handleProgressChange}
      />
      <View style={styles.textContainer}>
        {progress === 0 ? undefined : (
          <Text style={styles.text}>{progress}%</Text>
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
