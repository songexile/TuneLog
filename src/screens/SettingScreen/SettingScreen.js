import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { React, Spotify } from "react";
import CustomButton from "../../components/CustomButton";
import FollowerList from "../../components/FollowerList";
import useAuth from "../../hooks/useAuth";
import { WebView } from "react-native-webview";

const SettingScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 100,
          saclesPageToFit: true,
          position: "static",
          inset: 0,
        }}
      ></View>

      <CustomButton
        title="Add friend"
        onPress={() => navigation.navigate("AddFriend")}
      />
      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <CustomButton onPress={signOut} title="Sign out" />
    </SafeAreaView>
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
