// store spotify functions here
import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set, remove } from "firebase/database";
import axios from "axios";

export const storeSpotifyStats = async (spotifyToken, userId) => {
  //In this function we will use the spotifyToken to retrieve the info
  //and then store it in the database related to there username
  update(ref(db, "users/" + userId + "/stats"), {
    short_term: {
      top_tracks: await getTopTracks(spotifyToken, "short_term"),
      top_artists: await getTopArtists(spotifyToken, "short_term"),
    },
    medium_term: {
      top_tracks: await getTopTracks(spotifyToken, "medium_term"),
      top_artists: await getTopArtists(spotifyToken, "medium_term"),
    },
    long_term: {
      top_tracks: await getTopTracks(spotifyToken, "long_term"),
      top_artists: await getTopArtists(spotifyToken, "long_term"),
    },
  });
};

export const getSpotifyStats = async (userId, timePeriod, type) => {
  //this function will return the spotify stats for the user

  //type is top_artists or top_tracks
  const stats = await get(
    child(ref(db), "users/" + userId + "/stats/" + timePeriod + "/" + type)
  ).then((snapshot) => {
    if (snapshot.exists()) {
      const stats = snapshot.val();
      console.log("found stats");
      return stats;
    } else {
      console.log("No data available");
    }
  });
  return stats;
};

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
    "https://api.spotify.com/v1/me/top/artists?time_range=" +
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
