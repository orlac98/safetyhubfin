import  React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//icon fonts

import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import ProfileScreen from './ProfileScreen';
import TasksScreen from './TasksScreen';
import FilesScreen from './FilesScreen';
import FormsScreen from './FormsScreen';



const Tab = createBottomTabNavigator();

const MainTabsScreen = () => {
  return (
  <Tab.Navigator
  tabBarOptions = {{
    
    activeTintColor: '#fb8856',
    inactiveTintColor: '#45505d',
    showLabel: false,
    position: 'absolute',
    style: {
        
        height: 60,
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginHorizontal: 10,
        top:-3,
        bottom: 5,
    }
  }}
  
  >
    <Tab.Screen
      name="Tasks"
      component={TasksScreen}
      options={{
        tabBarLabel: "Tasks",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="tasks" color={color} size={23} />
        ),
      }}
    />
    <Tab.Screen
      name="Forms"
      component={FormsScreen}
      options={{
        tabBarLabel: "Forms",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="file-signature" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Files"
      component={FilesScreen}
      options={{
        tabBarLabel: "Files",
        tabBarIcon: ({ color }) => (
          <Entypo name="folder" color={color} size={25} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="user-alt" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
)
    };
export default MainTabsScreen;

