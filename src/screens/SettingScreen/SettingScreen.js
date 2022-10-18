import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import FollowerList from "../../components/FollowerList";
import useAuth from "../../hooks/useAuth";

const SettingScreen = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <CustomButton
        title="Add friend"
        onPress={() => navigation.navigate("AddFriend")}
      />
      <CustomButton
        title="Remove friend"
        onPress={() => navigation.navigate("RemoveFriend")}
      />
      <FollowerList
        userId={user.uid}
        unfollow={true}
        //pass navigation as a prop to the FollowerList component
        navigation={navigation}
      />
    </View>
  );
};

//create stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});

export default SettingScreen;
