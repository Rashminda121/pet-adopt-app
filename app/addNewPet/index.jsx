import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function AddNewPet() {
  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for Adoption
      </Text>
      <Image
        source={require("@/assets/images/paw.png")}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: Colors.dark_yellow,
        }}
      />
    </View>
  );
}
