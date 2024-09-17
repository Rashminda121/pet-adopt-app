import { View, Text } from "react-native";
import React from "react";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import PetListByCategory from "./../../components/Home/PetListByCategory";

export default function Home() {
  return (
    <View style={{ justifyContent: "center", padding: 20, marginTop: 20 }}>
      {/* header */}
      <Header />

      {/* slider */}
      <Slider />

      {/* pet list & category */}
      <PetListByCategory />

      {/* list of pets */}

      {/* add new pet */}
    </View>
  );
}
