import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";

export default function Index() {
  const { user } = useUser();
  const navigation = useNavigation();
  // console.log(user);

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (user) {
      navigation.navigate("tabs", { screen: "home" });
    } else {
      navigation.navigate("login/index");
    }

    CheckNavigationLoaded();
  }, [user, navigation]);

  const CheckNavigationLoaded = () => {
    if (!rootNavigationState.key) {
      return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? <Redirect href={"home"} /> : <Redirect href={"./login"} />}

      <Text style={{ fontSize: 30, textAlign: "center" }}>
        Please click below button, if not Redirected
      </Text>

      <Pressable
        onPress={() => navigation.navigate("login/index")}
        style={{
          padding: 14,
          marginTop: 100,
          backgroundColor: Colors.secondary,
          width: "80%",
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
          Redirect
        </Text>
      </Pressable>
    </View>
  );
}
