import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewUserScreen from "../screens/ViewUserScreen/ViewUserScreen";
import StatsScreen from "../screens/StatsScreen/StatsScreen";

const Stack = createStackNavigator();

export const ViewUserNavigator = ({ route }) => {
  const { viewingId } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewUser"
        component={ViewUserScreen}
        initialParams={{ viewingId: viewingId }}
      />
      <Stack.Screen
        name="ViewUserStats"
        component={StatsScreen}
        options={{ headerShown: false }}
        initialParams={{ viewingId: viewingId }}
      />
    </Stack.Navigator>
  );
};
