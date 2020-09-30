/** @format */

import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import * as shape from "d3-shape";
import { TapGestureHandler } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const height = 64;
// const { Path } = Svg;
const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;
const getPath = (): string => {
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: 0, y: 0 },
    { x: width, y: 0 },
  ]);
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width, y: 0 },
    { x: width - 10, y: 0 },
    { x: width + 5, y: 0 },
    { x: width + 10, y: height - 17 },
    { x: width + tabWidth - 10, y: height - 17 },
    { x: width + tabWidth - 5, y: 0 },
    { x: width + tabWidth + 10, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);
  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Tabbar({ navigation }: any) {
  const d = getPath();
  const animation = useRef(new Animated.Value(0)).current;
  const floatTab = useRef(new Animated.Value(0)).current;

  const translateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [-width, 0],
  });
  const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
  const [activeTab, setActive] = useState(0);
  const setActiveTab = (index: number) => {
    floatTab.setValue(1);
    setActive(index);
    Animated.spring(animation, {
      toValue: index * (width / 5),
      useNativeDriver: false,
    }).start(() => {});
    Animated.spring(floatTab, {
      toValue: 0,
      //   duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <AnimatedSvg
        width={width * 2}
        {...{ height }}
        style={{ transform: [{ translateX }] }}>
        <Path fill={"white"} {...{ d }} />
      </AnimatedSvg>
      <View style={[StyleSheet.absoluteFill, { justifyContent: "flex-end" }]}>
        <View
          style={{
            width,
            height: 100,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            // left: 13,
            // top: -3,
            // backgroundColor: "orange",
          }}>
          {tabs.map((item, index) => {
            return activeTab == index ? (
              <View style={{ flex: 1 }} />
            ) : (
              <TapGestureHandler
                onHandlerStateChange={() => setActiveTab(index)}>
                <View
                  style={{
                    flex: 1,
                    height: height,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Feather name={item.name} size={27} />
                </View>
              </TapGestureHandler>
            );
          })}
          <Animated.View
            style={{
              width: 57,
              height: 57,
              left: 11,
              top: 20,
              zIndex: -10,
              backgroundColor: "white",
              borderRadius: 57 / 2,
              justifyContent: "center",
              position: "absolute",
              alignItems: "center",
              transform: [
                { translateX: animation },
                {
                  translateY: floatTab.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            }}>
            <Feather name={tabs[activeTab].name} size={30} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "flex-end",
  },
});
