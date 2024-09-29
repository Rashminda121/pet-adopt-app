import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "@/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({
  pet,
  name = "heart-outline",
  color = "black",
}) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  if (!user) {
    console.log("user is unavailable");
  }

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    // console.log(result);
    setFavList(result?.favorites ? result?.favorites : []);
  };

  const AddToFav = async () => {
    const favResult = favList;
    favResult.push(pet.id);
    setFavList(favResult);
    try {
      await Shared.UpdateFav(user, favResult);
    } catch (error) {
      console.error("Error in Add To Favorite: ", error);
    }
    GetFav();
  };

  const RemoveFromFav = async () => {
    const favResult = favList.filter((item) => item != pet.id);
    setFavList(favResult);
    try {
      await Shared.UpdateFav(user, favResult);
    } catch (error) {
      console.error("Error in Removing from favorites: ", error);
    }
    GetFav();
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={() => RemoveFromFav()}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name={name} size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
