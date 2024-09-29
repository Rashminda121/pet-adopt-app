import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name?.charAt(0).toUpperCase() + pet?.name?.slice(1)}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 0}
        style={{ fontFamily: "outfit", fontSize: 14, textAlign: "justify" }}
      >
        {pet.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 15,
              color: Colors.secondary,
            }}
          >
            Read More
          </Text>
        </Pressable>
      )}
      {!readMore && (
        <Pressable onPress={() => setReadMore(true)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 15,
              color: Colors.secondary,
            }}
          >
            Read Less
          </Text>
        </Pressable>
      )}
    </View>
  );
}
