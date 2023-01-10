import { useRef } from "react";
import Card from "../Components/Cards/Cards";
import { TextCircleButton } from "../Components/CircleButton";
import { ProgressBarRef } from "../Components/ProgressBar/AnimatedProgressBarLine";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import { Colors } from "../styles";

const ShutdownNowCard = () => {
  const progressBarRef = useRef<ProgressBarRef>();

  const handlePressIn = () => {
    progressBarRef.current.setProgress(1, 1500);
  };

  const handlePressOut = () => {
    progressBarRef.current.reset();
  };

  const handleComplete = () => {};

  return (
    <Card
      text="Shutdown now"
      color={Colors.FirstColor}
      leftInnerChild={
        <ProgressBar
          style={{ marginTop: 30 }}
          progressBarRef={progressBarRef}
          color={Colors.FirstDarkColor}
          progressColor={Colors.WhiteColor}
          onComplete={handleComplete}
        />
      }
      rightChild={
        <TextCircleButton
          text="Hold"
          size={70}
          textSize={20}
          color={Colors.FirstDarkColor}
          pressedColor={Colors.FirstDarkerColor}
          textColor={Colors.WhiteColor}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      }
    />
  );
};

export default ShutdownNowCard;
