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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Directory" component={EmployeeDirectory} />
        <Stack.Screen name="Employee" component={InspectEmployee} />
        <Stack.Screen name="Modify" component={ModifyEmployee} />
        <Stack.Screen name="Add" component={AddEmployee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
