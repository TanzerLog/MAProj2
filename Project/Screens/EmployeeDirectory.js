import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export function EmployeeDirectory({ navigation }) {
  const isFocused = useIsFocused();
  const [bank, setBank] = useState([]);

  //change this value when ip of localhost changes, or when deploying on server
  const ip = "http://192.168.20.10:3000";

  //sends request to database for the entire People table and stores response as a JSON object
  //sends a new request every time this screen is displayed to ensure rendered data is up to date
  useEffect(() => {
    fetch(ip + "/get_all_people").then(async (res) => {
      setBank(await res.json());
    });
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ROI Staff Directory</Text>
        <Text style={styles.normalText}>
          Select a Staff Member below to inspect/modify their details, or add a
          new Staff Member.
        </Text>
        <View style={{ margin: 5 }}>
          <Button
            onPress={() => navigation.navigate("Add")}
            color={"#941a1d"}
            title={"Add Employee"}
          ></Button>
        </View>
      </View>
      <ScrollView>
        <View style={styles.staffContainer}>
          {bank.map((x, i) => {
            //function generates list of employee names that when pressed pass that employees specific details to the Inspect Employee screen
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Employee", { array: x })}
                style={styles.staffItem}
                key={i}
              >
                <Text style={styles.entryText}>{x["Name"]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    scrollEnabled: true,
  },

  titleText: {
    color: "#262626",
    fontSize: 30,
    fontWeight: "bold",
  },

  normalText: {
    color: "#262626",
    fontSize: 16,
  },

  entryText: {
    color: "#262626",
    fontSize: 18,
    fontWeight: "bold",
  },

  smallText: {
    color: "#262626",
    fontSize: 12,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottomPadding: 10,
  },

  staffContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  staffItem: {
    height: 50,
    width: 150,
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 6,
    borderColor: "#941a1d",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c64c38",
    margin: 5,
  },
});
