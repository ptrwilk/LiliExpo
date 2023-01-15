import React, { useEffect, useState } from "react";
import { getShutdownState, shutdown, shutdownStop } from "../Api/Shutdown";
import Card from "../Components/Cards/Cards";
import { TextCircleButton } from "../Components/CircleButton";
import HourMinutesSeconds from "../Components/HourMinutesSeconds";
import ProgressBarLineTimed from "../Components/ProgressBar/ProgressBarLineTimed";
import { useLiliContext } from "../Context/LiliContext";
import { Colors, Style } from "../styles";

interface IShutdownTimedCardProps {
  style?: Style;
}

const ShutdownTimedCard: React.FC<IShutdownTimedCardProps> = ({ style }) => {
  const [started, setStarted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(3600);
  const { serverStatus, setServerStatus } = useLiliContext();

  const handlePress = () => {
    if (started) {
      shutdownStop();
    } else {
      shutdown(totalSeconds).catch(() => {
        setServerStatus("off");
        setStarted(false);
      });
    }

    setStarted((prev) => !prev);
  };

  useEffect(() => {
    getShutdownState()
      .then((response) => {
        if (response !== -1) {
          setTotalSeconds(response);

          setStarted(true);
        }
      })
      .catch((e) => {
        //empty catch so it does not display an error on mobile
      });
  }, []);

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
              totalSeconds={totalSeconds}
            />
          ) : (
            <HourMinutesSeconds
              style={{ flexDirection: "row", paddingTop: 10 }}
              totalSeconds={totalSeconds}
              onLostFocus={(seconds) => setTotalSeconds(seconds)}
            />
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
          disabled={serverStatus !== "on"}
          onPress={handlePress}
        />
      }
    />
  );
};

export default ShutdownTimedCard;
