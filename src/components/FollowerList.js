import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getUsernameFromId,
  returnFollowing,
  getAllUsernames,
} from "../hooks/followers";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

//FollowerList is a React component that will be used in the followerlist and also has another use case of being used on the home screen when displaying who the user is following

const FollowerList = ({ userId, unfollow, currentlyPlaying }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false); //loading state
  const { user } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getAllUsernames(user.uid).then((usernames) => {
        setFollowing(usernames);
        setLoading(false);
      });
    }, [])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      {following.map((username) => (
        <View style={styles.button}>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    width: "100%",
  },
  button: {
    backgroundColor: "#9D3BEA",
    borderRadius: 20,
    height: 50,
    width: "100%",
    justifyContent: "center",
    marginVertical: 10,
    borderBottomColor: "white",
  },
  usernameText: {
    marginLeft: 10,
    fontSize: 20,
  },
});
export default FollowerList;
