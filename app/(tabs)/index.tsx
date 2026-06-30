import AddStudentForm from "../../components/add-student-form";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-detail";
import StudentItem from "@/components/student-item";
import { Student, STUDENTS } from "@/data/students";
import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View, FlatList } from "react-native";

export default function HomePage() {
    const [query, setQuery] = useState<string>("");

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const [students, setStudents] = useState<Student[]>(STUDENTS);
    const [showForm, setShowForm] = useState(false);

    const handleNewStudent = (newStudent: Student) => {
        // Lifting state up in action: the form hands the new
        // student back to this parent screen, which prepends
        // it to the list.
        setStudents((prev) => [newStudent, ...prev]);
        setShowForm(false);
    };

    if (showForm) {
        return <AddStudentForm onSubmitSuccess={handleNewStudent} />;
    }

    const filtered = STUDENTS.filter((s) => {
        return s.name.toLowerCase().includes(query.toLowerCase()) || s.department.toLowerCase().includes(query.toLowerCase());
    });

    const handleSelect = (student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    };

    return (
        <View style={styles.container}>
            {/* NEW: Add a page title for the student list */}
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                <Pressable onPress={() => setShowForm(true)}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>+ Add</Text>
                </Pressable>
            </View>

            <SearchBar value={query} onChangeText={setQuery}></SearchBar>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No students match "{query}"</Text>
                    </View>
                }
            ></FlatList>

            {selectedStudent && <StudentDetail student={selectedStudent}></StudentDetail>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
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
    // NEW: styles for the title bar
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    count: {
        fontSize: 12,
        color: "#CCFBF1",
    },
    empty: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#94A3B8",
    },
});
