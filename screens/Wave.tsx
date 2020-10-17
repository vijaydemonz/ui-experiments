/** @format */

import React, { useEffect, useRef } from "react";
import { View, Dimensions, Animated, Easing, Text } from "react-native";
import Svg, { Path, Rect, Symbol, Use } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const SIZE = Dimensions.get("window").width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const Wave = () => {
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 2,
        duration: 5000,
        useNativeDriver: true,
      }),
      {
        resetBeforeIteration: true,
      }
    ).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        alignSelf: "center",
      }}
    >
      <MaskedView
        maskElement={
          <View
            style={{
              backgroundColor: "red",
              width: SIZE,
              height: SIZE,
              left: 320,
              borderRadius: SIZE / 2,
            }}
          />
        }
      >
        <View style={{ backgroundColor: "#242424" }}>
          <AnimatedSvg
            width={SIZE * 3}
            height={SIZE}
            style={{
              left: -100,
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 280, 0],
                    extrapolate: "clamp",
                  }),
                },
                { scale: 0.8 },
                { translateY: 7 },
              ],
            }}
            viewBox={`0 0 560 20`}
          >
            <Path
              d='M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z'
              fill='skyblue'
            ></Path>
            <Path
              d='M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z'
              fill='skyblue'
            ></Path>
            <Path
              d='M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z'
              fill='skyblue'
            ></Path>
            <Path
              d='M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z'
              fill='skyblue'
            ></Path>
          </AnimatedSvg>
          <AnimatedSvg
            width={SIZE * 3}
            height={SIZE}
            style={{
              left: 300,
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, -600, 0],
                    extrapolate: "clamp",
                  }),
                },
                { scale: 1.2 },
              ],
              backgroundColor: "transparent",
              position: "absolute",
            }}
            viewBox={`0 0 560 20`}
          >
            <Path
              d='M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z'
              fill='blue'
            ></Path>
            <Path
              d='M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z'
              fill='blue'
            ></Path>
            <Path
              d='M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z'
              fill='blue'
            ></Path>
            <Path
              d='M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z'
              fill='blue'
            ></Path>
          </AnimatedSvg>
          <AnimatedSvg
            width={SIZE * 3}
            height={SIZE}
            style={{
              left: 300,
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 2],
                    outputRange: [0, -600],
                    extrapolate: "clamp",
                  }),
                },
                { translateY: 38 },
                { scale: 1 },
              ],
              backgroundColor: "transparent",
              position: "absolute",
            }}
            viewBox={`0 0 560 20`}
          >
            <Rect width={`100%`} height={`60%`} fill='blue' />
          </AnimatedSvg>
        </View>
      </MaskedView>
    </View>
  );
};

export default Wave;
