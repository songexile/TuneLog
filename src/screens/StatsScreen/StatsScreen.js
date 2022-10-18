import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { storeTopArtist, storeTopTracks } from "../../hooks/useWriteDb";

const getTopTracks = async (spotifyToken) => {
  //Getting spotify token

  // console.log("Getting access Token for TopSongs:", spotifyToken );

  //API url to get top tracks, limit 5
  const api_url =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";

  //Using Axios to get the data from the API, using the token to authenticate
  try {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    // console.log(response.data);

    //Returning the top 5 tracks as an array
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

const getTopArtists = async (spotifyToken) => {
  //Getting spotify token

  //Console log for testing
  // console.log("Getting access Token for TopSongs:", spotifyToken );

  //API url to get top artists, limit 5
  const api_url =
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5";

  //Using Axios to get the data from the API, using the token to authenticate
  try {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    // console.log(response.data);

    //Returning the top 5 artists as an array
    return response.data.items;
  } catch (error) {
    //Catching error and logging to console
    console.log(error);
  }
};
//Const for displaying the stats screen
const StatsScreen = ({ navigation }) => {
  const [topSong, setTopSong] = useState([]);
  const [topArtist, setTopArtist] = useState([]);
  const { spotifyToken, setSpotifyToken, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopTracks(spotifyToken).then(setTopSong);
    storeTopTracks(user.uid, topSong);

    getTopArtists(spotifyToken).then(setTopArtist);
    storeTopArtist(user.uid, topArtist);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading stats!</Text>
      </View>
    );
  }
  //Page to be rendered
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerButton}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 26 }}>
              Your Stats
            </Text>
            {console.log(topSong)}
          </View>
          <View style={styles.centreItem}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>
              Top 5 Songs
            </Text>
          </View>
          {topSong &&
            topSong.map((song) => (
              <View style={styles.button}>
                <Text>
                  {song.name} by{" "}
                  {song.artists.map((artist) => (
                    <Text>{artist.name} </Text>
                  ))}
                </Text>
              </View>
            ))}
          <View style={styles.centreItem}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>
              Top 5 Artists
            </Text>
          </View>

          {topArtist &&
            topArtist.map((artist) => (
              <View style={styles.button}>
                <Text>{artist.name}</Text>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

//Styles for the stats screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
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

  centreItem: {
    alignItems: "center",
  },
});

export default StatsScreen;
