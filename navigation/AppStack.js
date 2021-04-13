import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainTabsScreen from "../screens/MainTabsScreen";
import FilePreview from "../screens/FilePreview";
import AsbestosPreview from "../screens/AsbestosPreview";
import ConstructionPreview from "../screens/ConstructionPreview";
import HeightPreview from "../screens/HeightPreview";
import Asbestos from "../screens/Asbestos";
import Quarries from "../screens/Quarries";
import Height from "../screens/Height";
import Construction from "../screens/Construction";
import TaskList from "../screens/TaskList";
import TasksScreen from "../screens/TasksScreen";
import EditList from "../screens/EditList";
import Colours from "../constants/Colours";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SafetyHub"
        component={MainTabsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#fb8856",
            fontFamily: "Comfortaa-Bold",
            fontSize: 24,
          },
          headerStyle: {
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      />

      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Comfortaa-Bold",
              fontSize: 24,
            },
          };
        }}
      />
      
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "create new list",
            headerStyle: {
              backgroundColor: route.params.color || Colours.grey,
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Comfortaa-Bold",
              fontSize: 24,
            },
          };
        }}
      />
      <Stack.Screen name="FilePreview" component={FilePreview} />
      <Stack.Screen name="AsbestosPreview" component={AsbestosPreview} />
      <Stack.Screen name="Construction" component={Construction} />
      <Stack.Screen name="Asbestos" component={Asbestos} />
      <Stack.Screen name="Height" component={Height} />
      <Stack.Screen name="Quarries" component={Quarries} />
      <Stack.Screen name="ConstructionPreview" component={ConstructionPreview} />
      <Stack.Screen name="HeightPreview" component={HeightPreview} />
     
    </Stack.Navigator>
  );
};

export default AppStack;
