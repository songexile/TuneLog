import { View, Text, Button } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";

const Stack = createStackNavigator();
const user = false;

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {user ? ( // if user is logged in we show the home screen
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
