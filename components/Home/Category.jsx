import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState("Dogs");

  useEffect(() => {
    GetCategories();
  }, []);

  //   get category data

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedcategory(item.name);
              category(item.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
                {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_primary,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },

  selectedCategoryContainer: {
    backgroundColor: Colors.light_orange,
    borderColor: Colors.orange,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    transform: [{ scale: 1.11 }],
  },
});
