import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const route = useRoute();
  const { id } = route.params;
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    //fetching new messages
    const unSubscribe = onSnapshot(
      collection(db, "Chat", id, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(), // Convert Firestore timestamp to Date object
        }));
        setMessages(messageData);
      }
    );
    // return () => unSubscribe();

    const intervalId = setInterval(() => {
      unSubscribe();
    }, 10000); // 10 seconds in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    // console.log(result);

    const otherUser = result?.users.filter(
      (item) => item.email != user?.primaryEmailAddress?.emailAddress
    );
    // console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessage) => {
    // newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");
    setMessages((prevoiusMessage) =>
      GiftedChat.append(newMessage, prevoiusMessage)
    );

    await addDoc(collection(db, "Chat", id, "Messages"), newMessage[0]);
  };

  return (
    <GiftedChat
      messages={messages.reverse()}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
