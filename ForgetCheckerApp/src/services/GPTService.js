import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-4';

const GPTService = {
    getSuggestions: async (noteName) => {
        const prompt = `テーマが "キャンプ" の場合、{"テント" "寝袋" "ライト"}のように、テーマ"${noteName}"で忘れやすい3つの確認事項を考えてください。{"item" "item" "item"}形式で出力してください。`;
        try {

            const apiKey = await AsyncStorage.getItem('GPT_API_KEY');
            if (!apiKey) {
                throw new Error('API Key is not set');
            }
            const response = await axios.post(
                `${ API_URL }chat/completions`,
                {
                    model: MODEL,
                    max_tokens: 50,
                    messages:[
                        {
                            'role':'user',
                            'content':prompt
                        }
                    ],
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
                }
            );
            const rawOutput = response.data.choices[0].message.content;
            const cleanedOutput = rawOutput.replace(/{|}/g, '');
            const items = cleanedOutput.split('"').filter(item => item.trim() !== '');
            const formattedOutput = items.map(item => ({ text: item.trim(), checked: false }));
            return formattedOutput;
        } catch (error) {
        console.error(error);
        }
    }
};

export default GPTService;
