/** @format */

import React from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  View,
  Text,
  Animated,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
// import styled from "styled-components";

type StateType = {
  barWidth: number | null;
  deltaValue: number;
  velocity: number;
  value: number;
  animatedWidth: any;
};

const initialValue = 0;
const min = 0;
const max = 100;
const CIRCLE_DIAMETER = 30;

export default class Slider extends React.Component<{}, StateType> {
  state = {
    barWidth: null,
    deltaValue: 0,
    animatedwidth: new Animated.Value(0),
    value: initialValue,
    velocity: 0,
    appearAnim: new Animated.Value(0),
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderStart: (_, gestureState) => this.onStart(),
    onPanResponderGrant: (_, gestureState) => this.onStart(),
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove(),
    onPanResponderTerminate: () => {},
  });
  onStart() {
    const { barWidth, appearAnim } = this.state;
    Animated.spring(appearAnim, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }

  onMove(gestureState: PanResponderGestureState) {
    const { barWidth, animatedwidth } = this.state;
    const newDeltaValue = this.getValueFromBottomOffset(
      gestureState.dx,
      barWidth,
      min,
      max
    );
    // LayoutAnimation.configureNext(
    //   LayoutAnimation.Types.linear

    // LayoutAnimation.create(
    //   // 200,
    //   // LayoutAnimation.Types.spring
    // )
    // );
    // Animated.timing(animatedwidth, {
    //   duration: 100,
    //   toValue: gestureState.dx,
    //   useNativeDriver: true,
    // }).start();
    animatedwidth.setValue(Math.round(gestureState.vx) * 100);
    this.setState({
      deltaValue: newDeltaValue,
      velocity: Math.round(gestureState.vx) * 100,
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }
  onEndMove() {
    const { value, deltaValue, appearAnim } = this.state;
    this.setState({ value: value + deltaValue, deltaValue: 0 });
    Animated.spring(appearAnim, {
      toValue: 0,
      damping: 1,
      useNativeDriver: false,
    }).start();
  }

  onBarLayout = (event: LayoutChangeEvent) => {
    const { width: barWidth } = event.nativeEvent.layout;
    this.setState({ barWidth: barWidth });
  };
  capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };

  getValueFromBottomOffset = (
    offset: number,
    barWidth: number | null,
    rangeMin: number,
    rangeMax: number
  ) => {
    if (barWidth === null) return 0;
    return ((rangeMax - rangeMin) * offset) / barWidth;
  };

  getBottomOffsetFromValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barWidth: number | null
  ) => {
    if (barWidth === null) return 0;
    const valueOffset = value - rangeMin;
    const totalRange = rangeMax - rangeMin;
    const percentage = valueOffset / totalRange;
    return barWidth * percentage;
  };

  render() {
    const { value, deltaValue, barWidth } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue, [
      min,
      max,
    ]);
    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barWidth
    );

    return (
      <Animated.View
        style={{
          flex: 1,
          // backgroundColor: "black",
          // flexGrow: 1,
          alignSelf: "flex-start",
          alignItems: "center",
          height: 100,
          paddingVertical: 20,
        }}>
        {/* <Text style={{ color: "white" }}>{Math.floor(cappedValue)}</Text> */}
        <Animated.View
          style={{
            width: 70,
            height: 70,
            left: this.state.animatedwidth.interpolate({
              inputRange: [-50, 0, 50],
              outputRange: [bottomOffset + 20, bottomOffset, bottomOffset - 20],
              extrapolate: "clamp",
            }),
            justifyContent: "center",
            alignItems: "center",
            opacity: this.state.appearAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0, 1],
              extrapolate: "clamp",
            }),
            transform: [
              {
                rotateZ: this.state.animatedwidth.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: ["35deg", "0deg", "-35deg"],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: this.state.appearAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, -10],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}>
          <MaterialCommunityIcons
            name='balloon'
            size={70}
            style={{ height: 60 }}
            color='blue'
          />
          <Text
            style={{
              position: "absolute",
              top: 15,
              color: "white",
            }}>
            {Math.floor(cappedValue)}
          </Text>
        </Animated.View>
        <View
          style={{
            // flexGrow: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            flexDirection: "row",
          }}>
          <View
            style={{
              width: CIRCLE_DIAMETER,
              alignItems: "flex-start",
              paddingVertical: CIRCLE_DIAMETER / 2.5,
              marginHorizontal: CIRCLE_DIAMETER / 2,
            }}>
            <View
              style={{
                width: Dimensions.get("window").width * 0.8,
                height: 2,
                // alignSelf: "center",
                backgroundColor: "#a2a2a2",
                // flexGrow: 1,
                flexDirection: "row",
                // alignItems: "flex-start",
                justifyContent: "flex-start",
                borderRadius: 2,
              }}
              onLayout={this.onBarLayout}>
              <View
                style={{ flex: cappedValue / 100, backgroundColor: "blue" }}
              />
            </View>
            <TapGestureHandler
            // onHandlerStateChange={() =>
            // Animated.spring(this.state.appearAnim, {
            //   toValue: 1,
            //   useNativeDriver: false,
            // }).start()
            // }
            >
              <View
                style={{
                  borderRadius: CIRCLE_DIAMETER / 2,
                  width: CIRCLE_DIAMETER,
                  height: CIRCLE_DIAMETER,
                  backgroundColor: "white",
                  position: "absolute",
                  borderColor: "blue",
                  borderWidth: 2,
                  left: bottomOffset,
                  alignSelf: "flex-start",
                }}
                // bottomOffset={bottomOffset}
                {...this.panResponder.panHandlers}
              />
            </TapGestureHandler>
          </View>
        </View>
      </Animated.View>
    );
  }
}

// const PageContainer = styled.View``;

// const Container = styled.View`

// `;
// const Value = styled.Text`
//   color: white;
// `;

// const BarContainer = styled.View`

// `;
// const Bar = styled.View`

// `;

// const Circle = styled.View`
// `;
