import { View, Text, Image, Button } from "react-native";
import React from "react";
import styles from "./styles";
import zyzz from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";
import useAuth from "../../hooks/useAuth";
import { useDisplayName } from "../../hooks/readDb";

// Test commit
const ProfileScreen = ({ navigation }) => {
  const username = useDisplayName();
  return (
    <View style={styles.container}>
      <ProfileImage image={zyzz} name={username} />

      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent artist="Bladee" user={username} song="Gluee" />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
    </View>
  );
};

export default ProfileScreen;
