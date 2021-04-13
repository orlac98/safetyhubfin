import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colours from "../constants/Colours";
import Checkbox from "../components/Checkbox";
import { Octicons } from '@expo/vector-icons';

//
const ToDoItem = ({
   text,
    isChecked,
     onChecked,
      onChangeText ,
      isEditMode,
      setEditMode,
       onDelete, ...props }) => {
  

  const EditableText = ({isChecked,onChecked,
     onChangeText,
      text ,...props}) => {
    const [isEditMode, setEditMode] = useState(props.new);

    return (
      <TouchableOpacity style={{ flex: 1 }}
       onPress={() => !isChecked && setEditMode(true)}>

        {isEditMode ? (
          <TextInput
            underlineColorAndroid={"transparent"}
            selectionColor={"transparent"}
            autoFocus={true}
            value={text}
            onChangeText={onChangeText}
            placeholder={"Add new item here"}
            onSubmitEditing={() => {}}
            maxLength={100}
            style={styles.input}
            onBlur={() => {
              props.onBlur && props.onBlur();
              setEditMode(false)
            }}
          />
        ) : (
          <Text
            style={[
              styles.text,
              { color: isChecked ? Colours.lightgrey : Colours.black,
              textDecorationLine: isChecked ? 'line-through' : 'none' }
            ]}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View styles={{ flexDirection: "row", flex: 1 }}>
        <Checkbox isChecked={isChecked} onChecked={onChecked} />
      </View>
      <EditableText 
         text={text} 
         onChangeText={onChangeText}
         isChecked={isChecked} 
         {...props}
         isEditMode={isEditMode}
         setEditMode={setEditMode}
         />
         <TouchableOpacity onPress={onDelete}>
         <Octicons name="trashcan" size={24} color="red" style={styles.icon} />
       
         </TouchableOpacity>
    </View>
    
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  input: {
    color: Colours.grey,
    borderBottomColor: Colours.lightgrey,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 25,
    fontSize: 16,
  },
  text: {
    padding: 3,
    fontSize: 16,
    fontFamily: "Comfortaa-Bold",
    color: Colours.black,
  },
});
