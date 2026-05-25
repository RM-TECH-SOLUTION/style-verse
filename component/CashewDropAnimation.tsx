import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");
const cashew = require("../assets/nut(1).png");
const basket = require("../assets/basket.png");

const NUM_CASHEWS = 8; // number of falling cashews
const BASKET_HEIGHT = 150;
const DROP_DURATION = 3500; // fall speed (ms)

const CashewDropAnimation = () => {
  // Cashew animation refs
  const cashews = Array.from({ length: NUM_CASHEWS }).map(() => ({
    x: useRef(new Animated.Value(Math.random() * (width - 80))).current,
    y: useRef(new Animated.Value(-100)).current,
    rotate: useRef(new Animated.Value(0)).current,
  }));

  // Basket horizontal movement
  const basketX = useRef(new Animated.Value(0)).current;

  // 🧺 Basket moves left <-> right forever
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(basketX, {
          toValue: 100, // move right
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(basketX, {
          toValue: -100, // move left
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [basketX]);

  // 🥜 Cashew fall animation
  useEffect(() => {
    cashews.forEach((c, index) => {
      const delay = index * 400; // stagger each cashew

      const fall = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(c.y, {
              toValue: height - BASKET_HEIGHT - 60, // near basket
              duration: DROP_DURATION,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(c.rotate, {
              toValue: 1,
              duration: DROP_DURATION,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          // bounce effect
          Animated.sequence([
            Animated.timing(c.y, {
              toValue: height - BASKET_HEIGHT - 40,
              duration: 200,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(c.y, {
              toValue: height - BASKET_HEIGHT - 60,
              duration: 200,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          // reset
          Animated.timing(c.y, {
            toValue: -120,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(c.rotate, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      fall.start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Cashew images */}
      {cashews.map((c, i) => {
        const rotate = c.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        });

        return (
          <Animated.Image
            key={i}
            source={cashew}
            style={[
              styles.cashew,
              {
                transform: [
                  { translateX: c.x },
                  { translateY: c.y },
                  { rotate },
                ],
              },
            ]}
          />
        );
      })}

      {/* 🧺 Moving Basket (looping left-right) */}
      <Animated.View
        style={[
          styles.basketContainer,
          {
            transform: [{ translateX: basketX }],
          },
        ]}
      >
        <Image source={basket} style={styles.basket} resizeMode="contain" />
      </Animated.View>
    </View>
  );
};

export default CashewDropAnimation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA94D",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cashew: {
    position: "absolute",
    width: 60,
    height: 60,
  },
  basketContainer: {
    position: "absolute",
    bottom: -185,
    width: "100%",
    alignItems: "center",
    left: -130,
  },
  basket: {
    width: 220,
    height: 150,
    marginTop: 100,
    bottom: 0,
  },
});
