import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = (screenWidth - 140) / 2; // subtract sidebar + spacing

const categories = [
  { id: 1, name: "Fresh Vegetables", icon: "https://i.imgur.com/8Km9tLL.png" },
  { id: 2, name: "Seasonal Vegetables", icon: "https://i.imgur.com/8Km9tLL.png" },
  { id: 3, name: "Certified Organics", icon: "https://i.imgur.com/8Km9tLL.png" },
  { id: 4, name: "Leafy & Seasonings", icon: "https://i.imgur.com/8Km9tLL.png" },
];

const products = [
  {
    id: 1,
    name: "Chilli Green",
    weight: "190-210g",
    price: 14,
    oldPrice: 62,
    discount: "77%",
    image:
      "https://images.unsplash.com/photo-1583663848850-46af132dc08e",
  },
  {
    id: 2,
    name: "Potato Fresh New Crop",
    weight: "0.95-1.05Kg",
    price: 21,
    oldPrice: 89,
    discount: "76%",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  },
  {
    id: 3,
    name: "Tomato Local",
    weight: "0.95-1.05Kg",
    price: 26,
    oldPrice: 125,
    discount: "79%",
    image:
      "https://images.unsplash.com/photo-1561136594-7f68413baa99",
  },
  {
    id: 4,
    name: "Beans French",
    weight: "240-260g",
    price: 18,
    oldPrice: 48,
    discount: "62%",
    image:
      "https://images.unsplash.com/photo-1582515073490-dc8b9c1b2f8e",
  },
];

export default function CategoryListComponent2() {

  const renderProduct = ({ item }) => (
    <View style={styles.card}>

      <Image source={{ uri: item.image }} style={styles.productImage} />

      <Text style={styles.weight}>{item.weight} ▼</Text>
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
        <Text style={styles.price}> ₹{item.price}</Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>Add ▼</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Sidebar */}
      <View style={styles.sidebar}>
        {categories.map((item) => (
          <View key={item.id} style={styles.categoryBox}>
            <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        ))}
      </View>

      {/* Product Grid */}
      <View style={styles.productArea}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  sidebar: {
    width: 100,
    backgroundColor: "#f6f6f6",
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: "#eee",
  },

  categoryBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  categoryIcon: {
    width: 35,
    height: 35,
  },

  categoryText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },

  productArea: {
    flex: 1,
    padding: 10,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    marginHorizontal: 5,
  },

  discount: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "green",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    zIndex: 1,
  },

  discountText: {
    color: "#fff",
    fontSize: 11,
  },

  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },

  weight: {
    fontSize: 12,
    marginTop: 5,
    color: "#555",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 3,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  oldPrice: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 12,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
  },

  addButton: {
    borderWidth: 1,
    borderColor: "#e91e63",
    borderRadius: 6,
    paddingVertical: 6,
    marginTop: 8,
    alignItems: "center",
  },

  addText: {
    color: "#e91e63",
    fontWeight: "600",
  },
});