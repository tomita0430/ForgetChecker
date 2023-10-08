import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Note = ({ item, onPress, onSetReminder }) => {
    return (
        <View style={styles.note}>
            <TouchableOpacity onPress={onPress} style={styles.textContainer}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reminderButton} onPress={() => onSetReminder(item)}>
                <Text style={styles.buttonText}>Reminder</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    note: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        flex: 1,
    },
    reminderButton: {
        padding: 10,
        backgroundColor: 'blue',  
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', 
    },
});

export default Note;