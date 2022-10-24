import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { get, ref, child, update } from "firebase/database";
import { db } from "../../model/config";
import styles from "./styles";
import zyzz from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";
import {
  getBio,
  hi,
  retrieveImage,
  retrieveImageUrl,
} from "../../hooks/useWriteDb";

const ViewUserScreen = ({ route, navigation }) => {
  const { viewingId } = route.params;
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  );
  const [bio, setBio] = useState("");

  if (viewingId) {
    useFocusEffect(
      React.useCallback(() => {
        get(child(ref(db), "users/" + viewingId)).then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val().username);
          } else {
            setUsername("not found");
          }
        });
        getBio(viewingId).then((bio) => {
          setBio(bio);
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
  }

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ProfileImage image={profilePicture} name={username} />

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent userName={username} userId={viewingId} />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("ViewUserStats")}
      />

      <View>
        <Text>{bio}</Text>
      </View>
    </View>
  );
};

export default ViewUserScreen;
