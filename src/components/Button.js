import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
//import { clearInterval } from "timers";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
