import { View, Text, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import ProfilePicture from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";
import useAuth from "../../hooks/useAuth";
import { useDisplayName } from "../../hooks/readDb";
import { get, ref, child, update } from "firebase/database";
import { db } from "../../model/config";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import zyzz from "../../../assets/zyzz.jpg";
import { getBio, storeImage } from "../../hooks/useWriteDb";

const getProfilePicture = async (spotifyToken) => {
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

    return response.data.images[0].url;
  } catch (error) {
    console.log("is this the error?" + error);
  }
};

//
const ProfileScreen = ({ navigation, viewingId }) => {
  const [userName, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const { user } = useAuth();
  const { spotifyToken, setSpotifyToken } = useAuth();
  const userId = user.uid;

  useFocusEffect(
    React.useCallback(() => {
      get(child(ref(db), "users/" + userId)).then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        } else {
          console.log("No data available");
        }
        getBio(userId).then((bio) => {
          setBio(bio);
        });
      });
      getProfilePicture(spotifyToken).then((image) => {
        setProfilePicture(image);
      });
      storeImage(userId, profilePicture);
      setLoading(false);
    })
  );

  if (loading && profilePicture == null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {<ProfileImage image={profilePicture} name={userName} />}
      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent userName={userName} userId={userId} />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
      <View>
        <Text>{bio}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
