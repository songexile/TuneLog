import { View, Text, Button } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, LoginScreen, RegistrationScreen } from "../screens";
import useAuth from "../hooks/useAuth";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import TabNavigator from "./TabNavigator";
import ConnectSpotifyScreen from "../screens/SpotifyConnectScreen/ConnectSpotifyScreen";
import { getSpotifyToken } from "../hooks/spotifyAuth";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();
// This class is the main navigator for the application.
// When the user is not authenticated, it will show the login screen, registration screen, and forgot password screen (stack).
// When the user is authenticated, it will show the tab navigator. Tab navigator will implement main navigation for the application for the app

const StackNavigator = () => {
  const { user } = useAuth();

  const { spotifyToken } = useAuth();

  console.warn(`rendering StackNavigator, user: ${user}`);
  console.warn(`rendering StackNavigator, spotifyToken: ${spotifyToken}`);
  // const spotifyToken = getSpotifyToken();

  // console.log("spotifyToken", spotifyToken);

  return (
    <>
      {user && !spotifyToken ? (
        <ConnectSpotifyScreen />
      ) : user && spotifyToken ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
