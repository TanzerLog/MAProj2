import * as React from "react";
import { Button, Text, View } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ROI Staff Directory App</Text>
      <Button
        onPress={(e) => navigation.navigate("Directory")}
        color={"#941a1d"}
        title={"Enter"}
      />
    </View>
  );
}
