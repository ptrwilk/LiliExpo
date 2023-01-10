import React from "react";
import { View, StyleSheet, Text, ColorValue } from "react-native";
import { Colors, Style } from "../../styles";

interface ICardProps {
  style?: Style;
  leftInnerChild?: any;
  rightChild?: any;
  color?: ColorValue;
  text?: string;
}

const Card: React.FC<ICardProps> = ({
  style,
  leftInnerChild,
  rightChild,
  color,
  text,
}) => {
  return (
    <View style={[style, styles.container, { backgroundColor: color }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{text}</Text>
        <View style={[styles.leftInnerChildContainer]}>{leftInnerChild}</View>
      </View>
      <View style={styles.rightChildContainer}>{rightChild}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 160,
  },
  leftContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "200",
    color: Colors.WhiteColor,
  },
  leftInnerChildContainer: {
    flex: 1,
  },
  rightChildContainer: {
    justifyContent: "center",
    padding: 20,
  },
});

export default Card;
