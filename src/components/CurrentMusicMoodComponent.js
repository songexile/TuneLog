import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFeelingMood, useDisplayName } from "../hooks/readDb";
import { WebView } from "react-native-webview";
import { getCurrentlyFeeling } from "../hooks/spotifyfunctions";

export default function CurrentMusicMoodComponent(props) {
  const { userName, userId } = props;
  const [spotifyLink, setSpotifyLink] = useState("");

  console.log(userId);

  useEffect(() => {
    getCurrentlyFeeling(userId).then((feeling) => {
      console.log("link! " + feeling);
      setSpotifyLink(feeling);
    });
  }, []);

  return (
    <View style={styles.bubbleContainer}>
      <Text style={styles.userText}>{props.userName} is feeling...</Text>
      <View
        style={{
          height: 100,
          scalesPageToFit: true,
          position: "static",
          inset: 0,
        }}
      >
        <WebView
          source={{
            uri:
              "https://open.spotify.com/embed/track/" +
              spotifyLink +
              "?utm_source=generator",
          }}
          style={{
            height: 80,
            width: 300,
            frameBorder: 0,
            scrollEnabled: false,
            flex: 0,
            scalesPageToFit: true,
            position: "static",
            inset: 0,
          }}
        ></WebView>
      </View>
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
