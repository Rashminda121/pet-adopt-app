import { View, Image } from "react-native";
import React from "react";

export default function Index() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./../../assets/images/login.png")}
        style={{ width: "100%", height: 400, marginTop: 70 }}
      />
      <View></View>
    </View>
  );
}
