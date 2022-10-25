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
import {
  getProfilePicture,
  storeSpotifyStats,
} from "../../hooks/spotifyfunctions";

WebBrowser.maybeCompleteAuthSession();

const ConnectSpotifyScreen = () => {
  //Getting hook for sign out button
  const { signOut, user } = useAuth();
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
        "user-read-currently-playing",
      ],

      usePKCE: false,
      redirectUri: "exp://10.0.0.63:19000",
    },
    discovery
  );

  //Runs when page is opened, retrieves token from spotify and stores it

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("running storespotify");
      storeSpotifyStats(access_token, user.uid);
      getProfilePicture(access_token, user.uid);
      setSpotifyToken(access_token);
    }
  }, [response]);

  //Page to be rendered
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerButton}>
          <Text style={styles.text}>Spotify Authentication</Text>
        </View>
        <Image
          style={styles.logo}
          source={require("../../../assets/spotifyLogo.png")}
        />

        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Text style={styles.text}>Connect to Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => signOut()}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
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
    width: "100%",
  },
  headerButton: {
    alignItems: "center",
    backgroundColor: "#9D3BEA",
    color: "black",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 8,
    margin: 8,
    width: "100%",
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#D3A8F6",
    color: "white",
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 30,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ConnectSpotifyScreen;
