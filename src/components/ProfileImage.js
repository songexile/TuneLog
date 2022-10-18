import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

//This is a component that renders a profile image and name,
// it is meant to be used in the profile screen and in places where a profile image is needed aswell as the name is needed

export default function ProfileImage(props) {
  const { image, name } = props;
  const defaultImage =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  console.log("img " + image);

  return (
    <View style={styles.styleContainer}>
      <Image
        style={styles.circleImage}
        source={{ uri: image.toString() || defaultImage }}
      />

      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  styleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
  },
});
