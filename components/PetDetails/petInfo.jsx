import { View, Text, Image } from "react-native";
import React from "react";

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      />
    </View>
  );
}
