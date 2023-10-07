import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet,} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTitleInput from '../components/HeaderTitleInput'

const DetailScreen = ({navigation, route}) => {
    if (!route.params || !route.params.note || !route.params.note.id) {
        console.error('NoteID is not provided');
        return null; 
    }
    
    const noteID = route.params.note.id.toString();
    const [noteName, setNoteName] = useState("");
    const [checklist, setChecklist] = useState([]);
    
    const handleSaveName = useCallback(
        (newName) => {
            setNoteName(newName);
        },[]
    );

    const loadNote = async () => {
        try{
            const savedData = await AsyncStorage.getItem(noteID);
            if (savedData !== null) {
                const parsedData = JSON.parse(savedData);
                console.log(noteID);
                console.log(savedData);
                console.log(parsedData);
                setNoteName(parsedData.name || "");
                setChecklist(parsedData.checklist || []);
            }
        }catch(error){
            console.error(error);
        }
    };

    const saveNote = useCallback(async () => {
        try{
            await AsyncStorage.setItem(
                noteID,
                JSON.stringify({ name: noteName, checklist: checklist })
            );
        }catch(error){
            console.error(error);
        }
    }, [noteID, noteName, checklist]);  // 依存関係配列に noteID, noteName, checklist を追加
    
    const addChecklistItem = () => {
        setChecklist([...checklist, { text: '', checked: false }]);
    }; 

    const deleteNote = async () => {
        try {
            await AsyncStorage.removeItem(noteID);
            navigation.navigate('Home');  // assuming 'Home' is the name of your HomeScreen
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete the note.');
        }
    };

    const deleteChecklistItem = (indexToDelete) => {
        const newChecklist = checklist.filter((_, index) => index !== indexToDelete);
        setChecklist(newChecklist);
    };

    useEffect(() => {
        console.log("load");
        loadNote();
    }, []);
    
    useEffect(() => {
        saveNote();  // noteName または checklist が変更されたときに saveNote を呼び出す
    }, [noteName, checklist, saveNote]);
    
    useEffect(() => {
        console.log("head");
        navigation.setOptions({
            headerTitle: (props) => (
            <HeaderTitleInput initialName={noteName} onSave={handleSaveName} {...props} />
            ),
        });
    }, [navigation, handleSaveName, noteName]); 

    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
                <Button title="Save" onPress={saveNote} />
                <Button title="Delete" onPress={deleteNote} color="red" />
            </View>
            ),
        });
    }, [navigation, checklist]);

    return (
    <View style={styles.container}>
        {checklist.map((item, index) => (
                <View style={styles.checklistItem} key={index}>
                    <CheckBox
                        value={item.checked}
                        onValueChange={(newValue) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].checked = newValue;
                            setChecklist(newChecklist);
                        }}
                    />
                    <TextInput
                        value={item.text}
                        onChangeText={(newText) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].text = newText;
                            setChecklist(newChecklist);
                        }}
                        style={styles.input}
                    />
                    <Button title="Delete" onPress={() => deleteChecklistItem(index)} color="red" />
                </View>
            ))}
            <Button title="Add Item" onPress={addChecklistItem} />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        flex: 1, 
        height: 40,
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
});

export default DetailScreen;
