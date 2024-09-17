import { View, Text } from "react-native";
import React from "react";
//import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/tabs/home";
import Favourite from "./favourite";
import Inbox from "./inbox";
import Profile from "./profile";

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
        component={Favourite}
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
        component={Inbox}
      />
      <Tabs.Screen
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
        name="profile"
        component={Profile}
      />
    </Tabs.Navigator>
  );
}
