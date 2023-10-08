import PushNotification from 'react-native-push-notification';

const scheduleNotification = (message, date) => {
    PushNotification.localNotificationSchedule({
        message: message,  // 通知メッセージ
        date: date,  // 通知日時
        userInfo: { id: '12345' },  // 任意のユーザー情報
        repeatType: 'day',  // 通知を毎日繰り返す
        soundName: 'default',  // 通知音
    });
    console.log('Notification scheduled:', date);
};

export {
    scheduleNotification,
};