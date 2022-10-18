import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StatsScreen from "../screens/StatsScreen/StatsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import SettingScreen from "../screens/SettingScreen/SettingScreen";
import AddFriendScreen from "../screens/AddFriendScreen/AddScreenFriend";
import ViewUserScreen from "../screens/ViewUserScreen/ViewUserScreen";

const Stack = createStackNavigator();

const FollowingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="FollowingList"
        component={SettingScreen}
      />
      <Stack.Screen name="ViewUser" component={ViewUserScreen} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
    </Stack.Navigator>
  );
};

export default FollowingNavigator;
