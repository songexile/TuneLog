import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens";
import MusicMapScreen from "../screens/MusicMapScreen/MusicMapScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingScreen from "../screens/SettingScreen/SettingScreen";
import ProfileNavigator from "./ProfileNavigator";

//This class controls main navigation for the application once user is logged in.

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MusicMap" component={MusicMapScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return <TabNavigator />;
}
