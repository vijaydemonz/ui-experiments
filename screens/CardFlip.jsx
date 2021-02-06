import React, { Component, createRef } from "react";
import { Text, StyleSheet, Animated, View } from "react-native";
import { transform } from "typescript";

export default class CardFlip extends Component {
  anim = new Animated.Value(0);

  handleFlip = () => {
    this.anim.setValue(0);
    Animated.timing(this.anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  render() {
    return (
      <View style={styles.continer}>
        <Animated.View
          onTouchStart={() => this.handleFlip()}
          style={[
            styles.card,
            {
              transform: [
                {
                  rotateY: this.anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["0deg", "90deg", "180deg"],
                  }),
                },
                {
                  perspective: this.anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [200, 200, 200],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.circle} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: "#fffafa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "orange",
  },
});
