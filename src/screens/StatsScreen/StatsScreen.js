import { View, Text, Button } from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { getSpotifyToken } from "../../hooks/spotifyAuth";

const getTopTracks = async () => {
  //Getting spotify token
  const spotifyToken = getSpotifyToken();
  console.log("Getting access Token for TopSongs:", spotifyToken );

  // const [songName, setSongName] = useState("");

  const api_url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
  // const api_url = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1&offset=5";
  
  // console.log(api_url);
  try{
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${spotifyToken}`
      }
    });
    // console.log(response.data.items[0].name);
    console.log(response.data);
    // setSongName(response.data.items[0].name);
    // const myJSON = response.data.items[0].name.toString();

    return response.data.items;
  }catch(error){
    console.log(error);
  }  
};

const StatsScreen = ({ navigation }) => {
  const [topSong, setTopSong] = useState([]);
  useEffect(() => {
      getTopTracks()
      .then(setTopSong)
      .catch((error) => {
          // ...handle/report error...
      })
  }, []); // <== Empty deps array = only on mount

  return (
      <View>
          <Text>StatsScreen</Text>
          {console.log(topSong)}
          {/* {topSong && <Text>{topSong.name}</Text>} */}

          {topSong && topSong.map((song) => (
            <Text>{song.name} by {song.artists.map((artist) => (
              <Text>{artist.name} </Text>
            ))}
            </Text>
          ))}
      </View>
  );
};

export default StatsScreen;
