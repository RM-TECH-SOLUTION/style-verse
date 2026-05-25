import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import logoImage from "../assets/pp-Logo.png";
import Ionicons from '@expo/vector-icons/Ionicons';
import orderingStore from '../store/orderingStore';
import { useNavigation } from "@react-navigation/native";

const HomeTopBarSectionComponent = () => {
   const { cartResponse } = orderingStore();

   const navigation = useNavigation();
   
  return (
    <View style={{backgroundColor:"#F57C00",padding:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Image
                          source={logoImage}
                          style={{ width: 60, height: 60, borderRadius: 50, resizeMode: "cover", }}
                         
                        />
      <Text style={{fontSize:30,fontWeight:900}}>Demo</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("Checkout")}
      >
      <View style={{backgroundColor:"black",justifyContent:"flex-end",alignItems:"flex-end",position:"absolute",zIndex:"0009",marginTop:-10,borderRadius:"100%"}}>
        <Text style={{color:"#fff",borderRadius:"100%",padding:2}}>{cartResponse?.length}</Text>
      </View>
      <View style={{backgroundColor:"white",padding:7,borderRadius:"100%"}}>
        <Text style={{color:"green"}}>🛒</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default HomeTopBarSectionComponent