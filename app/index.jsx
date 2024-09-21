import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

      <Link href={"./login"}>
        <Text style={{ fontSize: 35, textAlign: "center" }}>
          Please click here, if not Redirected
        </Text>
      </Link>
    </View>
  );
}
