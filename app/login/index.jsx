import { View, Image, Text, Pressable, ScrollView, Alert } from "react-native";
import React, { useCallback } from "react";
import Colors from "@/constants/Colors";

import { useNavigation } from "@react-navigation/native";
import { useOAuth, useSession } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn } = useSession(); // Check if the user is signed in

  const onPress = useCallback(async () => {
    if (isSignedIn) {
      // If the user is already signed in, navigate directly to /home
      navigation.navigate("./home");
      return;
    }

    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("./home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        navigation.navigate("./home");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      // Check for session_exists error and handle it
      if (err.clerkError && err.errors?.[0]?.code === "session_exists") {
        console.log("Session already exists, navigating to home.");
        navigation.navigate("./home");
      } else {
        console.error("OAuth error:", err);
        Alert.alert(
          "Authentication Error",
          "An error occurred during OAuth. Please try again later."
        );

        if (__DEV__) {
          Alert.alert("Detailed Error", JSON.stringify(err));
        }
      }
    }
  }, [isSignedIn]);

  return (
    <ScrollView>
      <View style={{ backgroundColor: Colors.white, height: "100% " }}>
        <Image
          source={require("./../../assets/images/login.png")}
          style={{ width: "100%", height: 400, marginTop: 70 }}
        />
        <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            Ready to make a new friend?
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 22,
              textAlign: "center",
              color: Colors.GRAY,
            }}
          >
            Let's adopt a pet you like and make your life happier!
          </Text>

          <Pressable
            onPress={onPress}
            style={{
              padding: 14,
              marginTop: 100,
              backgroundColor: Colors.PRIMARY,
              width: "100%",
              borderRadius: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
