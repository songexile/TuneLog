import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import styles from "./styles"; //styles
import useAuth from "../../hooks/useAuth";
import {
  unfollowUser,
  writeUserName,
  returnFollowing,
  returnFollowingUsername,
} from "../../hooks/useWriteDb";

//view for editing profile
const RemoveFriendScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");

  const { user } = useAuth();
  return (
    <View styles={styles.container}>
      <Text style={styles.title}> Follow user here </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setUserName(text)}
        value={username}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {
        //map through the following list and display it
        console.log(returnFollowingUsername(user.uid))
      }
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9D3BEA" }]} //TODO: change to global styles
        onPress={() => unfollowUser(username, user.uid)}
      >
        <Text style={styles.buttonTitle}>Follow user</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RemoveFriendScreen;
