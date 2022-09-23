import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import styles from "./styles"; //styles
import useAuth from "../../hooks/useAuth";
import { writeUserName } from "../../hooks/useWriteDb";

//view for editing profile
const EditProfileScreen = ({ navigation }) => {

  const [username, setUserName] = useState("");

  const { user } = useAuth();
  return (
    <View styles = { styles.container}>
      
      <Text style = { styles.title }> Edit Profile </Text>
        
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
          onPress={() => writeUserName(user.uid, username)}
        ><Text style={styles.buttonTitle}>Change username</Text>
        </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
