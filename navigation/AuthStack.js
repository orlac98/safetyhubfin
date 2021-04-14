import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import MainTabsScreen from "../screens/MainTabsScreen";
import FormsScreen from "../screens/FormsScreen";
import FilesScreen from "../screens/FilesScreen";
import ConstructionPreview from '../screens/ConstructionPreview';
import TaskList from '../screens/TaskList';
import EditList from '../screens/EditList';
import TasksScreen from '../screens/TasksScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true"); 
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); 

    // GoogleSignin.configure({
    //   webClientId:
    //     "1002480327063-aophnq4itar2toef00qaa5e34ismqkc0.apps.googleusercontent.com",
    // });
  }, []);
//if app is launching for first time onboarding screens will show
//if app has launched already it will go straight to login screen 
  if (isFirstLaunch === null) {
    return null; 
   } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />

      
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: "#2c3641",
            shadowColor: "#2c3641",
            elevation: 0,
          },

          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <AntDesign.Button
                name="arrowleft"
                size={25}
                backgroundColor="#2c3641"
                color="#fb8856"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="MainTabsScreen"
        component={MainTabsScreen}
        options={{ header: () => null }}
      />
      
          <Stack.Screen
        name="TaskList"
        component={TaskList}
        
      />
      <Stack.Screen
        name="FilesScreen"
        component={FilesScreen}
        
      />
       <Stack.Screen
        name="formScreen"
        component={FormsScreen}
        options={{ header: () => null }}
      />
       <Stack.Screen
        name="EditList"
        component={EditList}
        
      />
      <Stack.Screen
        name="FilePreview"
        component={ConstructionPreview}
        
      />
      <Stack.Screen
        name="TasksScreen"
        component={TasksScreen}
        
      />
     
   
    </Stack.Navigator>
  );
};

export default AuthStack;
