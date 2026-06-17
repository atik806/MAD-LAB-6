import StudentItem from "@/components/student-item";
import { STUDENTS } from "@/data/students";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomePage() {
    return (
        <View style={styles.container}>
            {STUDENTS.map((student) => (
                <StudentItem key={student.id} student={student} onPress={() => {}} isSelected={false} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
