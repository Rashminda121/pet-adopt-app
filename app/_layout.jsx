import { ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
//import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, ActivityIndicator, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/app/login/index";
import Index from "@/app/index";
import HomeScreen from "@/app/tabs/home";
import Tabs from "@/app/tabs/_layout";
import PetDetails from "./petDetails/index";
import AddNewPet from "./addNewPet/index";
import ChatScreen from "./chat/index";

const Stack = createStackNavigator();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    Alert.alert("Something is wrong.");
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  // Load fonts
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login/index"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="petDetails/index"
          component={PetDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen
          name="addNewPet/index"
          component={AddNewPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat/index"
          component={ChatScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ClerkProvider>
  );
}

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
