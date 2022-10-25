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
      clientId: "7614fe0f953b412e9eb6fa1531b051b6",
      clientSecret: "302ee142bcd9447b94f814604a8f6274",

      scopes: [
        "user-read-recently-played",
        "user-top-read",
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing",
      ],

      usePKCE: false,
      redirectUri: "exp://192.168.178.20:19000",
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
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#D3A8F6",
    color: "black",
    padding: 8,
    borderRadius: 10,
    margin: 5,
    height: "10%",
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
