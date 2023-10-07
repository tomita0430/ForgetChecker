import React, { useEffect, useState  } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  console.log("Start Application");

  const [memo, setMemo] = useState('');
  const [memoList, setMemoList] = useState([]);

  const [devices, setDevices] = useState([]);

  /*
  // Bluetooth対応端末であれば，こちらを実行
  const manager = new BleManager()
  useEffect(() => {
    const subscription = bleManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        startScanning();
      }
    }, true);

    return () => {
      subscription.remove();
    };
  }, []);

  const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error scanning for BLE devices:', error);
        return;
      }

      // Add the scanned device to the devices array
      setDevices((prevDevices) => [...prevDevices, device]);
    });
  };


  return (
    <div>
      <h1>BLE Device Scanner</h1>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>{device.name || 'Unknown Device'}</li>
        ))}
      </ul>
    </div>
  );
  */
  
  return (
  <View>
    <Text>BLE</Text>
    <Text>{devices.length}</Text>
    <FlatList
        data={devices}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
    />
  </View>
  )
};

export default App;
/*
const App = () => {
    const [memo, setMemo] = useState('');
    const [memoList, setMemoList] = useState([]);
    console.log("Hello");

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
*/