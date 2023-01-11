import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, ColorValue } from "react-native";
import { Style } from "../../styles";

export interface IAnimatedProgressBarLineProps {
  style?: Style;
  color?: ColorValue;
  progressColor?: ColorValue;
  progress?: number;
  duration?: number;
  onProgressChange?: (progress: number) => void;
  onComplete?: () => void;
}

const AnimatedProgressBarLine: React.FC<IAnimatedProgressBarLineProps> = ({
  style,
  color,
  progressColor,
  progress = 0,
  duration,
  onProgressChange,
  onComplete,
}) => {
  const translateXAnimated = useRef(new Animated.Value(-1000)).current;

  const [progressBarWidth, setProgressBarWidth] = useState<number | undefined>(
    undefined
  );
  const progressBarWidthRef = useRef<number>();

  const animate = (value: number, duration?: number) => {
    Animated.timing(translateXAnimated, {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
    }).start(onComplete);
  };

  const progressToTransition = () => {
    return (
      -progressBarWidth +
      (progressBarWidth * (progress > 100 ? 100 : progress)) / 100
    );
  };

  const transitionToProgress = (transition: number) => {
    const current = progressBarWidthRef.current - Math.abs(transition);
    const progress = (current / progressBarWidthRef.current) * 100;

    return +progress.toFixed();
  };

  useEffect(() => {
    if (progressBarWidth !== undefined) {
      animate(progressToTransition(), duration);
    }
  }, [progress, progressBarWidth]);

  useEffect(() => {
    let prevProgress = 0;

    translateXAnimated.addListener(({ value: transition }) => {
      if (progressBarWidthRef.current !== undefined) {
        const progress = transitionToProgress(transition);

        if (prevProgress !== progress) {
          onProgressChange?.(progress);

          prevProgress = progress;
        }
      }
    });

    return () => {
      translateXAnimated.removeAllListeners();
    };
  }, []);

  return (
    <View
      style={[style, styles.container, { backgroundColor: color }]}
      onLayout={({ nativeEvent }) => {
        setProgressBarWidth(nativeEvent.layout.width);
        translateXAnimated.setValue(-nativeEvent.layout.width);
        progressBarWidthRef.current = nativeEvent.layout.width;
      }}
    >
      <Animated.View
        style={[
          styles.innerProgressBar,
          { backgroundColor: progressColor },
          { transform: [{ translateX: translateXAnimated }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    overflow: "hidden",
  },
  innerProgressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
});

export default AnimatedProgressBarLine;
