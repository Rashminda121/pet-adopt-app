import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import PetInfo from "./../../components/PetDetails/petInfo";

export default function PetDetails() {
  const route = useRoute();
  const { pets } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      {/* pet info */}
      <PetInfo pet={pets} />

      {/* pet propertise */}

      {/* about */}

      {/* owner */}

      {/* addopt button */}
    </View>
  );
}
