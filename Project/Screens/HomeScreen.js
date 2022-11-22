import * as React from "react";
import { Button, Text, View, StyleSheet, Image } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>ROI Staff Directory App</Text>
      <Button
        onPress={(e) => navigation.navigate("Directory")}
        color={"#941a1d"}
        title={"Enter"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  logo: {
    width: 421,
    height: 219,
  },
});
