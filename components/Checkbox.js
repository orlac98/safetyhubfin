import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colours from '../constants/Colours';

// Checkbox for list item so it can be ticked off when completed
const Checkbox = ({ isChecked,onChecked, ...props }) => {
    return (
        <TouchableOpacity style={styles.Checkbox} onPress={onChecked}>
            <Text style={{color: Colours.grey}}>{isChecked ? '✓' : "" }</Text>
        </TouchableOpacity>
    );
    
    }
    
    
        export default Checkbox;
        
        //styles
        const styles = StyleSheet.create({
            Checkbox :{
                width: 20,
                height: 20,
                margin: 5,
                backgroundColor: 'white',
                color: Colours.grey,
                borderWidth: 1,
                borderRadius: 3,
                borderColor: Colours.lightgrey,
                alignItems: 'center',
                justifyContent: 'center'
            }
        });