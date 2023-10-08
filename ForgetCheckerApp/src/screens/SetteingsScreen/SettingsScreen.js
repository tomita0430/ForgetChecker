import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Switch, Text } from 'react-native';
import styles from './SettingsScreenStyles';
import {loadUseSuggestion, saveUseSuggestion, saveApiKey, loadApiKey} from '../../utils/settingsOperations'

const SettingsScreen = ({ navigation }) => {
    const [apiKey, setApiKey] = useState('');
    const [useSuggestion, setUseSuggestion] = useState(false);

    const loadSettings = async () => {
        loadUseSuggestion(setUseSuggestion);
        loadApiKey(setApiKey);
    };

    const saveSettings = async () => {  
        saveUseSuggestion(useSuggestion);
        saveApiKey(apiKey);
        navigation.goBack();
    };

    const toggleSwitch = () => { 
        setUseSuggestion(previousState => !previousState); 
    }; 

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your GPT-3 API Key"
                value={apiKey}
                onChangeText={setApiKey}
                autoCapitalize="none"
            />
            <View style={styles.switchContainer}> 
                <Text>Use Suggestion Feature</Text>  
                <Switch 
                    onValueChange={toggleSwitch} 
                    value={useSuggestion}  
                /> 
            </View> 
            <Button title="Save" onPress={saveSettings} />  
        </View>
    );
};

export default SettingsScreen;
