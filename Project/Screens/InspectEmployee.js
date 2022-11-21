import * as React from "react";
import { Text, Button, View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export function InspectEmployee({ navigation }) {
  //takes employee json object passed to it and stores it as a constant
  const route = useRoute();
  const employeeDetails = route.params.array;

  //change this value when ip of localhost changes, or when deploying on server
  const ip = "http://192.168.20.10:3000";

  const deletePerson = async (employeeDetails) => {
    const response = await fetch(ip + "/delete_person", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    });
  };

  return (
    //creates list of text fields displaying employee details
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titleText}>ROI Staff Member Details</Text>
        <Text style={styles.normalText}>
          To modify staff details, press the Modify button at the bottom of the
          page.
        </Text>
        <View style={styles.detailsContainer}>
          <Button
            //This button navigates to the Modify Employee screen and passes the json object with all of the employees details
            onPress={() =>
              navigation.navigate("Modify", { array: employeeDetails })
            }
            color={"#941a1d"}
            title={"Modify"}
          />
          <Button
            onPress={() => navigation.navigate("Directory")}
            color={"#941a1d"}
            title={"Back to Directory"}
          />

          <Text style={styles.normalText}>Name: {employeeDetails["Name"]}</Text>
          <Text style={styles.normalText}>
            Department: {employeeDetails["Department"]}
          </Text>
          <Text style={styles.normalText}>
            Phone Number: {employeeDetails["Phone"]}
          </Text>
          <Text style={styles.normalText}>
            Street Address: {employeeDetails["Street"]}
          </Text>
          <Text style={styles.normalText}>City: {employeeDetails["City"]}</Text>
          <Text style={styles.normalText}>
            State: {employeeDetails["State"]}
          </Text>
          <Text style={styles.normalText}>
            Postcode: {employeeDetails["ZIP"]}
          </Text>
          <Text style={styles.normalText}>
            Country: {employeeDetails["Country"]}
          </Text>
          <Button
            onPress={async () => {
              await deletePerson(employeeDetails);
              navigation.navigate("Directory");
            }}
            color={"#941a1d"}
            title={"Delete Employee"}
            margin={5}
          />
        </View>
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

  detailsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
