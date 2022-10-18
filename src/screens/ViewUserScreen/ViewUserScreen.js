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

const ViewUserScreen = ({ route, navigator }) => {
  const { viewingId } = route.params;
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);

  if (viewingId) {
    useFocusEffect(
      React.useCallback(() => {
        get(child(ref(db), "users/" + viewingId)).then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val().username);
          } else {
            setUsername("not found");
          }
          setLoading(false);
        });
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
      <ProfileImage image={zyzz} name={username} />

      <ProfileStatSnippet genre="Hyperpop" />
      <CurrentMusicMoodComponent
        artist="Bladee"
        userName={username}
        song="Gluee"
      />
      <CustomButton
        title="View stats"
        onPress={() => navigation.navigate("Stats")}
      />
    </View>
  );
};

export default ViewUserScreen;
