import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";

const SettingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Add friend"
        onPress={() => navigation.navigate("AddFriend")}
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
