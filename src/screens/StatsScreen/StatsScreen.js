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
import { TouchableOpacity } from "react-native-gesture-handler";

const getTopTracks = async (spotifyToken, timePeriod) => {
  //Getting spotify token

  // console.log("Getting access Token for TopSongs:", spotifyToken );

  //API url to get top tracks, limit 5
  const api_url =
    "https://api.spotify.com/v1/me/top/tracks?time_range=" +
    timePeriod +
    "&limit=5";

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

const getTopArtists = async (spotifyToken, timePeriod) => {
  //Getting spotify token

  //Console log for testing
  // console.log("Getting access Token for TopSongs:", spotifyToken );

  //API url to get top artists, limit 5
  const api_url =
    "https://api.spotify.com/v1/me/top/tracks?time_range=" +
    timePeriod +
    "&limit=5";

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

  const [timePeriod, setTimePeriod] = useState(shortTerm);

  const mediumTerm = "medium_term"; //default time period is short term
  const shortTerm = "short_term";
  const longTerm = "long_term";

  console.log(timePeriod);

  const changeTimePeriod = (timePeriod) => {
    console.log("Current timePeriod:", timePeriod);
    //function to switch time period
    if (timePeriod == shortTerm) {
      setTimePeriod(mediumTerm);
    } else if (timePeriod == mediumTerm) {
      setTimePeriod(longTerm);
    } else if (timePeriod == longTerm) {
      setTimePeriod(shortTerm);
    }

    console.warn("pressed");
  };

  //this effect just sets timeperiod to short term
  useEffect(() => {
    setTimePeriod(shortTerm);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log("time period is", timePeriod);
    getTopTracks(spotifyToken, timePeriod).then(setTopSong);
    storeTopTracks(user.uid, topSong);

    getTopArtists(spotifyToken, timePeriod).then(setTopArtist);
    storeTopArtist(user.uid, topArtist);
    setLoading(false);
  }, [timePeriod]);

  //Page to be rendered
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerButton}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 26 }}>
              Your Stats
            </Text>
            <TouchableOpacity onPress={() => changeTimePeriod(timePeriod)}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 26 }}
              >
                Current Time Period {timePeriod}
              </Text>
            </TouchableOpacity>
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
