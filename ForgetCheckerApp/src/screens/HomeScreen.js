import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const HomeScreen = ({navigation}) => {
    const [notes, setNotes] = useState([{id: uuid.v4(), name: 'Sample Note' }]);

    const addNote = () => {
        const newNote = {id: uuid.v4(), name: `NewNote` };
        setNotes(prevNotes => [...prevNotes, newNote]);
        AsyncStorage.setItem(newNote.id, JSON.stringify(newNote));
    };

    const loadNotes = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const loadedNotes = result.map(item => {
                const noteObject = JSON.parse(item[1]);
                return {
                    id: item[0],
                    ...noteObject,
                };
            });
            setNotes(loadedNotes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadNotes();
        });
        return unsubscribe;
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Detail', {note: item })}
                    style={styles.note}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
            <Button title="Add" onPress={addNote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    note: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HomeScreen;