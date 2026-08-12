import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { useStudents } from "../../context/student-context";
import { Student } from "../../data/students";
import { useDebounced } from "../../hooks/use-debounce";



export default function Index() {
  const { students } = useStudents();
  const searchRef = React.useRef<TextInput>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      searchRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const DEBOUNCE_DELAY = 300;
  const debouncedQuery = useDebounced(query, DEBOUNCE_DELAY);
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleSelect = useCallback((student: Student) => {
    setSelectedStudent((prev) =>
      prev?.id === student.id ? null : student
    );
  }, []);



  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Student Directory</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/add-student")}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>

      <SearchBar ref={searchRef} value={query} onChangeText={setQuery} debounceDelay={DEBOUNCE_DELAY} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={handleSelect}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No students match &quot;{query}&quot;</Text>
          </View>
        }
      />

      {selectedStudent && (
        <StudentDetail student={selectedStudent} onRemove={() => setSelectedStudent(null)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  addButton: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#94A3B8" },
});
