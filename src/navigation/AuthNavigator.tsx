import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@modules/auth/screens/LoginScreen";
import LandingScreen from "@modules/landing/LandingScreen";
import { ForgotPasswordScreen, ResetPasswordScreen } from "./lazyScreens";

/** The public home page is for browsers only: phones and the desktop app open at sign-in. */
export const showLanding =
  Platform.OS === "web" && globalThis.location?.protocol.startsWith("http");

export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email?: string } | undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {showLanding ? (
        <Stack.Screen name="Landing" component={LandingScreen} />
      ) : null}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
