import { View, Text, Image, Button } from "react-native";
import React from "react";
import styles from "./styles";
import zyzz from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";

let name = "Aziz Zyzz";

// Test commit
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProfileImage image={zyzz} name={name} />

      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent artist="Bladee" user="Aziz" song="Gluee" />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
    </View>
  );
};

export default ProfileScreen;
