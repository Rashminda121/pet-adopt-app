import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

export default function PetSubInfoCard({ pet, icon, title, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
      }}
    >
      <Ionicons name={icon} size={40} color={Colors.dark_yellow} />
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
        >
          {title}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
