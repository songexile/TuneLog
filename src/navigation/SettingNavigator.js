import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../screens/SettingScreen/SettingScreen";
import AddFriendScreen from "../screens/AddFriendScreen/AddScreenFriend";

const Stack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingScreen}
      />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
