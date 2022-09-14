import { View, Text, Button } from "react-native";
import React from "react";

// Test commit
const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Stats" onPress={() => navigation.navigate("Stats")} />
    </View>
  );
};

export default ProfileScreen;
