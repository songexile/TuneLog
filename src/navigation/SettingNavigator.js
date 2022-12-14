import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../screens/SettingScreen/SettingScreen";
import AddFriendScreen from "../screens/AddFriendScreen/AddScreenFriend";
import RemoveFriendScreen from "../screens/RemoveFriendScreen/RemoveFriendScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingScreen}
      />
      <Stack.Screen
        name="AddFriend"
        component={AddFriendScreen}
        options={{ title: "Follow user" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
