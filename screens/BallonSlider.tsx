/** @format */

import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Easing,
} from "react-native";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "../components/Slider";
import { animationParameter } from "react-native-redash";
export default function BallonSlider() {
  const translateX = React.useRef(new Animated.Value(0)).current;
  let x = React.useRef(0).current;
  const DRAG_THRESHOLD = 35 / 2;
  const DRAG_LIMIT = 390 - 35 / 2;
  let containerBounds = React.useRef({
    width: 0,
  }).current;

  let touchStart = 8;
  let sliderWidth = 60;
  let containerBorderWidth = 8;

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (
          Math.abs(evt.nativeEvent.pageX) > DRAG_THRESHOLD &&
          Math.abs(evt.nativeEvent.pageX) < DRAG_LIMIT
        ) {
          x = evt.nativeEvent.pageX;
          return Animated.event([null, { dx: 0 }])(evt, gestureState);
        } // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // evt.nativeEvent.locationX
        console.log(
          "BallonSlider -> evt.nativeEvent.locationX ",
          evt.nativeEvent.locationX
        );
        if (
          Math.abs(evt.nativeEvent.pageX) > DRAG_THRESHOLD &&
          Math.abs(evt.nativeEvent.pageX) < DRAG_LIMIT
        ) {
          x = evt.nativeEvent.pageX;
          return Animated.event([null, { dx: translateX }])(evt, gestureState);
        }
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (
          Math.abs(evt.nativeEvent.pageX) > DRAG_THRESHOLD &&
          Math.abs(evt.nativeEvent.pageX) < DRAG_LIMIT
        ) {
          x = evt.nativeEvent.pageX;
          return Animated.event([null, { dx: translateX }])(evt, gestureState);
        } // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "flex-start",
        }}>
        <TouchableOpacity style={{ paddingTop: 25, paddingLeft: 20 }}>
          <Entypo name={"chevron-left"} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 50,
              marginLeft: 10,
              //   fontWeight: "bold",
              color: "#202124",
              fontFamily: "roboto-bold",
            }}>
            {"Choose\nballon\nquntity"}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                containerBounds.width = layout.width;
              }}
              style={{
                height: 50,
                width: Dimensions.get("window").width * 0.92,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  height: 3,
                  width: "100%",
                  borderRadius: 3,
                  backgroundColor: "#a2a2a2",
                }}
              />
              <Animated.View
                {...panResponder.panHandlers}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  position: "absolute",
                  borderWidth: 2,
                  transform: [{ translateX }],
                  alignSelf: "flex-start",
                  backgroundColor: "white",
                  borderColor: "blue",
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "orange",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 0.5, backgroundColor: "gray" }} />
    </View>
  );
}

const styles = StyleSheet.create({});
