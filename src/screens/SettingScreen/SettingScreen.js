import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import FollowerList from "../../components/FollowerList";
import useAuth from "../../hooks/useAuth";

const SettingScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <CustomButton
        title="Add friend"
        onPress={() => navigation.navigate("AddFriend")}
      />
      <CustomButton onPress={signOut} title="Sign out" />
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
