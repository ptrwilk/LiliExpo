import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ColorValue } from "react-native";

export type ProgressBarRef = {
  setProgress: (percentage: number, durationInMilliseconds: number) => void;
  reset: () => void;
};

interface IAnimatedProgressBarLineProps {
  progressBarRef?: React.MutableRefObject<ProgressBarRef>;
  color?: ColorValue;
  progressColor?: ColorValue;
  onProgressChange?: (percentage: number) => void;
  onComplete?: () => void;
}

const AnimatedProgressBarLine: React.FC<IAnimatedProgressBarLineProps> = ({
  progressBarRef,
  color,
  progressColor,
  onProgressChange,
  onComplete,
}) => {
  const translateXAnimated = useRef(new Animated.Value(-1000)).current;
  const progressBarWidth = useRef<number>();
  const targetPercentage = useRef<number>();

  const animate = (value: number, duration?: number) => {
    Animated.timing(translateXAnimated, {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const transitionToPercentage = (transition: number) => {
    const current = progressBarWidth.current - Math.abs(transition);
    const percentage = current / progressBarWidth.current;

    return +percentage.toFixed(2);
  };

  const percentageToTransition = (percentage: number) => {
    return -progressBarWidth.current + progressBarWidth.current * percentage;
  };

  if (progressBarRef !== undefined) {
    progressBarRef.current = useRef<ProgressBarRef>({
      setProgress: (percentage: number, durationInMilliseconds: number) => {
        targetPercentage.current = percentage;
        animate(percentageToTransition(percentage), durationInMilliseconds);
      },
      reset: () => {
        translateXAnimated.stopAnimation();
        translateXAnimated.setValue(-progressBarWidth.current);
      },
    }).current;
  }

  useEffect(() => {
    let prevPercentage = 0;

    translateXAnimated.addListener(({ value: transition }) => {
      const percentage = transitionToPercentage(transition);

      if (prevPercentage !== percentage) {
        prevPercentage = percentage;

        onProgressChange?.(percentage);

        if (percentage === targetPercentage.current) {
          onComplete?.();
        }
      }
    });

    return () => {
      translateXAnimated.removeAllListeners();
    };
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: color }]}
      onLayout={({ nativeEvent }) => {
        progressBarWidth.current = nativeEvent.layout.width;
        translateXAnimated.setValue(-progressBarWidth.current);
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
