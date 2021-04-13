import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colours from "../constants/Colours";

const ColourSelector = ({ selectedColour, colorOptions, onSelect }) => {
 
  //colour options for task editor using colour array in constants/colours
  const ColourButton = ({ onPress, isSelected, color }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.ColourButton,
          { borderWidth: isSelected ? 3 : 0, backgroundColor: color },
        ]}
      />
    );
  };
  return (
    <View style={styles.container}>
      {colorOptions.map((colorName) => {
          return(
            <ColourButton
            onPress={() => onSelect(Colours[colorName])}
            color={Colours[colorName]}
            isSelected={Colours [colorName] == selectedColour}
          />
          );
       
      })}
    </View>
  );
};

export default ColourSelector;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  ColourButton: {
    height: 32,
    width: 32,
    borderColor: Colours.grey,
    borderRadius: 24,
    margin: 10,
  },
});
