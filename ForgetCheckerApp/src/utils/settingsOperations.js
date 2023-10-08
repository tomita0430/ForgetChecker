import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUseSuggestion = async (setUseSuggestion) => {
    try {
        const savedUseSuggestion = await AsyncStorage.getItem('useSuggestion');
        if (savedUseSuggestion !== null) {
            setUseSuggestion(JSON.parse(savedUseSuggestion || false));
        }else{
            setUseSuggestion(false);
        }
    } catch (error) {
        console.error(error);
    }
};

export const saveUseSuggestion = async (useSuggestion) =>{
    try{
        await AsyncStorage.setItem('useSuggestion', JSON.stringify(useSuggestion));
    }catch(error){
        console.error(error);
    }
}

export const loadApiKey = async (setApiKey) => {
    try {
        const savedApiKey = await AsyncStorage.getItem('GPT_API_KEY' || "");
        if (savedApiKey !== null) {
            setApiKey(savedApiKey);
        }
    } catch (error) {
        console.error(error);
    }
};

export const saveApiKey = async (apiKey) => {
    try {
        await AsyncStorage.setItem('GPT_API_KEY', apiKey);
    } catch (error) {
        console.error(error);
    }
};