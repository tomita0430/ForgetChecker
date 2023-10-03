import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';


const App = () => {
    const [memo, setMemo] = useState('');
    const [memoList, setMemoList] = useState([]);

    const addMemo = () => {
        if (memo) {
            setMemoList([...memoList, memo]);
            setMemo('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
            value={memo}
            onChangeText={setMemo}
            placeholder="メモを入力..."
            style={styles.input}
        />
        <Button title="追加" onPress={addMemo} />
        <FlatList
            data={memoList}
            renderItem={({ item }) => <Text style={styles.memo}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    memo: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});

export default App; 