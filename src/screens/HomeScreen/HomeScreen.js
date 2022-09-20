import React from "react";
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { writeUserData } from "../../hooks/useDb";

export default function HomeScreen(props) {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Welcome to TuneLog </Text>
      <Button onPress={signOut} title="signout">
        Sign out
      </Button>
      <Button
        onPress={() => writeUserData(1, "swag", "swag")}
        title="db"
      ></Button>
    </View>
  );
}
