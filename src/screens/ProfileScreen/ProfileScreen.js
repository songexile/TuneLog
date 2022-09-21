import { View, Text, Image, Button } from "react-native";
import React from "react";
import styles from "./styles";
import zyzz from "../../../assets/zyzz.jpg";
import CustomButton from "../../components/CustomButton";
import ProfileImage from "../../components/ProfileImage";
import ProfileStatSnippet from "../../components/StatsComponents/ProfileStatSnippet";
import CurrentMusicMoodComponent from "../../components/CurrentMusicMoodComponent";
import useAuth from "../../hooks/useAuth";
import { retriveAllUsers } from "../../hooks/writeDb";




// Test commit
const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <ProfileImage image={zyzz} name={user.uid} />
      <Button title="testButton" onPress={() => retriveAllUsers(user.uid)} ></Button>

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
