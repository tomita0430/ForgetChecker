import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "channel-id", // 任意の文字列で構いませんが、一意である必要があります
    channelName: "My Channel", // ユーザーに表示されるチャネルの名前
  },
  (created) => console.log(`createChannel returned '${created}'`)  // 成功または失敗をログに出力
);

AppRegistry.registerComponent(appName, () => App);