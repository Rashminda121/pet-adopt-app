import React from "react";
import { View } from "react-native";
import PetSubInfoCard from "./petSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={"calendar"}
          title={"Age"}
          value={pet?.age + " Years"}
        />
        <PetSubInfoCard icon={"paw"} title={"Breed"} value={pet?.breed} />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard icon={"male-female"} title={"Sex"} value={pet?.sex} />
        <PetSubInfoCard
          icon={"scale"}
          title={"Weight"}
          value={pet?.weight + " Kg"}
        />
      </View>
    </View>
  );
}
