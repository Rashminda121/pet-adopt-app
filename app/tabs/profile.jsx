import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const Menu = [
    {
      id: 1,
      name: "Add new pet",
      icon: "add-circle",
      path: "addNewPet/index",
    },
    {
      id: 5,
      name: "My Posts",
      icon: "bookmark",
      path: "userPost/index",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "favourite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const onPressMenu = (menu) => {
    if (menu.path == "logout") {
      signOut();
      return;
    }
    navigation.navigate(menu.path);
  };

  return (
    // <View style={{ padding: 20, marginTop: 20 }}>
    //   <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Profile</Text>
    //   <View
    //     style={{
    //       display: "flex",
    //       alignItems: "center",
    //       marginVertical: 25,
    //     }}
    //   >
    //     <Image
    //       source={{ uri: user?.imageUrl }}
    //       style={{ width: 80, height: 80, borderRadius: 99 }}
    //     />
    //     <Text style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 6 }}>
    //       {user?.fullName}
    //     </Text>
    //     <Text
    //       style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
    //     >
    //       {user?.primaryEmailAddress?.emailAddress}
    //     </Text>
    //   </View>

    //   <FlatList
    //     data={Menu}
    //     renderItem={({ item, index }) => (
    //       <TouchableOpacity
    //         onPress={() => onPressMenu(item)}
    //         key={index}
    //         style={{
    //           marginVertical: 10,
    //           display: "flex",
    //           flexDirection: "row",
    //           alignItems: "center",
    //           gap: 10,
    //           backgroundColor: Colors.white,
    //           padding: 10,
    //           borderRadius: 10,
    //         }}
    //       >
    //         <Ionicons
    //           name={item?.icon}
    //           size={30}
    //           color={Colors.PRIMARY}
    //           style={{
    //             padding: 10,
    //             backgroundColor: Colors.light_primary,
    //             borderRadius: 8,
    //           }}
    //         />
    //         <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
    //           {item.name}
    //         </Text>
    //       </TouchableOpacity>
    //     )}
    //   />
    // </View>
    <FlatList
      data={Menu}
      ListHeaderComponent={
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
            Profile
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginVertical: 25,
            }}
          >
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 80, height: 80, borderRadius: 99 }}
            />
            <Text
              style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 6 }}
            >
              {user?.fullName}
            </Text>
            <Text
              style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
            >
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>
      }
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => onPressMenu(item)}
          key={index}
          style={{
            marginVertical: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Ionicons
            name={item?.icon}
            size={30}
            color={Colors.PRIMARY}
            style={{
              padding: 10,
              backgroundColor: Colors.light_primary,
              borderRadius: 8,
            }}
          />
          <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={{ padding: 20, marginBottom: 20 }}
    />
  );
}
