import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { 
    View,
    Button,} from 'react-native';
import HeaderTitleInput from '../../components/HeaderTitleInput'
import CheckListItem from '../../components/CheckListItem'
import styles from './DetailScreenStyles';
import GPTService from '../../services/GPTService';
import { loadNote, saveNote, deleteNote } from '../../utils/storageOperations';
import {loadUseSuggestion} from '../../utils/settingsOperations';
import { addCheckListItem, deleteCheckListItem} from '../../utils/checkListOperations';

const DetailScreen = ({navigation, route}) => {
    if (!route.params || !route.params.note || !route.params.note.id) {
        console.error('NoteID is not provided');
        return null; 
    }
    

    const [useSuggestion, setUseSuggestion] = useState(false);

    const noteID = route.params.note.id.toString();
    const [noteName, setNoteName] = useState("");
    const [checklist, setChecklist] = useState([]);
    
    const handleSaveName = useCallback(
        (newName) => {
            setNoteName(newName);
        },[]
    );

    const handleSuggest = async () => {
        const suggestedItems = await GPTService.getSuggestions(noteName);
        setChecklist([...checklist, ...suggestedItems]);
    };

    const handleDelete = async() =>{
        deleteNote(noteID);
        navigation.goBack();
    }

    const handleSave = async() => {
        saveNote(noteID, noteName, checklist);
        navigation.goBack();
    }

    useEffect(() => {
        loadNote(noteID, setNoteName, setChecklist);
        loadUseSuggestion(setUseSuggestion);
    }, []);
    
    useEffect(() => {
        saveNote(noteID, noteName, checklist); 
    }, [noteName, checklist, saveNote]);
    
    useEffect(() => {
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
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Delete" onPress={handleDelete} color="red" />
                </View>
                ),
            });
    }, [navigation, checklist]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {checklist.map((item, index) => (
                    <CheckListItem
                        key={index.toString()}    
                        item={item} 
                        index={index.toString()}
                        onValueChange={(index, newValue) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].checked = newValue;
                            setChecklist(newChecklist);
                        }}
                        onChangeText={(index, newText) => {
                            const newChecklist = [...checklist];
                            newChecklist[index].text = newText;
                            setChecklist(newChecklist);
                        }}
                        onDelete={() => deleteCheckListItem(index, checklist, setChecklist)}
                    />
                ))}
                <Button title="Add Item" onPress={() => addCheckListItem(checklist, setChecklist)} />
            </View>
            {useSuggestion && (
                <View style={styles.footer}>
                    <Button title="Suggest" onPress={handleSuggest} />
                </View>
            )}
        </View>
    );
};

export default DetailScreen;
