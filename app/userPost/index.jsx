import PetListItem from "@/components/Home/PetListItem";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function UserPost() {
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserPost();
  }, [user]);

  // used to get user post

  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    try {
      const q = query(
        collection(db, "Pets"),
        where("email", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUserPostList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const onDeletePost = (docId) => {
    Alert.alert(
      "Do you want to delete?",
      "Do you really want to delete tis post",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        User Post
      </Text>
      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pets={item} key={index} />
            <Pressable
              onPress={() => onDeletePost(item?.id)}
              style={styles.deleteButton}
            >
              <Text style={{ fontFamily: "outfit", textAlign: "center" }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
      {userPostList?.length == 0 && (
        <Text
          style={{
            marginTop: 20,
            fontFamily: "outfit",
            fontSize: 22,
          }}
        >
          No Posts Found
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.light_red,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 10,
  },
});
