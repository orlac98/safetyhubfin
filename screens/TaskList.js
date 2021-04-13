import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Colours from "../constants/Colours";
import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";
import { FAB } from "react-native-paper";
import ToDoItem from "../components/ToDoItem";
import firebaseSetup from "../database/firebaseDb";

const TaskList = ({ route }) => {
  let [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState();
  const { firestore, auth } = firebaseSetup();

  const toDoItemsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.id)
    .collection("todoItems");

  useEffect(() => {
    onSnapshot(
      toDoItemsRef,
      (newToDoItems) => {
        setToDoItems(newToDoItems);
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
  const addItemToLists = () => {
    setNewItem({ text: "", isChecked: false, new: true });
  };

  const RenderAddListIcon = ({ addItemToLists }) => {
    return (
      <View style={styles.container}>
        <FAB
          key={toDoItems.id}
          style={styles.fab}
          large
          icon="plus"
          onPress={() => addItemToLists()}
        />
      </View>
    );
  };

  const removeItemFromLists = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  if (newItem) {
    toDoItems = [newItem, ...toDoItems];
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({
          item: { id, text, isChecked, onChecked, ...params },
          index,
        }) => {
          return (
            <ToDoItem
              key={id}
              {...params}
              text={text}
              isChecked={isChecked}
              onChecked={() => {
                let data = { text, isChecked: !isChecked };
                if (id) {
                  data.id = id;
                }
                addDoc(toDoItemsRef, data);
              }}
              onChangeText={(newText) => {
                if (params.new) {
                  setNewItem({
                    text: newText,
                    isChecked,
                    new: params.new,
                  });
                } else {
                  toDoItems[index].text = newText;
                  setToDoItems([...toDoItems]);
                }
              }}
              onDelete={() => {
                params.new ? setNewItem(null) : removeItemFromLists(index);
                id && removeDoc(toDoItemsRef, id);
              }}
              onBlur={() => {
                if (text.length > 1) {
                  let data = { text, isChecked };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(toDoItemsRef, data);
                  params.new && setNewItem(null);
                } else {
                  params.new ? setNewItem(null) : removeItemFromLists(index);
                }
              }}
            />
          );
        }}
      />
      <RenderAddListIcon addItemToLists={addItemToLists} />
    </View>
  );
};
export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    color: Colours.red,
  },
});
