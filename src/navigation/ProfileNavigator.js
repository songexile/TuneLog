import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();

const ProfileNavigator = ({ route }) => {
  const { viewingId } = route.params;
  console.log("user in profile navigator", viewingId);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
        initialParams={{ viewingId: viewingId }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        initialParams={{ viewingId: viewingId }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
