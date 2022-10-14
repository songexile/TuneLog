import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import FollowerList from "../../components/FollowerList";

const SettingScreen = ({ navigation }) => {
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
      <FollowerList />
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
