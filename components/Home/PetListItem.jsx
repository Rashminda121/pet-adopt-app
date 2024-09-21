import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";

export default function PetListItem({ pets }) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("petDetails/index", {
      pets: pets,
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: pets.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
        {pets?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
          {pets?.breed}
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            backgroundColor: Colors.light_primary,
            fontFamily: "outfit",
            fontSize: 11,
            paddingHorizontal: 7,
            borderRadius: 10,
          }}
        >
          {pets?.age} yrs
        </Text>
      </View>
    </TouchableOpacity>
  );
}
