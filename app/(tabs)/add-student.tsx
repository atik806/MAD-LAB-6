import * as Location from "expo-location";
import React from "react";
import { Button, StyleSheet, Text } from "react-native";


export default function AddStudentScreen() {

  const [city, setCity] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const fetchLocation = async () => {
    setLoading(true);
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLoading(false);
      return;
    }
    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const result = await Location.reverseGeocodeAsync(
      {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }
    );
    setCity(result[0]?.city ?? "Unknown");
    setLoading(false);

  }



  return (
    <>
      <Button
        title={loading? "Fetching Location..." : "Fetch Location"}
        onPress={fetchLocation}
        disabled={loading}
      />
      {city && <Text>Detected City: {city}</Text>}
    </>
    
  );
}

export const screen = {
  name: "add-student",
  options: {
    title: "Add Student",
    href: null,
    headerShown: true,
    headerTitle: "Join the Directory",
    headerStyle: { backgroundColor: "#0D1F4E" },
    headerTintColor: "#FFFFFF",
  },
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
});
