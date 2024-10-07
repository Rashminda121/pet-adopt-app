import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItems from "./../../components/inbox/userItems";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // get user list depends on current user emails
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    try {
      const q = query(
        collection(db, "Chat"),
        where(
          "userIds",
          "array-contains",
          user?.primaryEmailAddress?.emailAddress
        )
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        setUserList((prevList) => [...prevList, doc.data()]);
      });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  //filter other users

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (user) => user?.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        style={{ marginTop: 20 }}
        refreshing={loader}
        onRefresh={() => GetUserList()}
        renderItem={({ item, index }) => (
          <UserItems userInfo={item} key={index} />
        )}
      />
    </View>
  );
}
