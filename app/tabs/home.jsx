import { View, Text } from "react-native";
import React from "react";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";

export default function Home() {
  return (
    <View style={{ justifyContent: "center", padding: 20, marginTop: 20 }}>
      {/* header */}
      <Header />

      {/* slider */}
      <Slider />

      {/* category */}

      {/* list of pets */}

      {/* add new pet */}
    </View>
  );
}
