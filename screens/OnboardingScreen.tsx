/** @format */

import * as React from "react";
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import iconSet from "@expo/vector-icons/build/Fontisto";
const { width } = Dimensions.get("window");

const AnimatedAntDesign = Animated.createAnimatedComponent(SimpleLineIcons);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const Circle = ({
  onPress,
  index,
  data,
  animatedValue,
  animatedValue2,
}: any) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp"
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}>
            <AnimatedAntDesign
              name='arrow-right'
              style={{ color: backgroundColor }}
              size={28}
              color={"white"}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const colors = [
  {
    initialBgColor: "#EF9DCD",
    bgColor: "#233ACB",
    nextBgColor: "#FFF",
  },
  {
    initialBgColor: "#233ACB",
    bgColor: "#FFF",
    nextBgColor: "#EF9DCD",
  },
  {
    initialBgColor: "#FFF",
    bgColor: "#EF9DCD",
    nextBgColor: "#233ACB",
  },
];
const data = [
  {
    title: "Choose your\nintrests",
    img: "ios-glasses",
    icon: "Ionicons",
  },
  {
    title: "Local news\nstories",
    img: "newspaper",
    icon: "MaterialCommunityIcons",
  },
  {
    title: "Drag and drop\nto move",
    img: "select-drag",
    icon: "MaterialCommunityIcons",
  },
];

const onBordingScreen = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(data.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <StatusBar hidden />
      <View
        style={{
          width: Dimensions.get("window").width,
          height: 100,
          zIndex: 10,
        }}></View>
      <Circle
        index={index}
        onPress={onPress}
        data={data}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: data.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(data.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(data.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}>
        {data.slice(0, colors.length).map(({ title, img, icon }, i) => {
          return (
            <View
              style={{
                paddingRight: width,
                // backgroundColor: "red",
                height: width,
                width: width * 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={i}>
              <Animated.View
                style={{
                  backgroundColor: colors[i].nextBgColor,
                  borderRadius: 10,
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {icon === "Ionicons" ? (
                  <Ionicons name={img} color={colors[i].bgColor} size={90} />
                ) : (
                  <MaterialCommunityIcons
                    name={img}
                    color={colors[i].bgColor}
                    size={60}
                  />
                )}
              </Animated.View>
              <Text
                style={[styles.paragraph, { color: colors[i].nextBgColor }]}>
                {title}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "turquoise",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default onBordingScreen;
