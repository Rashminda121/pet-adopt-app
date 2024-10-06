import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PetInfo from "./../../components/PetDetails/petInfo";
import PetSubInfo from "./../../components/PetDetails/petSubInfo";
import AboutPet from "./../../components/PetDetails/aboutPet";
import OwnerInfo from "./../../components/PetDetails/ownerInfo";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useRouter } from "expo-router";

export default function PetDetails() {
  const route = useRoute();
  const { pets } = route.params;
  const { user } = useUser();
  const router = useRouter();
  const navigation = useNavigation();

  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTransparent: true,
  //     headerTitle: "",
  //   });
  // }, []);

  // used to initiate chat between users

  const InitiateChat = async () => {
    // Ensure valid emails are used to form docId1 and docId2
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const petEmail = pets?.email ? pets.email : "petemail@email.com" + pets.id;

    // Build docIds safely
    const docId1 = userEmail && petEmail ? `${userEmail}_${petEmail}` : null;
    const docId2 = userEmail && petEmail ? `${petEmail}_${userEmail}` : null;

    try {
      const q = query(
        collection(db, "Chat"),
        where("id", "in", [docId1, docId2])
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          // router.push({
          //   pathname: "chat/index",
          //   params: { id: doc.id },
          // });
          navigation.navigate("chat/index", {
            id: doc.id,
          });
        });
      } else {
        // If no chat exists, create a new one
        await setDoc(doc(db, "Chat", docId1), {
          id: docId1,
          users: [
            {
              email: userEmail,
              imageUrl: user?.imageUrl,
              name: user?.fullName,
            },
            {
              email: petEmail,
              imageUrl: pets?.userImage,
              name: pets?.userName,
            },
          ],
        });
        // router.push({
        //   pathname: "chat/index",
        //   params: { id: docId1 },
        // });
        navigation.navigate("chat/index", {
          id: docId1,
        });
      }
    } catch (error) {
      console.log("Error initiating chat:", error);
    }
  };

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
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptButton}>
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
