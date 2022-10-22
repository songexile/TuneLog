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
      <View style={{height:100, saclesPageToFit:true, position: 'static', inset: 0}}>
      <WebView source={{uri: 'https://open.spotify.com/embed/track/6jRCP46FGnbXAcJcOt51rZ?utm_source=generator'}} 
        style={{height: 80, width:300, frameBorder:0, scrollEnabled: false, flex:0, saclesPageToFit:true, position: 'static', inset: 0 }}>
      </WebView>
      </View>



      
      
      <CustomButton
        title="Add friend"
        onPress={() => navigation.navigate("AddFriend")}
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
