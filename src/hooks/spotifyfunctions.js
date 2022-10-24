// store spotify functions here
import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set, remove } from "firebase/database";
import axios from "axios";
import { storeImage } from "./useWriteDb";

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

export const getCurrentlyFeeling = async (userId) => {
  //this function will the top current short term track for the user
  //it is used to display the current feeling on the profile
  const stats = await get(
    child(ref(db), "users/" + userId + "/stats/short_term/top_tracks/0/id")
  ).then((snapshot) => {
    if (snapshot.exists()) {
      const stats = snapshot.val();
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

export const getProfilePicture = async (spotifyToken, userId) => {
  //Getting spotify token

  //API url to get image
  const api_url = "https://api.spotify.com/v1/me";

  //Using Axios to get the data from the API, using the token to authenticate
  try {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    // console.log(response.data.images[0].url);

    //Returning
    // console.log(response.data.images);
    storeImage(userId, response.data.images[0].url);
    return response.data.images[0].url;
  } catch (error) {
    console.log("is this the error?" + error);
  }
};

export const retrieveProfilePicture = async (userId) => {
  const profilePicture = await get(
    child(ref(db), "users/" + userId + "/profilePicture")
  ).then((snapshot) => {
    if (snapshot.exists()) {
      const profilePicture = snapshot.val();
      return profilePicture;
    } else {
      console.log("No data available");
    }
  });
  return profilePicture;
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
