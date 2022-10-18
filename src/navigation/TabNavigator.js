import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens";
import MusicMapScreen from "../screens/MusicMapScreen/MusicMapScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingScreen from "../screens/SettingScreen/SettingScreen";
import ProfileNavigator from "./ProfileNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingNavigator from "./SettingNavigator";
import FollowingNavigator from "./FollowingNavigator";

//This class controls main navigation for the application once user is logged in.

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "MusicMap") {
            return (
              <Ionicons
                name={focused ? "map" : "map-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "tomato",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MusicMap" component={MusicMapScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Settings" component={FollowingNavigator} />
    </Tab.Navigator>
  );
}

export default function App() {
  return <TabNavigator />;
}
