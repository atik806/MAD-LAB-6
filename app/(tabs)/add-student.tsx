import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AddStudentForm from "../../components/add-student-form";

export default function AddStudentScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <AddStudentForm />
      </View>
    </SafeAreaView>
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
