import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StatsScreen from "../screens/StatsScreen/StatsScreen";

import HomeScreen from "../screens/HomeScreen/HomeScreen";

import ProfileNavigator from "./ProfileNavigator";

const Stack = createStackNavigator();

const FollowingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="FollowingList"
        component={HomeScreen}
      />
      <Stack.Screen name="ViewUser" component={ProfileNavigator} />
      <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  );
};

export default FollowingNavigator;
