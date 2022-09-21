import React from "react";
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { writeUserName } from "../../hooks/writeDb";

export default function HomeScreen(props) {
  const { signOut, user } = useAuth();

  return (
    <View>
      <Text>Welcome to TuneLog</Text>
      <Button onPress={signOut} title="signout">
        Sign out
      </Button>
      <Button
        onPress={() => writeUserName( "Digital Dog")}
        title="set username"
      ></Button>
    </View>
  );
}
