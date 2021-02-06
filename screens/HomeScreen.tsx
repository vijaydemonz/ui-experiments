/** @format */

import React from "react";
import { Dimensions, PixelRatio, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
let height = Dimensions.get("screen").height;
let width = Dimensions.get("screen").width;
let px = (ActualPixel: number) => {
  return PixelRatio.getPixelSizeForLayoutSize(ActualPixel);
};

export default function HomeScreen({ navigation }: any) {
  height = Dimensions.get("screen").height;
  width = Dimensions.get("screen").width;
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index): any => index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.screenName);
            }}
          >
            <View style={styles.itemStyle}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        data={[
          { title: "Onbording Animation", screenName: "OnboardingScreen" },
          { title: "Balloons slider", screenName: "BallonSlider" },
          { title: "Animated Tabbar", screenName: "Tabbar" },
          { title: "Movie Carousel", screenName: "MaskedCarousel" },
          { title: "Neumorphic Tuner", screenName: "NeumorphicSlider" },
          {
            title: "Landing Screen Animation",
            screenName: "LandingScreen",
          },
          { title: "Wave", screenName: "Wave" },
          { title: "Card Flip", screenName: "CardFlip" },

          { title: "Fap drawer", screenName: "MenuDrawer" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemStyle: {
    height: px(30),
    shadowColor: "blue",
    shadowOpacity: 0.4,
    elevation: 1.1,
    width: px(143),
    marginTop: px(3),
    // borderRadius: px(5),
    justifyContent: "center",
    alignItems: "center",
  },
});
