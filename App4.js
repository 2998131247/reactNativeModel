import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, PermissionsAndroid,Alert} from 'react-native';

import SmsListener from 'react-native-android-sms-listener2';
import {getUniqueId} from 'react-native-device-info';



async function requestReadSmsPermission() {
  try {
    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: '阅读短信',
        message: '需要获取阅读短信权限',
      },
    );
    var granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: '接收短信',
        message: '需要获取接收短信权限',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
      if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          '接收短信',
          '接收短信',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        console.log('RECEIVE_SMS permissions granted', granted);
      } else {
        console.log('RECEIVE_SMS permissions denied');
      }
    } else {
      console.log('sms read permissions denied');
    }
  } catch (err) {
    console.log(err);
  }
}
const App = () => {
  const [url, setUrl] = useState();
  const [openId, setOpenId] = useState();
  useEffect(() => {
    requestReadSmsPermission();
    SmsListener.addListener(message => {
      let y = JSON.stringify(message);
      Alert.alert(
        '接收短信',
        y,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    });
  });

  return (
    <>
      <View style={styles.qrCodeContainer}>
        {url && (
          <>
            <Text style={styles.qrCodeTip}>微信扫描二维码绑定</Text>
          </>
        )}
        {openId && <Text>已为您自动开启短信转发</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  qrCodeTip: {
    marginTop: 10,
  },
});

export default App;