import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colours from "../constants/Colours";
import ColourSelector from '../components/ColourSelector';

const EditList = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || " ");
  const [color, setColor] = useState(route.params.color || Colours.grey);
  const [isValid, setValidity] = useState(true);
  const colorList = [
      'red',
      'darkgrey',
      'orange',
      'lightgrey',
      'grey'
  ]

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>List name</Text>
          {!isValid && (
            <Text style={{ marginLeft: 4, color: Colours.red, fontSize: 12 }}>
              * List Name Cannot Be Empty
            </Text>
          )}
        </View>

        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValidity(true);
          }}
          placeholder={"New list name"}
          maxLength={100}
          style={styles.input}
        />
         <Text style={styles.label}>Choose Colour</Text>
         <ColourSelector
         onSelect={(color) => {
            setColor(color);
            navigation.dispatch(CommonActions.setParams({color: color}))
         }}
         selectedColour={color}
         colorOptions={colorList}
         />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setValidity(false);
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   flexDirection: "row",
    justifyContent: "space-between",
    //   alignItems: "center",
    padding: 5,
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
    height: 30,
    fontSize: 24,
  },
  text: {
    padding: 3,
    fontSize: 16,
    fontFamily: "Comfortaa-Bold",
    color: Colours.black,
  },
  label: {
    color: Colours.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colours.darkgrey,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
