import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colours from "../constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import firebaseSetup from "../database/firebaseDb";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../database/collections";

const TasksScreen = ({ navigation }) => {
  const { firestore, auth } = firebaseSetup();
  const [lists, setLists] = useState([]);

  const listsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    onSnapshot(
      listsRef,
      (newLists) => {
        setLists(newLists);
      },
      {
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        },
      }
    );
  }, []);
 
  const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: color }]}
        onPress={onPress}
      >
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onOptions}>
            <Ionicons
              name="ios-options"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Octicons
              name="trashcan"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const addItemToLists = ({ title, color }) => {
    const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listsRef, { title, color, index });
  };

  const removeItemFromLists = (id) => {
    removeDoc(listsRef, id);
  };
  const updateItemFromLists = (id, item) => {
    updateDoc(listsRef, id, item);
  };
  const RenderAddListIcon = ({ addItemToLists }) => {
    return (
      <View style={styles.container}>
        <FAB
          key={lists.id}
          style={styles.fab}
          large
          icon="plus"
          onPress={() =>
            addItemToLists({ title: "Title", color: Colours.orange })
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color, id, index } }) => {
          return (
            <ListButton
              key={id}
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("TaskList", {
                  title,
                  color,
                  id,
                });
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (newItem) =>
                    updateItemFromLists(id, { index, ...newItem }),
                });
              }}
              onDelete={() => removeItemFromLists(id)}
            />
          );
        }}
      />
      <RenderAddListIcon addItemToLists={addItemToLists} />
    </View>
  );
};
export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  itemTitle: {
    fontSize: 24,
    padding: 5,
    color: "white",
    fontFamily: "Comfortaa-Bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 5,
    fontSize: 24,
    color: "white",
  },
  CenteredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    color: Colours.red,
  },
});
