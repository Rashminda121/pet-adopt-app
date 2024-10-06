import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function AddNewPet() {
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
  });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedcategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    GetCategories();
  }, []);

  // console.log(categoryList);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  //   get category data

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  // used to get images from gallery

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    // console.log(formData);
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter all Details.", ToastAndroid.SHORT);
      return;
    }

    if (image) {
      UploadImage();
    } else {
      ToastAndroid.show(
        "Image is Missing, Please add an Image",
        ToastAndroid.SHORT
      );
    }
  };

  // used to upload the image

  const UploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storagRef = ref(storage, "/pets/" + Date.now() + ".jpg");

    uploadBytes(storagRef, blobImage)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storagRef).then(async (downloadUrl) => {
          // console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("home");
  };

  return (
    <View style={{ marginTop: 40, padding: 20 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
          Add New Pet for Adoption
        </Text>
        <Pressable onPress={imagePicker}>
          {!image ? (
            <Image
              source={require("@/assets/images/paw.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 10,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 10,
              }}
            />
          )}
        </Pressable>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Category *</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedcategory(itemValue);
              handleInputChange("category", itemValue);
            }}
          >
            {categoryList.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Breed *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("breed", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("age", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender *</Text>
          <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleInputChange("sex", itemValue);
            }}
          >
            <Picker.Item label="Select" value="none" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("weight", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>About *</Text>
          <TextInput
            style={styles.input}
            numberOfLines={5}
            multiline={true}
            onChangeText={(value) => handleInputChange("about", value)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={loader}
          onPress={onSubmit}
        >
          {loader ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 7,
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginBottom: 50,
  },
});
