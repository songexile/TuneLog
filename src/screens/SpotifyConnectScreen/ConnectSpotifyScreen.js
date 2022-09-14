import React from "react";
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { CLIENT_ID, CLIENT_SECRET } from "../../config/spotifyCredentials";

const auth = getAuth();
const user = auth.currentUser;

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",

}

const spotifyAuth = () => {
    
};

const spotifyCredentials = {
    CLIENT_ID: "ecf0bbd85d8c4456a8551dc30224ee83",
  
    CLIENT_SECRET: "04d9b1dd0c5d4a9b92898b0c8dde5bb5"
  }

const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
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
      usePKCE: false,
      redirectUri: "exp://10.0.0.41:19000/",
    },
    discovery
);

useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

export default function ConnectSpotify(props) {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>ConnectSpotify </Text>
      <Button onPress={signOut} title="signout">
        Sign out
      </Button>
    </View>
  );
}
