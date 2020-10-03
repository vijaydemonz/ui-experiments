/** @format */

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import BallonSlider from "../screens/BallonSlider";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import MaskedCarousel from "../screens/MaskedCarousel";
import NeumorphicSlider from "../screens/NeumorphicSlider";

import NotFoundScreen from "../screens/NotFoundScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import Tabbar from "../screens/Tabbar";
import Wave from "../screens/Wave";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#4630EB" },
        headerTitleStyle: { color: "white" },
      }}>
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}

      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
      <Stack.Screen name='Wave' component={Wave} />
      <Stack.Screen name='BallonSlider' component={BallonSlider} />
      <Stack.Screen name='Tabbar' component={Tabbar} />
      <Stack.Screen name='MaskedCarousel' component={MaskedCarousel} />
      <Stack.Screen name='NeumorphicSlider' component={NeumorphicSlider} />
      <Stack.Screen name='LandingScreen' component={LandingScreen} />

      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
