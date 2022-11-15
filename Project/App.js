import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { EmployeeDirectory } from "./Screens/EmployeeDirectory.js";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

function App() {
  const [bank, setBank] = useState([]);

  useEffect(() => {
    fetch("http://192.168.20.12:3000/get_all_people").then(async (res) => {
      setBank(await res.json());
      console.log(await res.json());
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Directory" component={EmployeeDirectory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
