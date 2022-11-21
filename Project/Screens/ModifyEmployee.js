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

export function ModifyEmployee({ navigation }) {
  const route = useRoute();
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

  //establishes states for all modifiable employee properties
  const employeeDetails = route.params.array;
  const [name, onChangeName] = useState(employeeDetails["Name"]);
  const [phone, onChangePhone] = useState(employeeDetails["Phone"]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    employeeDetails["DepartmentID"]
  );
  const [street, onChangeStreet] = useState(employeeDetails["Street"]);
  const [city, onChangeCity] = useState(employeeDetails["City"]);
  const [state, onChangeState] = useState(employeeDetails["State"]);
  const [zip, onChangeZIP] = useState(employeeDetails["ZIP"]);
  const [country, onChangeCountry] = useState(employeeDetails["Country"]);

  const modifyPerson = async (employeeDetails) => {
    const response = await fetch(ip + "/modify_person", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Modify {employeeDetails["Name"]}</Text>
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
            style={styles.textInput}
            maxLength={30}
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
            if (
              employeeDetails["Name"] == name &&
              employeeDetails["Phone"] == phone &&
              employeeDetails["DepartmentID"] == selectedDepartment &&
              employeeDetails["Street"] == street &&
              employeeDetails["City"] == city &&
              employeeDetails["State"] == state &&
              employeeDetails["ZIP"] == zip &&
              employeeDetails["Country"] == country
            ) {
              //put in an alert here
              console.log("No change");
            } else {
              employeeDetails["Name"] = name;
              employeeDetails["Phone"] = phone;
              employeeDetails["DepartmentID"] = selectedDepartment;
              employeeDetails["Street"] = street;
              employeeDetails["City"] = city;
              employeeDetails["State"] = state;
              employeeDetails["ZIP"] = zip;
              employeeDetails["Country"] = country;
              await modifyPerson(employeeDetails);
              navigation.navigate("Employee", { array: employeeDetails });
            }
          }}
          color={"#941a1d"}
          title={"Save Changes"}
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
