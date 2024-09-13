import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  console.log(user);

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavigationLoaded();
  }, []);

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
      {user ? (
        <Redirect href={"./(tabs)/home"} />
      ) : (
        <Redirect href={"./login"} />
      )}
      <Link href={"./login"}>
        <Text style={{ fontSize: 40 }}>Go to login Page if not redirected</Text>
      </Link>
    </View>
  );
}
