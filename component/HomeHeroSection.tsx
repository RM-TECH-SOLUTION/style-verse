import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const HomeHeroSection = () => {
  const slides = [
    { id: 1, image: 'https://picsum.photos/800/400?1', title: 'Offers' },
    { id: 2, image: 'https://picsum.photos/800/400?2', title: 'Events' },
    { id: 3, image: 'https://picsum.photos/800/400?3', title: 'Booking' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.swiperWrapper}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination
          dotColor="#ccc"
          activeDotColor="#FF8C00"
          paginationStyle={styles.pagination}
          containerStyle={styles.swiperContainer} // 👈 tight container
        >
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <Image source={{ uri: slide.image }} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.text}>{slide.title}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default HomeHeroSection;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  swiperWrapper: {
    height: 250, // 👈 tight control: image + dots area
  },
  swiperContainer: {
    height: 250, // 👈 match image height (no extra space)
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 20, // margin 10px each side
    height: 230, // fixed image height
    borderRadius: 15,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    bottom: 15,
    left: 35,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  pagination: {
    bottom: 0, // 👈 now dots sit tightly below image
  },
});
