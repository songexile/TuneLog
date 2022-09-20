import React from "react";
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

const auth = getAuth();
const user = auth.currentUser;

export default function HomeScreen(props) {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Welcome to TuneLog t </Text>
      <Button onPress={signOut} title="signout">
        Sign out
      </Button>
    </View>
  );
}
