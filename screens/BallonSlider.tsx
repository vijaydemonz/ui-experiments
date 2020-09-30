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
import {
  TapGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
              color: "#202124",
              fontFamily: "OpenSans-medium",
            }}>
            {"Choose\nballoon\nquantity"}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={{ flex: 1, top: 100 }}>
              <Slider />
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}></View>
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
        <TapGestureHandler>
          <View
            style={{
              width: 140,
              height: 60,
              borderRadius: 10,
              alignSelf: "flex-end",
              backgroundColor: "orange",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 20,
              margin: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontFamily: "roboto-bold",
              }}>
              Next
            </Text>
            <Entypo name={"chevron-right"} style={{ left: 10 }} size={25} />
          </View>
        </TapGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
