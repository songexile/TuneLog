import React, { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import useAuth from "../../hooks/useAuth";
import { setSpotifyToken, getSpotifyToken } from "../../hooks/spotifyAuth";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const ConnectSpotifyScreen = () => {
  //Getting hook for sign out button
  const { signOut } = useAuth();
  const { spotifyToken, setSpotifyToken } = useAuth();

  //Spotify API information
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "ecf0bbd85d8c4456a8551dc30224ee83",
      clientSecret: "04d9b1dd0c5d4a9b92898b0c8dde5bb5",

      scopes: [
        "user-read-recently-played",
        "user-top-read",
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing"
      ],

      usePKCE: false,
      redirectUri: "exp://172.20.10.13:19001",
    },
    discovery
  );

  //Runs when page is opened, retrieves token from spotify and stores it

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      // console.log("accessToken", access_token);
      setSpotifyToken(access_token);
    }
  }, [response]);

  //Page to be rendered
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerButton}>
          <Text style={{ fontSize: 24 }}>Spotify Authentication</Text>
        </View>
        <Image
          style={styles.logo}
          source={require("../../../assets/spotifyLogo.png")}
        />
        <TouchableOpacity style={styles.button}>
          <Button
            light
            disabled={!request}
            title="Connect to Spotify"
            onPress={() => {
              promptAsync();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={signOut} title="Sign out"></Button>
        </TouchableOpacity>
        <View style={styles.button}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Note: After authenticating, please sign out and sign back in!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

//Styling sheet for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    alignItems: "center",
    backgroundColor: "#9D3BEA",
    color: "black",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 8,
    margin: 8,
  },
  button: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#D3A8F6",
    color: "black",
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 30,
  },
});

export default ConnectSpotifyScreen;
