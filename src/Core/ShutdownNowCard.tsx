import { useState } from "react";
import Card from "../Components/Cards/Cards";
import { TextCircleButton } from "../Components/CircleButton";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import { Colors } from "../styles";

const ShutdownNowCard = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePressIn = () => {
    setDuration(1500);
    setProgress(100);
  };

  const handlePressOut = () => {
    setDuration(200);
    setProgress(0);
  };

  const handleProgressChange = (progress: number) => {
    if (progress === 100) {
      //complete
    }
  };

  return (
    <Card
      text="Shutdown now"
      color={Colors.FirstColor}
      leftInnerChild={
        <ProgressBar
          style={{ marginTop: 30 }}
          color={Colors.FirstDarkColor}
          progressColor={Colors.WhiteColor}
          progress={progress}
          duration={duration}
          onProgressChange={handleProgressChange}
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
