import { View, Text, Button } from "react-native";
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

    console.log(response.data);

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
      <View>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 26 }}>StatsScreen</Text>
          {console.log(topSong)}

          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Top Songs</Text>
          {topSong && topSong.map((song) => (
            <Text>{song.name} by {song.artists.map((artist) => (
              <Text>{artist.name} </Text>
            ))}
            </Text>
          ))}
          
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Top Artists</Text>
          {topArtist && topArtist.map((artist) => (
            <Text>{artist.name}</Text>
          ))}
      </View>
  );
};

export default StatsScreen;
