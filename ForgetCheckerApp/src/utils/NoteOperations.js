import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const addNote = async (setNotes) => {
    const newNote = { id: uuid.v4(), name: `NewNote` };
    setNotes(prevNotes => [...prevNotes, newNote]);
    await AsyncStorage.setItem(newNote.id, JSON.stringify(newNote));
};

export const loadNotes = async (setNotes) => {
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
