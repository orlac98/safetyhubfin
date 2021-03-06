import React, { useContext, useState , useEffect} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colours from "../constants/Colours";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {  Title, Caption } from "react-native-paper";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import firebaseSetup from "../database/firebaseDb";

import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";


const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const { firestore, auth } = firebaseSetup();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + "/" + month + "/" + year + " " + hours + ":" + min);
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };




  const { user, logout } = useContext(AuthContext);
  const [filesList, setFilesList] = React.useState([]);
  const [formsList, setFormsList] = React.useState([]);
  const [formsListC, setFormsListC] = React.useState([]);
  const [formsListH, setFormsListH] = React.useState([]);
  const [email, setEmail] = React.useState("");

// connecting to firebase to display amount of files/forms uploaded
  const toDoItemsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("files");

  const formRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("asbestos");

    const formRefC = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("construction");

    const formRefH = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("height");

  React.useEffect(() => {
    onSnapshot(toDoItemsRef, (newToDoItems) => {
      setFilesList(newToDoItems);
    });
  }, []);

  console.log(loading);

  React.useEffect(() => {
    onSnapshot(formRef, (newToDoItems) => {
    
      setFormsList(newToDoItems);
    });
  }, []);


  React.useEffect(() => {
    onSnapshot(formRefC, (newToDoItems) => {
   
      setFormsListC(newToDoItems);
    });
  }, []);

  React.useEffect(() => {
    onSnapshot(formRefH, (newToDoItems) => {
      setFormsListH(newToDoItems);
    });
  }, []);

  return (
    <View style={styles.userInfoSection} style={styles.container}>
      <View
        style={{
          lineHeight: 26,
          flexDirection: "row",
          textAlign: 'center'
        }}
      >
        
        <View style={styles.container}>
          <Title
            style={[
              styles.title,
              {
                marginTop: 15,
                marginBottom: 5,
                color: Colours.grey,
                fontFamily: "Comfortaa-Bold",
              },
            ]}
          >
            { user.email ? user.email : "@Welcome"}
          </Title>
          {/* <View style={styles.container}> */}
        <Text style={[styles.text, { alignSelf: "center" }]}>
          {currentDate}
        </Text>
      {/* </View> */}
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>{filesList ? filesList.length : 0}</Title>
          <Caption>Files Uploaded</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{formsList ? formsList.length : 0}</Title>

          <Caption>Asbestos Uploaded</Caption>
        </View>
      </View>
<View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>{formsListC ? formsListC.length : 0}</Title>
          <Caption>Construction Uploaded</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{formsListH ? formsListH.length : 0}</Title>

          <Caption>Height Uploaded</Caption>
        </View>
      </View>

      
      <FormButton buttonTitle="Calendar" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

     

      <View style={styles.container}>
        <FormButton buttonTitle="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 10,
    marginBottom: 25,
    lineHeight: 26,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 6,
    lineHeight: 26,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginTop: 15,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 26,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    lineHeight: 26,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",

  },
});
