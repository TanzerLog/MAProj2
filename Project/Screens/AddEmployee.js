import * as React from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

export function AddEmployee({ navigation }) {
  const [bank, setBank] = useState([]);

  //change this value when ip of localhost changes, or when deploying on server
  const ip = "http://192.168.20.10:3000";

  //retrieves department table from database
  useEffect(() => {
    fetch(ip + "/get_all_departments").then(async (res) => {
      setBank(await res.json());
    });
  }, []);

  let newArray = bank.map((item) => {
    return { key: item["DepartmentID"], value: item["Name"] };
  });
  const data = newArray;

  const [name, onChangeName] = useState("");
  const [phone, onChangePhone] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [street, onChangeStreet] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [zip, onChangeZIP] = useState("");
  const [country, onChangeCountry] = useState("");

  const addPerson = async (employeeDetails) => {
    const response = await fetch(ip + "/add_person", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    });
  };

  let employeeDetails = {
    ["Name"]: null,
    ["Phone"]: null,
    ["DepartmentID"]: null,
    ["Street"]: null,
    ["City"]: null,
    ["State"]: null,
    ["ZIP"]: null,
    ["Country"]: null,
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Add Employee</Text>
        <View>
          <Text style={styles.smallText}>Name:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            onChangeText={onChangeName}
            value={name}
          ></TextInput>
          <Text style={styles.smallText}>Phone Number:</Text>
          <TextInput
            maxLength={30}
            style={styles.textInput}
            onChangeText={onChangePhone}
            value={phone}
          ></TextInput>
          <Text style={styles.smallText}>Department:</Text>
          <SelectList
            setSelected={(val) => setSelectedDepartment(val)}
            data={data}
            save="key"
          />
          <Text style={styles.smallText}>Street Address:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            onChangeText={onChangeStreet}
            value={street}
          ></TextInput>
          <Text style={styles.smallText}>City:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            onChangeText={onChangeCity}
            value={city}
          ></TextInput>
          <Text style={styles.smallText}>State:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={3}
            onChangeText={onChangeState}
            value={state}
          ></TextInput>
          <Text style={styles.smallText}>Postcode:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={4}
            onChangeText={onChangeZIP}
            value={zip}
          ></TextInput>
          <Text style={styles.smallText}>Country:</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            onChangeText={onChangeCountry}
            value={country}
          ></TextInput>
        </View>
        <Button
          onPress={async () => {
            employeeDetails["Name"] = name;
            employeeDetails["Phone"] = phone;
            employeeDetails["DepartmentID"] = selectedDepartment;
            employeeDetails["Street"] = street;
            employeeDetails["City"] = city;
            employeeDetails["State"] = state;
            employeeDetails["ZIP"] = zip;
            employeeDetails["Country"] = country;
            await addPerson(employeeDetails);
            navigation.navigate("Directory");
          }}
          color={"#941a1d"}
          title={"Add"}
        />
        <Button
          onPress={() => navigation.navigate("Directory")}
          color={"#941a1d"}
          title={"Back to Directory"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    scrollEnabled: true,
  },
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#262626",
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
  },
  smallText: {
    color: "#262626",
    fontSize: 12,
  },
});

// const response = await fetch("https://reqbin.com/echo/post/json", {
// method: 'POST',
// headers: {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// },
// body: `{
//    "Id": 78912,
//    "Customer": "Jason Sweet",
//    "Quantity": 1,
//    "Price": 18.00
//   }`,
// });

// response.json().then(data => {
//   console.log(data);
// });
