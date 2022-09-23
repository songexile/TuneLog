import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { getSpotifyToken } from "../../hooks/spotifyAuth";

const getTopTracks = async () => {
  //Getting spotify token
  const spotifyToken = getSpotifyToken();
  console.log("Getting access Token for TopSongs:", spotifyToken );

  const api_url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
  
  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${spotifyToken}`
      }
    });

    // console.log(response.data);

    return response.data.items;
  }catch(error){
    console.log(error);
  }  
};

const getTopArtists = async () => {
  //Getting spotify token
  const spotifyToken = getSpotifyToken();
  console.log("Getting access Token for TopSongs:", spotifyToken );
  const api_url = "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5";
  
  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${spotifyToken}`
      }
    });

    console.log(response.data);
    return response.data.items;
  }catch(error){
    console.log(error);
  }  
};

const StatsScreen = ({ navigation }) => {
  const [topSong, setTopSong] = useState([]);
  const [topArtist, setTopArtist] = useState([]);
  useEffect(() => {
      getTopTracks()
      .then(setTopSong)
      .catch((error) => {
          console.log("Error getting top songs", error);
      })

      getTopArtists()
      .then(setTopArtist)
      .catch((error) => {
          console.log("Error in getting top artists", error);
      })

  }, []);

  return (
      <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.headerButton}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 26 }}>Your Stats</Text>
          {console.log(topSong)}
        </View>
        <View style={styles.centreItem}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Top 5 Songs</Text>
        </View>
          {topSong && topSong.map((song) => (
            <View style={styles.button}>
              <Text>{song.name} by {song.artists.map((artist) => (
                <Text>{artist.name} </Text>
              ))}
              </Text>
            </View>
          ))}
          <View style={styles.centreItem}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Top 5 Artists</Text>
          </View>
            
            {topArtist && topArtist.map((artist) => (
              <View style={styles.button}>
                <Text>{artist.name}</Text>
              </View>
            ))}
          
          </ScrollView>
      </SafeAreaView>
      </>
  );
};

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
