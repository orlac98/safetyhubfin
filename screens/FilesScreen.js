import React, { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { FAB } from "react-native-paper";
import CardView from "react-native-cardview";
import Colours from "../constants/Colours";
import { Constants } from 'expo';
import { Text, View, Icon, Container, Content, Button } from "native-base";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import firebaseSetup from "../database/firebaseDb";

import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";
import { TouchableOpacity } from "react-native-gesture-handler";

const FilesScreen = (props) => {

  const { storage, database } = firebaseSetup();
  const [filesList, setFilesList] = React.useState([]);
  const [formsList, setFormsList] = React.useState([]);
  const [formsListC, setFormsListC] = React.useState([]);
  const [formsListH, setFormsListH] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(0);

  const { user } = useContext(AuthContext);
  const { firestore, auth } = firebaseSetup();

  //we can choose all types of files here
  async function chooseFile() {
    // Pick a single file
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const path = await normalizePath(file.uri);
      const result = await RNFetchBlob.fs.readFile(path, "base64");
      uploadFileToFirebaseStorage(result, file, user);
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  // we have to remove prefix from path url
  async function normalizePath(path) {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const filePrefix = "file://";
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  }
  // connecting to database collections to pull data from there and upload the documents from phone to collection files
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

  async function uploadFileToFirebaseStorage(result, file) {
    const uploadTask = storage()
      .ref(`allFiles/${file.name}`)
      .putString(result, "base64", { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            break;
          case storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      function (error) {
        console.log(error);
        // Handle unsuccessful uploads
      },
      function () {
        // Handle successful uploads on complete

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          //saveFileToRealtimeDatabase(downloadURL, file);
          saveData(downloadURL, file);
        });
      }
    );
  }

  function saveData(downloadURL, file) {
    let fileName = file.name;
    let fileType = file.type;
    let fileURL = downloadURL;
    let data = { fileName, fileType, fileURL };
    addDoc(toDoItemsRef, data);
  }
  const uniquKey = database().ref().child(`allFiles`).push().key;

  // function saveFileToRealtimeDatabase(downloadURL, file) {
  //   // const uniquKey = database().ref().push().key;
  //   database().ref(`allFiles/${user.uid}/${uniquKey}`).update({
  //     fileName: file.name,
  //     fileType: file.type,
  //     fileURL: downloadURL,
  //     // userId: `${user.uid}`,
  //   });
  // }

  // const deleteFile = () => {
  //   database()
  //     .ref(`allFiles/${user.uid}`)
  //     .remove()
  //     .then(() => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  React.useEffect(() => {
    onSnapshot(
      toDoItemsRef,
      (newToDoItems) => {
        setFilesList(newToDoItems);
      },
      {
        sort: (a, b) => {
          if (a.isChecked && !b.isChecked) {
            return 1;
          }
          if (b.isChecked && !a.isChecked) {
            return -1;
          }
          return 0;
        },
      }
    );
  }, []);

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


  const tabButton = (tab, title) => {
    return (
    
       <View style={{ width: "25%" }}>
      
        <TouchableOpacity
          onPress={() => {
            setTabIndex(tab);
          }}
        >
          <Text
            style={{
              color: tabIndex == tab ? "#fb8856" : "#000",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "700",
              marginTop: 0,
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: tabIndex == tab ? "#fb8856" : "transparent",
            borderBottomWidth: 3,
            marginTop: 15,
            width: "80%",
            alignSelf: "center",
          }}
        />
        
      </View>
      
    );
  };

  return (
    <Container>
      <Content>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          }} 
        >
        
          {tabButton(0, "Documents")}
          {tabButton(1, "Asbestos")}
          {tabButton(2, "Construction")}
          {tabButton(3, "Height")}

          </View>
        {tabIndex == 0 &&
          filesList.map((item, index) => (
            <View style={styles.row}>
              <CardView
                cardElevation={7}
                cardMaxElevation={7}
                cornerRadius={20}
                style={[styles.card, { width: "70%" }]}
                key={index}
              >
                <Text
                  style={styles.text}
                  onPress={() =>
                    props.navigation.navigate("FilePreview", {
                      fileData: item,
                    })
                  }
                >
                  {item.fileName}
                </Text>
                <Button
                  style={styles.icon}
                  transparent
                  onPress={() => {
                    removeDoc(toDoItemsRef, item.id);
                  }}
                >
                  <Icon style={styles.icon} active name="trash" />
                </Button>
              </CardView>
              
            </View>
            
          ))}
         
        {tabIndex == 1 &&
          formsList.map((item, index) => (
            <View style={styles.row}>
              <CardView
                cardElevation={7}
                cardMaxElevation={7}
                cornerRadius={20}
                style={[
                  styles.card,
                  {
                    width: "70%",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  },
                ]}
                key={index}
              >
                <Text
                  style={styles.text}
                  onPress={() =>
                    props.navigation.navigate("AsbestosPreview", {
                      formData: item,
                    })
                  }
                >
                  {`Asbestos ${index}`}
                </Text>
                <Button
                  style={styles.icon}
                  transparent
                  onPress={() => {
                    removeDoc(formRef, item.id);
                  }}
                >
                  <Icon style={styles.icon} active name="trash" />
                </Button>
              </CardView>
            </View>
          ))}
           {tabIndex == 2 &&
          formsListC.map((item, index) => (
            <View style={styles.row}>
              <CardView
                cardElevation={7}
                cardMaxElevation={7}
                cornerRadius={20}
                style={[
                  styles.card,
                  {
                    width: "70%",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  },
                ]}
                key={index}
              >
                <Text
                  style={styles.text}
                  onPress={() =>
                    props.navigation.navigate("ConstructionPreview", {
                      formData: item,
                    })
                  }
                >
                  {`Construction ${index}`}
                </Text>
                <Button
                  style={styles.icon}
                  transparent
                  onPress={() => {
                    removeDoc(formRefC, item.id);
                  }}
                >
                  <Icon style={styles.icon} active name="trash" />
                </Button>
              </CardView>
            </View>
          ))}
          {tabIndex == 3 &&
          formsListH.map((item, index) => (
            <View style={styles.row}>
              <CardView
                cardElevation={7}
                cardMaxElevation={7}
                cornerRadius={20}
                style={[
                  styles.card,
                  {
                    width: "70%",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                  },
                ]}
                key={index}
              >
                <Text
                  style={styles.text}
                  onPress={() =>
                    props.navigation.navigate("HeightPreview", {
                      formData: item,
                    })
                  }
                >
                  {`Height ${index}`}
                </Text>
                <Button
                  style={styles.icon}
                  transparent
                  onPress={() => {
                    removeDoc(formRefH, item.id);
                  }}
                >
                  <Icon style={styles.icon} active name="trash" />
                </Button>
              </CardView>
            </View>
          ))}
          
      </Content>
      <View>
        <FAB style={styles.fab} large icon="plus" onPress={chooseFile} />
      </View>
     
    </Container>
  );
};
export default FilesScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: Colours.orange,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: Colours.lightgrey,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",

    width: 150,
    marginTop: 30,
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    color: Colours.red,

    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    color: Colours.white,
    fontFamily: "Comfortaa-Bold",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "center",
  },
});
