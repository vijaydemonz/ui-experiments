import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";

const MenuDrawer = () => {
  const scale = {
    width: useRef(new Animated.Value(80)).current,
    height: useRef(new Animated.Value(80)).current,
  };
  const rotate = useRef(new Animated.Value(0)).current;

  const translate = useRef(new Animated.Value(-700)).current;
  const [toggle, setToggle] = useState(false);

  const handleTap = () => {
    setToggle(!toggle);
    let t = toggle;
    // console.log("data");
    // rotate.setValue(0);
    // scale.width.setValue(80);
    // translate.setValue(-700);
    // scale.height.setValue(80);

    Animated.timing(rotate, {
      toValue: t ? 0 : 90 + 45,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale.width, {
      toValue: t ? 80 : 450,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(scale.height, {
      toValue: t ? 80 : 900,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(translate, {
      toValue: t ? -700 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={handleTap}>
        <Animated.View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            position: "absolute",
            zIndex: 100,
            elevation: rotate.interpolate({
              inputRange: [0, 45, 90],
              outputRange: [2, 1, 1],
            }),
            alignSelf: "flex-end",
            margin: 30,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotate.interpolate({
                    inputRange: [0, 45, 90],
                    outputRange: ["0deg", "45deg", "90deg"],
                  }),
                },
              ],
            }}
          >
            <Ionicons name="md-add" size={40} color="black" />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
      <Animated.View
        style={{
          width: scale.width,
          //    400,
          height: scale.height,
          elevation: 1,
          borderRadius: scale.height.interpolate({
            inputRange: [0, 79, 80, 400],
            outputRange: [0, 0, 40, 20],
          }),
          marginRight: scale.height.interpolate({
            inputRange: [0, 79, 80, 400],
            outputRange: [0, 0, 30, 0],
          }),
          right: scale.height.interpolate({
            inputRange: [0, 79, 80, 400],
            outputRange: [0, 0, 0, 10],
          }),
          top: scale.height.interpolate({
            inputRange: [0, 79, 80, 400],
            outputRange: [0, 0, 30, 0],
          }),
          position: "absolute",
          backgroundColor: "white",
        }}
      ></Animated.View>
      <Animated.View
        style={{
          elevation: 6,
          transform: [{ translateY: translate }],
          opacity: translate.interpolate({
            inputRange: [-600, 0],
            outputRange: [0, 1],
          }),
        }}
      >
        <View style={{ top: 100, position: "absolute" }}>
          <FlatList
            data={["item1", "item2", "item3", "item4", "item5", "item6"]}
            keyExtractor={(item, index) => item}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: 400,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                }}
              >
                <Text style={{ fontSize: 30, fontStyle: "normal" }}>
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default MenuDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  fapIcon: {},
});
