import React from "react";
import { Button, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { writeUserName } from "../../hooks/useWriteDb";
import { useDisplayName } from "../../hooks/readDb";

export default function HomeScreen(props) {
  const { signOut, user } = useAuth();
  const name = useDisplayName();

  return (
    <View>
      <Text>{name}</Text>
      <Button onPress={signOut} title="signout">
        Sign out
      </Button>
    </View>
  );
}
