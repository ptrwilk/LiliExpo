import { View, StyleSheet, Text, ColorValue } from "react-native";
import { Colors, Style } from "../styles";

interface ICaptionProps {
  style?: Style;
  caption?: string;
  color?: ColorValue;
  children?: any;
}

const Caption: React.FC<ICaptionProps> = ({
  style,
  caption,
  color = Colors.WhiteColor,
  children,
}) => {
  return (
    <View style={[style]}>
      <View style={styles.container}>
        {children}
        <Text style={[styles.text, { color: color }]}>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "200",
  },
});

export default Caption;
