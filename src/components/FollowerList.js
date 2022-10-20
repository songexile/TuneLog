import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getUsernameFromId,
  returnFollowing,
  getAllUsernames,
  unfollowUser,
} from "../hooks/followers";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import ProfileImage from "./ProfileImage";
import CustomButton from "./CustomButton";

//FollowerList is a React component that will be used in the followerlist and also has another use case of being used on the home screen when displaying who the user is following

const FollowerList = ({ userId, unfollow, currentlyPlaying, navigation }) => {
  const [following, setFollowing] = useState({});

  const [loading, setLoading] = useState(false); //loading state
  const { user } = useAuth();

  const navigateToProfile = (userId) => {
    navigation.navigate("ViewUser", {
      viewingId: user.id,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getAllUsernames(userId).then((usernames) => {
        setFollowing(usernames);
        console.log("------------------");
        console.log(following);
        console.log("------------------");
        setLoading(false);
      });
    }, [])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (following.length == 0) {
    return <Text>You are not following anyone</Text>;
  }

  if (following.length > 0) {
    return (
      <View style={styles.container}>
        {following.map((user) => {
          return (
            <View style={styles.listeningBox}>
              <ProfileImage image={user.profilePic} />
              <View style={styles.container}>
                <Text style={styles.usernameText}>{user.name}</Text>
                <Text>Listening to</Text>
                <Text style={styles.currentListening}>
                  {" "}
                  {user.currentListening}
                </Text>
                {unfollow && (
                  <Text
                    style={styles.unfollow}
                    onPress={() => {
                      unfollowUser(userId, user.id);
                    }}
                  >
                    Unfollow
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
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
    fontSize: 20,
    fontWeight: "700",
  },
  listeningBox: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: "#9D3BEA",
    borderRadius: 20,
    padding: 25,
    marginVertical: 8,

    width: "100%",
  },
  currentListening: {
    fontWeight: "500",
  },
  unfollowButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,

    fontSize: 21,
    fontWeight: "bold",
    width: "100%",
    textDecorationColor: "white",

    borderRadius: 10,

    justifyContent: "center",
    alignSelf: "center",
  },
  unfollow: {
    marginTop: 10,
    fontWeight: "400",
    fontSize: 15,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
export default FollowerList;
