import { React, useEffect, useState, useCallback } from "react";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { storeCurrentSong } from "../../hooks/useWriteDb";
import { useDisplayName } from "../../hooks/readDb";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CurrentSongImage from "../../components/CurrentSongImage";

const getCurrentlyListening = async (spotifyToken) => {
  //API url to get users currently litening to
  const api_url = "https://api.spotify.com/v1/me/player/currently-playing";

  //Using Axios to get the data from the API, using the token to authenticate
  try {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    //Storing the data in a variables
    const song = response.data;
    const albumImageUri = song.item.album.images[0].url;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const trackName = song.item.name;

    console.log("Current Track:", trackName);
    console.log("Artist:", artist);
    
    //Returning the top 5 artists as an array
    return {albumImageUri, artist, isPlaying, songUrl, trackName};
    // return {trackName};
  } catch (error) {
    //Catching error and logging to console
    console.log(error);
  }
};

const HomeScreen = () => {
  const { signOut, user } = useAuth();
  const name = useDisplayName();
  const { spotifyToken } = useAuth();
  const [currentlyListening, setCurrentlyListening] = useState([]);


  useFocusEffect(
    useCallback(() => {
      getCurrentlyListening(spotifyToken) //run function
      .then(setCurrentlyListening)
      // .then(console.log('Changing song to:', currentlyListening.trackName))
      // .then(storeCurrentSong(user.uid, currentlyListening.trackName, currentlyListening.artist))
      // .catch((error) => {
      //   setSpotifyToken(null); //setting token to null if there is an error
      //   //Catching error and logging to console if there is one with retrieving the top artists
      //   console.log("Error in getting currently listening to", error);
      console.log('Changing song to:', currentlyListening.trackName)
      storeCurrentSong(user.uid, currentlyListening.trackName, currentlyListening.artist)
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.headerButton}>
            <Text style={styles.textHeader}>{name}'s Home Page</Text>
          </View>
          <Text>Currently Listening to:</Text>
          <View>
            
          </View>
          <View style={styles.button}>
            {console.log(currentlyListening)}
            <Text style={styles.bodyTextHeader}>{currentlyListening.trackName}</Text>
            <Text style={styles.bodyText}>{currentlyListening.artist}</Text>
            <View>
              <Image
              style={{width: '100%', height: '100%', height: 100, width: 100, margin: 10}}
              source={{uri: currentlyListening.albumImageUri}}
              />
            </View>


          </View>
          <Button onPress={signOut} title="Sign Out">
            Sign out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: "100%",
    // height: "30%",
    alignItems: "center",
    backgroundColor: "#D3A8F6",
    color: "white",
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  headerButton: {
    alignItems: "center",
    backgroundColor: "#9D3BEA",
    color: "white",
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },

  bodyTextHeader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },

  bodyText: {
    textAlign: "left",
    fontSize: 15,
  },

  centreItem: {
    alignItems: "center",
  },

  albumImage: {
    width: 25,
    height: 25,
    alignItems: "center",
  },
});

export default HomeScreen;