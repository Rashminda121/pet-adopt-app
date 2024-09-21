import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PetListByCategory from "./../../components/Home/PetListByCategory";

export default function Home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={{
          justifyContent: "center",
          padding: 20,
          marginTop: 20,
        }}
      >
        {/* header */}
        <Header />

        {/* slider */}
        <Slider />

        {/* pet list & category */}
        <PetListByCategory />

        {/* add new pet */}

        <TouchableOpacity onPress={() => {}} style={styles.addNewPetContainer}>
          <MaterialIcons name="pets" size={24} color="black" />
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 18,
              color: "black",
            }}
          >
            Add New Pet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.light_primary,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});
