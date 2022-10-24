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
import { retrieveProfilePicture } from "../../hooks/spotifyfunctions";

//
const ProfileScreen = ({ navigation, route }) => {
  const { viewingId } = route.params; //we pass in the userid of the user we are viewing

  const [userName, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const { user } = useAuth();
  const { spotifyToken, setSpotifyToken } = useAuth();
  const userId = viewingId;

  useFocusEffect(
    React.useCallback(() => {
      get(child(ref(db), "users/" + userId)).then((snapshot) => {
        if (snapshot.exists()) {
          const username = snapshot.val().username;
          if (viewingId == user.uid) {
            setUsername(username + " (You)");
          } else {
            setUsername(username);
          }
        } else {
          console.log("No data available");
        }
        getBio(userId).then((bio) => {
          if (bio != null) {
            setBio(bio);
          } else {
            setBio("User has not set a bio yet.");
          }
        });
      });
      get(child(ref(db), "users/" + viewingId + "/imageUrl")).then(
        (snapshot) => {
          if (snapshot.exists()) {
            setProfilePicture(snapshot.val());
          }
        }
      );
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

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent userName={userName} userId={userId} />
      <View style={styles.spacer}></View>
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
      <View style={styles.bubbleContainer}>
        <Text>{bio}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
