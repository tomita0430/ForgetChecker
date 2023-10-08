import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Button,
    FlatList,
} from 'react-native';
import uuid from 'react-native-uuid';
import { addNote, loadNotes } from '../../utils/NoteOperations';
import Note from '../../components/Note';
import styles from './HomeScreenStyles';

const HomeScreen = ({navigation}) => {
    const [notes, setNotes] = useState([{id: uuid.v4(), name: 'Sample Note' }]);

    const handleSetReminder = (note) => {
        navigation.navigate('SetReminder', { note });
    };

    useEffect(() => {
        loadNotes(setNotes);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadNotes(setNotes); 
        });
        return unsubscribe;
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
            ),
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <Note
                        item={item}
                        onPress={() => navigation.navigate('Detail', { note: item })}
                        onSetReminder={handleSetReminder}
                    />
                )}
                keyExtractor={item => item.id}
            />
            <Button title="Add" onPress={() => addNote(setNotes)} />
        </View>
    );
};

export default HomeScreen;