import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getUsernameFromId,
  returnFollowing,
  getAllUsernames,
  unfollowUser,
} from "../hooks/followers";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

//FollowerList is a React component that will be used in the followerlist and also has another use case of being used on the home screen when displaying who the user is following

const FollowerList = ({ userId, unfollow, currentlyPlaying, navigation }) => {
  const [following, setFollowing] = useState({});

  const [loading, setLoading] = useState(false); //loading state
  const { user } = useAuth();

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
            <View style={styles.button}>
              <Button
                title={"user :" + user.name}
                onPress={() => {
                  navigation.navigate("ViewUser", {
                    viewingId: user.id,
                  });

                  //open up the profile of the user that is being followed
                  //ProfileScreen open that with props of the user id
                }}
              />
              {unfollow && (
                <Button
                  title="Unfollow"
                  onPress={() => {
                    unfollowUser(userId, user.id);
                  }}
                />
              )}
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
    marginLeft: 10,
    fontSize: 20,
  },
});
export default FollowerList;
