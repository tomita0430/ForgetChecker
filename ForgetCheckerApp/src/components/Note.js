import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const Note = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.note}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    note: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Note;