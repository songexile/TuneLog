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
import { getSpotifyStats } from "../../hooks/spotifyfunctions";

//Const for displaying the stats screen
const StatsScreen = ({ navigation, route }) => {
  const { viewingId } = route.params; //we pass in the userid of the user we are viewing
  //console.log("!!viewingId: " + viewingId);

  const [topSong, setTopSong] = useState([]);
  const [topArtist, setTopArtist] = useState([]);
  const { spotifyToken, setSpotifyToken, user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [timePeriod, setTimePeriod] = useState(shortTerm);
  const [timePeriodText, setTimePeriodText] = useState("Short Term"); //this gives a better user experience as the user can see what time period they are viewing

  const mediumTerm = "medium_term"; //default time period is short term
  const shortTerm = "short_term";
  const longTerm = "long_term";

  console.log(timePeriod);

  const changeTimePeriod = (timePeriod) => {
    console.log("Current timePeriod:", timePeriod);
    //function to switch time period
    if (timePeriod == shortTerm) {
      setTimePeriod(mediumTerm);
      setTimePeriodText("Medium Term");
    } else if (timePeriod == mediumTerm) {
      setTimePeriod(longTerm);
      setTimePeriodText("Long Term");
    } else if (timePeriod == longTerm) {
      setTimePeriod(shortTerm);
      setTimePeriodText("Short Term");
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
    getSpotifyStats(viewingId, timePeriod, "top_tracks").then((data) => {
      //api call to firebase
      setTopSong(data);

      getSpotifyStats(viewingId, timePeriod, "top_artists").then((data) => {
        setTopArtist(data);
        setLoading(false);
      });
    });
  }, [timePeriod]);

  //Page to be rendered
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerButton}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 26 }}>
              {viewingId == user.id ? "Your" : "Their"} Stats
            </Text>
            <TouchableOpacity onPress={() => changeTimePeriod(timePeriod)}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 26 }}
              >
                Current Time Period {timePeriodText}
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
