import React from "react";
import { Text, View } from "react-native";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export default function HomeScreen(props) {
  return (
    <View>
      <Text>Welcome to TuneLog t </Text>
    </View>
  );
}
