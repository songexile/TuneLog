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

  const unfollowUserState = (userId) => {
    //removes user from the map of following, so we don't need to refresh whole db for delete

    setFollowing(
      (following) => following.filter((following) => following.id !== userId) //here we filter the user out by user id and setfollowing to the new array
    );
    //use the id to delete the user from the map
  };

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
    return <Text>Loading following list</Text>;
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ViewUser", {
                    viewingId: user.id,
                  });
                }}
              >
                <ProfileImage image={user.profilePic} />
              </TouchableOpacity>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewUser", {
                      viewingId: user.id,
                    });
                  }}
                >
                  <Text style={styles.usernameText}>{user.name}</Text>
                  <Text style={styles.recentTuneText}>Most recent tune:</Text>
                  <Text style={styles.currentListening}>
                    {""}
                    {user.currentListening}
                  </Text>
                </TouchableOpacity>
                {unfollow && (
                  <Text
                    style={styles.unfollow}
                    onPress={() => {
                      unfollowUserState(user.id);
                      +unfollowUser(userId, user.id);
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
    alignSelf: "center",
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
    textAlign: "center",
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
  recentTuneText: {
    color: '#363535',
    // fontSize: 11,
    fontWeight: "400",
    alignSelf: "center",
  },
});
export default FollowerList;
