import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import PetInfo from "./../../components/PetDetails/petInfo";
// import { useNavigation } from "expo-router";
import PetSubInfo from "./../../components/PetDetails/petSubInfo";
import AboutPet from "./../../components/PetDetails/aboutPet";
import OwnerInfo from "./../../components/PetDetails/ownerInfo";
import Colors from "@/constants/Colors";

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* pet info */}
        <PetInfo pet={pets} />

        {/* pet propertise */}
        <PetSubInfo pet={pets} />

        {/* about */}
        <AboutPet pet={pets} />

        {/* owner */}
        <OwnerInfo pet={pets} />
        {/* space */}
        <View style={{ height: 70 }}></View>
      </ScrollView>
      {/* adopt button */}
      <View style={styles?.bottomContainer}>
        <TouchableOpacity style={styles.adoptButton}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
  bottomContainer: { position: "absolute", width: "100%", bottom: 0 },
});
