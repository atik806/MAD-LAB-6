// components/search-bar.tsx

import React, { forwardRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";



interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string; // the ? means this prop is optional
    debounceDelay?: number; // in ms, default 300
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(({ value, onChangeText, placeholder }, ref) => {
    return (
        <View style={styles.container}>
            <TextInput
                ref={ref}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder ?? "Search students..."}
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing" // iOS only: shows × button
                returnKeyType="search"
            />
        </View>
    );
});
SearchBar.displayName = "SearchBar";

export default SearchBar;


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        color: "#1E293B",
    },
});
