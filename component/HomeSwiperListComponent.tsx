import React from 'react';
import { View, StyleSheet, Dimensions,Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CashewDropAnimation from './CashewDropAnimation';

const { width } = Dimensions.get('window');

const HomeSwiperListComponent = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#E67300","#FFD580",]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={{position:"absolute",top:0,left:0}}>
          <Text style={{padding:20,fontSize:15,fontWeight:"700"}}>Good Moring</Text>
        </View>
        <View style={{position:"absolute",bottom:40,left:20}}>
          <TouchableOpacity style={{backgroundColor:"black",borderRadius:10}}>
             <Text style={{padding:10,color:"#fff",fontSize:15,fontWeight:"900"}}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <CashewDropAnimation />
      </LinearGradient>
    </View>
  );
};

export default HomeSwiperListComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 350,
    // overflow: "hidden",
    // borderRadius: 10,
  },
  gradient: {
    // flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
