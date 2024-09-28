import React from "react";
import { View } from "react-native";
import PetSubInfoCard from "./petSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard icon={"calendar"} title={"Age"} value={pet.age} />
        <PetSubInfoCard icon={"paw"} title={"Breed"} value={pet.breed} />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard icon={"male-female"} title={"Sex"} value={pet.sex} />
        <PetSubInfoCard
          icon={"fitness"}
          title={"Weight"}
          value={pet.weight + " kg"}
        />
      </View>
    </View>
  );
}
