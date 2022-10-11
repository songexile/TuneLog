import { View, Text, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import zyzz from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";
import useAuth from "../../hooks/useAuth";
import { useDisplayName } from "../../hooks/readDb";
import { get, ref, child, update } from "firebase/database";
import { db } from "../../model/config";
import { useFocusEffect } from "@react-navigation/native";

//
const ProfileScreen = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const { user } = useAuth();
  const userId = user.uid;

  useFocusEffect(
    React.useCallback(() => {
      get(child(ref(db), "users/" + userId)).then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        } else {
          console.log("No data available");
        }
      });
    })
  );

  return (
    <View style={styles.container}>
      <ProfileImage image={zyzz} name={userName} />

      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent
        artist="Bladee"
        userName={userName}
        song="Gluee"
      />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
    </View>
  );
};

export default ProfileScreen;
