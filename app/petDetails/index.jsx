import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import PetInfo from "./../../components/PetDetails/petInfo";
// import { useNavigation } from "expo-router";
import PetSubInfo from "./../../components/PetDetails/petSubInfo";

export default function PetDetails() {
  const route = useRoute();
  const { pets } = route.params;

  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTransparent: true,
  //     headerTitle: "",
  //   });
  // }, []);

  return (
    <View style={{ marginTop: 30 }}>
      {/* pet info */}
      <PetInfo pet={pets} />
      <PetInfo pet={pets} />

      {/* pet propertise */}
      <PetSubInfo />

      {/* about */}

      {/* owner */}

      {/* addopt button */}
    </View>
  );
}
