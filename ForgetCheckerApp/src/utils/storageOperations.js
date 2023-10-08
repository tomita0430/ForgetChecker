import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadNote = async (noteID, setNoteName, setChecklist) => {
    try{
        const savedData = await AsyncStorage.getItem(noteID);
        if (savedData !== null) {
            const parsedData = JSON.parse(savedData);
            setNoteName(parsedData.name || "");
            setChecklist(parsedData.checklist || []);
        }
    }catch(error){
        console.error(error);
    }
};

export const saveNote = async (noteID, noteName, checklist) => {
    try{
        await AsyncStorage.setItem(
            noteID,
            JSON.stringify({ name: noteName, checklist: checklist })
        );
    }catch(error){
        console.error(error);
    }
};

export const deleteNote = async (noteID) => {
    try {
        await AsyncStorage.removeItem(noteID);
    } catch (error) {
        console.error(error);
    }
};
