import { View, Text } from "react-native";
import React from "react";
//import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/tabs/home";
import HomeScreen from "@/app/tabs/home";
import HomeScreen from "@/app/tabs/home";
import HomeScreen from "@/app/tabs/home";

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tabs.Navigator screenOptions={{ tabBarActiveTintColor: Colors.PRIMARY }}>
      <Tabs.Screen
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
        name="home"
        component={HomeScreen}
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
        component={HomeScreen}
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
        component={HomeScreen}
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
        component={HomeScreen}
      />
    </Tabs.Navigator>
  );
}
