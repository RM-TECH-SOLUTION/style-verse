import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const LOGO_SIZE = 200;

const SplashScreen2 = ({
  fadeAnim,
  rotateInterpolate,
  backgroundImage,
  logoImage,
}) => {
  return (
    <View style={styles.container}>
      {/* Background */}
      <Animated.Image
        source={backgroundImage}
        style={[styles.fullImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Circular Logo Container */}
      <Animated.View
        style={[
          styles.circleWrapper,
          {
            opacity: fadeAnim,
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      >
        <Image
          source={logoImage}
          style={styles.logo}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  fullImage: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* 🔥 Circular Wrapper */
  circleWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    overflow: "hidden", // VERY IMPORTANT
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // optional (for white circular bg)
  },

  logo: {
    width: "100%",
    height: "100%",
  },
});