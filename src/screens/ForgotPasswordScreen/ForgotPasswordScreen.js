import React from "react";
import styles from "./styles";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#9D3BEA" }]} //TODO: change to global styles
          onPress={() => resetPassword(email)}
        >
          <Text style={styles.buttonTitle}>Reset Password</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
