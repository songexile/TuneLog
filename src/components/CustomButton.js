import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

//tHe custom button is a component that is used to render a button with a custom style
//You can add a custom title to it and a onPress instruction.
export default function CustomButton(props) {
  const { title, onPress } = props;
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9D3BEA",
    borderRadius: 15,
    height: "10%",
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
