import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import styles from "./styles"; //styles
import useAuth from "../../hooks/useAuth";
import { writeBio, writeUserName } from "../../hooks/useWriteDb";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../model/config";
import { get, ref, child, update, set, remove } from "firebase/database";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

//view for editing profile
const EditProfileScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [msg, setMsg] = useState("");

  //retrieve user bio
  useFocusEffect(
    React.useCallback(() => {
      get(child(ref(db), "users/" + user.uid + "/bio")).then((snapshot) => {
        if (snapshot.exists()) {
          setBio(snapshot.val());
        } else {
          console.log("No data available");
        }
        get(child(ref(db), "users/" + user.uid + "/username")).then(
          (snapshot) => {
            if (snapshot.exists()) {
              setUserName(snapshot.val());
            }
          }
        );

        setLoading(false); //we have loaded the bio into the state
      });
    }, [])
  );

  return (
    <View styles={styles.container}>
      <View style={{ marginTop: "15%" }} />
      <Text style={{ textAlign: "center", marginBottom: 30, fontSize: 20 }}>
        Personlise your profile here!
      </Text>

      <Text
        style={{
          marginLeft: 30,
          marginRight: 30,
          paddingLeft: 15,
          fontWeight: "bold",
        }}
      >
        Username:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={loading ? "Loading..." : username}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setUserName(text)}
        value={username}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9D3BEA" }]} //TODO: change to global styles
        onPress={() =>
          writeUserName(user.uid, username).then((res) => {
            alert(res);
          })
        }
      >
        <Text style={styles.buttonTitle}>Change username</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginTop: 50,
          paddingLeft: 16,
          fontWeight: "bold",
        }}
      >
        Bio:
      </Text>
      <TextInput
        stlye
        style={styles.input}
        placeholder={loading ? "Loading..." : bio}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setBio(text)}
        value={bio} //if bio is loading display loading
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9D3BEA" }]} //TODO: change to global styles
        onPress={() => setMsg(writeBio(user.uid, bio)) + alert(msg)}
      >
        <Text style={styles.buttonTitle}>Edit bio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
