import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Card from "../Components/Cards/Cards";
import { TextCircleButton } from "../Components/CircleButton";
import ProgressBarLineTimed from "../Components/ProgressBar/ProgressBarLineTimed";
import TimeInput from "../Components/TimeInput";
import { toTotalSeconds } from "../Helpers/Helper";
import { Colors, Style } from "../styles";

interface IShutdownTimedCardProps {
  style?: Style;
}

const ShutdownTimedCard: React.FC<IShutdownTimedCardProps> = ({ style }) => {
  const [started, setStarted] = useState(false);

  const hoursRef = useRef<number>(0);
  const minutesRef = useRef<number>(0);
  const secondsRef = useRef<number>(12);

  const handlePress = () => {
    setStarted((prev) => !prev);
  };

  const handleComplete = () => {
    //complete
  };

  return (
    <Card
      style={style}
      text="Shutdown timed"
      color={Colors.SecondColor}
      leftInnerChild={
        <>
          {started ? (
            <ProgressBarLineTimed
              style={{ marginTop: 30 }}
              color={Colors.SecondDarkColor}
              progressColor={Colors.WhiteColor}
              totalSeconds={toTotalSeconds(
                hoursRef.current,
                minutesRef.current,
                secondsRef.current
              )}
              onComplete={handleComplete}
            />
          ) : (
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <TimeInput timeInputRef={hoursRef} caption="H" maxValue={23} />
              <TimeInput
                timeInputRef={minutesRef}
                style={{ marginLeft: 10 }}
                caption="M"
                maxValue={59}
              />
              <TimeInput
                timeInputRef={secondsRef}
                style={{ marginLeft: 10 }}
                caption="S"
                maxValue={59}
                minValue={1} //Todo for now. I think I need to go deeper into state and ref usage, I am no sure whether using hoursRef etc. is an appropriate way
              />
            </View>
          )}
        </>
      }
      rightChild={
        <TextCircleButton
          text={started ? "Stop" : "Start"}
          size={70}
          textSize={20}
          color={Colors.SecondDarkColor}
          pressedColor={Colors.SecondDarkerColor}
          textColor={Colors.WhiteColor}
          onPress={handlePress}
        />
      }
    />
  );
};

export default ShutdownTimedCard;
