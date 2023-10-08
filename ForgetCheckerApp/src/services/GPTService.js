import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPTService = {
    getSuggestions: async (noteName) => {
        try {

            const apiKey = await AsyncStorage.getItem('GPT_API_KEY');
            if (!apiKey) {
                throw new Error('API Key is not set');
            }
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci/completions',
                {
                    prompt: `Generate a checklist for ${noteName}`,
                    max_tokens: 50,
                },
                {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
                }
            );
            return response.data.choices[0].text.trim().split('\n').map(item => ({ text: item, checked: false }));
        } catch (error) {
        console.error(error);
        }
    }
};

export default GPTService;
