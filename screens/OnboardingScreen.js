import 'react-native-gesture-handler';
import React from 'react';
import {  Text,  Image, StyleSheet, TouchableOpacity } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';




const Skip = ({ ...props}) =>(
    <TouchableOpacity
    style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);
const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);





const OnBoardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
     
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
            pages={[
             {
               
                image: <Image source={require('../assets/Tasks.png')} resizeMode="center" style={{ width: 680, height: 800 }} />,
              
             },
             {
                
                image: <Image source={require('../assets/forms.png')} resizeMode="center" style={{ width: 700, height: 800 }} />,
          
             },
             {
               
                image: <Image source={require('../assets/saved.png')} resizeMode="center" style={{ width: 700, height: 800 }} />,
               
             },
            ]}
            />
    );
    };


export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
       
      },
    });

