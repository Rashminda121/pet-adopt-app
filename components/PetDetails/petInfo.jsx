import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

import MarkFav from "./../MarkFav";

export default function PetInfo({ pet }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
          borderRadius: 20,
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 27 }}>
            {pet?.name?.charAt(0).toUpperCase() + pet?.name?.slice(1)}
          </Text>
          <Text
            style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
          >
            {pet?.address}
          </Text>
        </View>
        <View>
          <MarkFav pet={pet} />
        </View>
      </View>
    </View>
  );
}
