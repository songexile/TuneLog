import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CurrentMusicMoodComponent(props) {
  const { song, artist, user } = props;
  return (
    <View style={styles.bubbleContainer}>
      <Text style={styles.userText}>{user} is feeling...</Text>
      <Text style={styles.text}>
        {artist} - {song}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,

    width: 300,
    height: 100,
    alignItems: "center",
  },
  userText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
