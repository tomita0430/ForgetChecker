import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const NOTE_KEY_PREFIX = 'note_';

export const addNote = async (setNotes) => {
    const newNote = { id: NOTE_KEY_PREFIX + uuid.v4(), name: `NewNote` };
    setNotes(prevNotes => [...prevNotes, newNote]);
    await AsyncStorage.setItem(newNote.id, JSON.stringify(newNote));
};

export const loadNotes = async (setNotes) => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const noteKeys = allKeys.filter(key => key.startsWith(NOTE_KEY_PREFIX));
        const result = await AsyncStorage.multiGet(noteKeys);
        const loadedNotes = result.map(item => {
            if (!item[1]) {
                console.warn(`No value found for key: ${item[0]}`);
                return null;
            }
            try {
                const noteObject = JSON.parse(item[1]);
                return {
                    id: item[0],
                    ...noteObject,
                };
            } catch (parseError) {
                console.error(`Failed to parse JSON for key: ${item[0]}`, parseError);
                return null;
            }
        }).filter(note => note !== null);
        setNotes(loadedNotes);
    } catch (error) {
        console.error(error);
    }
};