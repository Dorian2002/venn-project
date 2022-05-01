import { StyleSheet, Text, View } from "react-native";
import α from "color-alpha";

const SIZE = 48;
function Tag({ color = "#000", label, size = SIZE }) {
  const styles = createStyles({ color, size });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Tag;

const createStyles = ({ color, size }) =>
  StyleSheet.create({
    root: {
      height: size,
      flex: 2,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 3,
      borderStyle: "solid",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: Math.round(size / 3),
      fontWeight: "700",
      color,
    },
  });
