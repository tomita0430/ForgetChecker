import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

class BluetoothDevices extends Component {
  state = {
    connectedDevices: [],
  };

  componentDidMount() {
    // Bluetooth Classicデバイスの接続されたデバイスを取得
    BluetoothSerial.list().then(devices => {
      this.setState({ connectedDevices: devices });
    });
  }

  render() {
    const { connectedDevices } = this.state;
    return (
      <View>
        <Text>接続されたBluetooth Classicデバイス:</Text>
        {connectedDevices.map(device => (
          <Text key={device.id}>{device.name}</Text>
        ))}
      </View>
    );
  }
}

export default BluetoothDevices;
