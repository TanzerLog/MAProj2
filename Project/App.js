import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { EmployeeDirectory } from "./Screens/EmployeeDirectory.js";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { InspectEmployee } from "./Screens/InspectEmployee.js";
import { ModifyEmployee } from "./Screens/ModifyEmployee.js";
import { AddEmployee } from "./Screens/AddEmployee.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Directory"
          component={EmployeeDirectory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Employee"
          component={InspectEmployee}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Modify"
          component={ModifyEmployee}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddEmployee}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
