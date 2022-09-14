import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProfileStatSnippet(props) {
  const { genre } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Niche Genre</Text>
      <Text style={styles.subText}>{genre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 75,
  },

  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 7,
  },
  subText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
  },
});
