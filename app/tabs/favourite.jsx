import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "@/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import PetListItem from "@/components/Home/PetListItem";
import { db } from "@/config/firebaseConfig";

export default function Favourite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPets, setFavPets] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetFavPetIds();

    const intervalId = setInterval(() => {
      GetFavPetIds();
    }, 80000); // 80 seconds in milliseconds

    return () => clearInterval(intervalId);
  }, [user]);

  // fav ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoader(false);
    GetFavPetList(result?.favorites);
  };

  //fetch pet list related data

  const GetFavPetList = async (favId_) => {
    setLoader(true);
    setFavPets([]);
    let pets = [];
    try {
      const q = query(collection(db, "Pets"), where("id", "in", favId_));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        pets.push(doc.data());
        // setFavPets((prev) => [...prev, doc.data()]);
        // console.log(favPets);
      });
    } catch (error) {
      console.log(error);
    }

    setFavPets(pets);
    setLoader(false);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        Favorites
      </Text>
      <FlatList
        data={favPets}
        numColumns={2}
        style={{ marginTop: 10 }}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pets={item} />
          </View>
        )}
      />
    </View>
  );
}
