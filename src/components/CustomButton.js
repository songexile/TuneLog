import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function CustomButton(props) {
  const { title, onPress } = props;
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9D3BEA",
    borderRadius: 15,
    height: 38,
    width: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
