import { db } from "@/config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Category from "./Category";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");

    const intervalId = setInterval(() => {
      GetPetList("Dogs");
    }, 80000); // 80 seconds in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  //   get pet list on category selection

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        renderItem={({ item, index }) => <PetListItem pets={item} />}
      />
    </View>
  );
}
