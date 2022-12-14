import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFeelingMood, useDisplayName } from "../hooks/readDb";
import { WebView } from "react-native-webview";
import { getCurrentlyFeeling } from "../hooks/spotifyfunctions";

export default function CurrentMusicMoodComponent(props) {
  const { userName, userId } = props;
  const [spotifyLink, setSpotifyLink] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(userId);

  useEffect(() => {
    getCurrentlyFeeling(userId).then((feeling) => {
      console.log("link! " + feeling);
      setSpotifyLink(feeling);
      setLoading(false);
    });
  }, []);

  if (loading) return <Text>Loading {userName}'s top current song</Text>;
  return (
    <View style={styles.bubbleContainer}>
      <View
        style={{
          height: 80,
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
    alignItems: "center",
    height: 100,
    borderRadius: 20,
    width: "100%",
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
