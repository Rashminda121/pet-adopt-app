import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "./../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.PRIMARY }}>
      <Tabs.Screen
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
        name="home"
      />
      <Tabs.Screen
        options={{
          title: "Favourite",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }}
        name="favourite"
      />
      <Tabs.Screen
        options={{
          title: "Inbox",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
        }}
        name="inbox"
      />
      <Tabs.Screen
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={24} color={color} />
          ),
        }}
        name="profile"
      />
    </Tabs>
  );
}
