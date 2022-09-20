import React, { useEffect } from "react";
import {  ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth();
const user = auth.currentUser;

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",

}

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'ecf0bbd85d8c4456a8551dc30224ee83',
      clientSecret: '04d9b1dd0c5d4a9b92898b0c8dde5bb5',
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri:'exp://10.0.0.41:19000'
      
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log("accessToken", access_token);
      }
  }, [response]);

  return (
    <Button
      style={{
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:40,
        paddingRight:40,
        marginTop:10,
        height:40
      }}
      light
      disabled={!request}
      title="Login to Spotify"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}
