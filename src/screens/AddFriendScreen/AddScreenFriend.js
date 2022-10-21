import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import styles from "./styles"; //styles
import useAuth from "../../hooks/useAuth";
import { followUser, writeUserName } from "../../hooks/useWriteDb";

//view for editing profile
const AddFriendScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [msg, setMsg] = useState("Please enter a user name");

  const { user } = useAuth();
  return (
    <View styles={styles.container}>
      <Text style={styles.buttonTitle}>{msg}</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setUserName(text)}
        value={username}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9D3BEA" }]} //TODO: change to global styles
        onPress={() =>
          followUser(username, user.uid).then((msg) => setMsg(msg))
        }
      >
        <Text style={styles.buttonTitle}>Follow user</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddFriendScreen;
