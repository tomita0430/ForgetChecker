import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useDatePicker from '../../components/useDatePicker';
import { scheduleNotification } from '../../utils/notificationManager';

const SetReminderScreen = ({ route }) => {
    const [date, setDate] = useState(new Date());
    const { isDatePickerVisible, showDatePicker, hideDatePicker } = useDatePicker();

    const handleConfirm = (date) => {
        hideDatePicker();
        setDate(date);
        scheduleNotification(`Reminder for ${route.params.note.name}`, date);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Set Reminder" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour={true}
            />
            <Text style={{ fontSize: 16, marginTop: 20 }}>Reminder set for: {date.toLocaleString()}</Text>
        </View>
    );
};

export default SetReminderScreen;
