import React,{useEffect} from 'react';
import { View, Button,DeviceEventEmitter,PermissionsAndroid,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SmsListener from 'react-native-android-sms-listener2';
import Login from './src/pages/Login'
import Homes from './src/pages/Homes'
import Logs from './src/pages/Logs'
import Logintwo from './src/pages/Logintwo'

function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Button
      style={{}}
        title="Go to Settings"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

function ProfileScreen() {
  return <View />;
}

function AccountScreen() {
  return <View />;
}

function SettingsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
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

const Stack = createStackNavigator();
// react-native-vector-icons

// 
 function App() {
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
        // DeviceEventEmitter.emit("listerSms",message);
      });
      // setInterval(() =>{
      //   DeviceEventEmitter.emit("listerSms","1");
      // },1000)
     
    })
  return (
    // <></>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />
         <Stack.Screen name="logs" component={Logs} options={{headerShown: false}
        } />
        <Stack.Screen name="Homes" component={Homes} options={{headerShown: false}
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App
