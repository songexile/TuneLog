import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const { user } = useAuth();
  console.log("user in profile navigator", user.uid);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        initialParams={{ viewingId: user.uid }}
      />

      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
