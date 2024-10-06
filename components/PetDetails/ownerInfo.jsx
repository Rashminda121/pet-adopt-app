import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: pet?.userImage ? pet?.userImage : "null" }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 99,
            borderWidth: 2,
            borderColor: Colors.dark_yellow,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 18,
            }}
          >
            {pet?.userName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
            }}
          >
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={28} color={Colors.dark_yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.dark_yellow,
    padding: 10,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
  },
});
