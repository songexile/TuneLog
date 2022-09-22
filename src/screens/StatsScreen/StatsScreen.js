import { View, Text, Button } from "react-native";
import React, {useState} from "react";
import axios from "axios";
import { getSpotifyToken } from "../../hooks/spotifyAuth";

const getTopTracks = async () => {
  //Getting spotify token
  const spotifyToken = getSpotifyToken();
  // console.log("Getting access Token for TopSongs:", spotifyToken );

  // const [songName, setSongName] = useState("");

  const api_url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term";
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
    return response.data.items[0].name;
  }catch(error){
    console.log(error);
  }  
};

const StatsScreen = ({ navigation }) => {
  // const topTracks = getTopTracks();
  // console.log(topTracks);
  const topSong = getTopTracks();
  // console.log(topSong);

  return (
    <View>
      <Button onPress={() => getTopTracks()}
      title = "Get Top">
        <Text>{topSong}</Text>

      </Button>
      <Text>StatsScreen</Text>
    </View>
  );
};

export default StatsScreen;
