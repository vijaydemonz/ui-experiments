/** @format */

import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import { BoxShadow } from "react-native-shadow";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CircleSlider from "../components/CircleSlider";
import Ticker from "react-native-ticker";

import { LinearGradient } from "expo-linear-gradient";

const TickerText = (props) => {
  return (
    <Ticker textStyle={{ fontSize: 40, color: "#FFF" }} duration={250}>
      {props.text}
    </Ticker>
  );
};
// const AnimatedPath = Animated.createAnimatedComponent(LinearGradient);
export default function NeumorphicSlider() {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  let digit1 = useRef(0).current;
  let digit2 = useRef(0).current;
  const [slider, setSlider] = useState(20);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingLeft: 15,
            paddingBottom: 15,
          }}>
          <Text
            style={{
              color: "#515568",
              fontSize: 35,
              fontFamily: "roboto-regular",
            }}>
            Living Room
          </Text>
          <View style={{ flexDirection: "row" }}>
            <BoxShadow
              setting={{
                width: 12,
                height: 12,
                color: "#79F3C0",
                border: 5,
                radius: 6,
                opacity: 0.3,
                x: 5,
                y: 5,
                style: {},
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#79F3C0",
                  elevation: 0.5,
                  padding: 5,
                  top: 6,
                  left: 4,
                }}
              />
            </BoxShadow>
            <Text
              style={{
                color: "#515568",
                fontSize: 18,
                opacity: 0.8,
                paddingLeft: 10,
                fontFamily: "roboto-regular",
              }}>
              Connected
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
          {/* <BoxShadow
            setting={{
              width: 12,
              height: 12,
              color: "#79F3C0",
              border: 5,
              radius: 6,
              opacity: 0.3,
              x: 2.55,
              y: 7,
              style: {},
            }}>
            <View
              style={{
                position: "absolute",
                width: 45,
                height: 45,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            />
          </BoxShadow> */}
          <BoxShadow
            setting={{
              width: 40,
              height: 40,
              color: "#000",
              border: 10,
              radius: 10,
              opacity: 0.1,
              x: 7,
              y: 8,
              style: {},
            }}>
            <BoxShadow
              setting={{
                width: 45,
                height: 45,
                color: "#fff",
                border: 10,
                radius: 10,
                opacity: 0.1,
                x: -5,
                y: -4,
                style: {},
              }}>
              <View
                style={{
                  position: "absolute",
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                  backgroundColor: "#E8E8EF",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <MaterialIcons name='apps' size={27} color='#515568' />
              </View>
            </BoxShadow>
          </BoxShadow>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          alignSelf: "center",
          //   backgroundColor: "red",
          top: 290,
          left: 50,
        }}>
        <CircleSlider
          width={300}
          height={300}
          meterColor='transparent'
          textColor='#fff'
          value={slider}
          onValueChange={(value) => {
            digit1 && digit1.scrollTo({ x: 0, y: pan.y, animated: true });
            digit2 && digit2.scrollTo({ x: 0, y: pan.y, animated: true });
            setSlider(value);
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <BoxShadow
          setting={{
            width: 200,
            height: 200,
            color: "#fff",
            border: 100,
            radius: 100,
            opacity: 0.2,
            x: 80,
            y: -20,
            style: { alignSelf: "flex-start" },
          }}>
          <BoxShadow
            setting={{
              width: 200,
              height: 200,
              color: "#000",
              border: 100,
              radius: 100,
              opacity: 0.1,
              x: 90,
              y: 110,
              style: { left: 50 },
            }}>
            <View
              style={{
                width: 300,
                height: 300,
                backgroundColor: "#E8E8EF",
                borderRadius: 150,
                alignItems: "center",
                justifyContent: "center",
                padding: 50,
              }}>
              <BoxShadow
                setting={{
                  width: 100,
                  height: 100,
                  color: "#000",
                  border: 20,
                  radius: 50,
                  opacity: 0.03,
                  x: 40,
                  y: 5,
                  style: { alignSelf: "flex-start" },
                }}>
                <BoxShadow
                  setting={{
                    width: 100,
                    height: 100,
                    color: "#fff",
                    border: 10,
                    radius: 50,
                    opacity: 0.05,
                    x: 35,
                    y: 15,
                    style: { left: 50 },
                  }}>
                  <LinearGradient
                    style={{
                      width: 100,
                      height: 100,
                      // backgroundColor: "#E8E8EF",
                      borderRadius: 50,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0.6,
                    }}
                    colors={["purple", "skyblue"]}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        // backgroundColor: "#E8E8EF",
                        borderRadius: 50,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          width: 50,
                        }}>
                        <TickerText text={slider} />
                      </View>
                    </View>
                  </LinearGradient>
                </BoxShadow>
              </BoxShadow>
            </View>
          </BoxShadow>
        </BoxShadow>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#E8E8EF",
  },
});
