import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Alert,PermissionsAndroid,DeviceEventEmitter,AppState} from 'react-native';

import SmsListener from 'react-native-android-sms-listener2';
import {getUniqueId} from 'react-native-device-info';
import Logintwo from './src/pages/Logintwo'
import DeviceInfo from 'react-native-device-info';
import EditView from './src/pages/lib/EditView'
import login from './src/api/login'
import md5 from 'js-md5'
import {ToastExample,OpenSetting} from "./src/pageModule/index";
import {request, PERMISSIONS} from 'react-native-permissions';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
const storage = new Storage({
  size: 1040000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
  sync: {
  }
});

const App = () => {
  var appState = AppState.currentState;
  const [phone,setphone] = useState("")
  const [show,Setshow] = useState(false)
  const [ApiSet,setApiSet] = useState("gjquvz2lusukns36ymxg4vpo92kvu3iy");
  const [listenNumber,setlistenNumber]  = useState("");
  const [isOpen,setIsOpen]  = useState(true);
  const [SmsList,setSmsList] = useState([]);
  const [isListen,setIsListen] = useState(false);
  const [isStorage,setisStorage] =useState(false)
  const generateSign = (nonStr,Secret,order,timestamp) => {
    let params = {};
    params.nonStr=nonStr;
    params.timestamp = timestamp;
    params.body = JSON.stringify(order);
    let appSecret = Secret; //
    var newObj = objKeySort(params);
    let connects = '';
    Object.keys(newObj).forEach(key=>{
      connects = connects + key + '=' + newObj[key] + '&';
    });
    connects = connects + 'appSecret' + '=' + appSecret;
    params.sign = md5(connects); //
    return params;
  }
  const objKeySort = (obj, typesort = 'sort') => { //排序的函数
    if (typesort == 'sort') {
      var newkey = Object.keys(obj).sort(); //升序
    } else {
      var newkey = Object.keys(obj).sort().reverse(); //降序
    }
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
  }
  const dateTime =(date) =>{
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    return `${dateStr} ${timeStr}`
}
    const get = (key)=> {
           return AsyncStorage.getItem(key).then((value) => {
               const jsonValue = JSON.parse(value);
               return jsonValue;
           });
       }
// AppState.currentState
async function requestReadSmsPermission() {
  try {
    var granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      {
        title: '接收短信',
        message: '需要获取接收短信权限',
      },
    );
    var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: '阅读短信',
        message: '需要获取阅读短信权限',
      },
    );
    const granted3 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: '获取权限',
        message: '需要获取手机设备权限',
      },
    );
    if (granted2 === PermissionsAndroid.RESULTS.GRANTED&&granted === PermissionsAndroid.RESULTS.GRANTED&&granted3===PermissionsAndroid.RESULTS.GRANTED) {
      DeviceInfo.getPhoneNumber().then(phoneNumber => {
        let numbers ="";
        if(phoneNumber.length >= 11){
            numbers = phoneNumber.replace("+86","");
        }
        setphone(numbers);
        Setshow(true)
        // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
      }).catch(r =>{
      });
        // console.log('RECEIVE_SMS permissions granted', granted);
        return true;
      } else {
        Alert.alert(
          '权限',
          '权限获取失败',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => {}},
          ],
          { cancelable: false }
        )
        // console.log('RECEIVE_SMS permissions denied');
        return false;
      }
   
  } catch (err) {
    // console.log(err);
    ToastExample.show("请重新启动", 14);
  }
}
const onOpen =() =>{
  let isOpens = !isOpen;
  setIsOpen(isOpens);
}
const onPressCallback =() =>{
  if(!isListen){
    if(listenNumber==""||ApiSet==""||phone==""){
          ToastExample.show("请填写完整表单", 3);
          return 
        }else if(listenNumber!==""&&ApiSet!==""&&phone!==""){
          setlistenNumber(listenNumber);
          setApiSet(ApiSet);
          setphone(phone);
          setIsOpen(false);
          setIsListen(!isListen);
          ToastExample.show("开始监听", 3);
        }
    }else{
      setIsListen(!isListen);
        ToastExample.show("停止监听", 3);
    }
  // if(!isListen){
  //   if(listenNumber==""||ApiSet==""||phone==""){
  //     ToastExample.show("请填写完整表单", 3);
  //     return 
  //   }else if(listenNumber!==""&&ApiSet!==""&&phone!==""){
  //     setlistenNumber(listenNumber);
  //     setApiSet(ApiSet);
  //     setphone(phone);
  //     setIsOpen(false);
  //     setIsListen(!isListen);
  //     ToastExample.show("开始监听", 3);
  //   }
  // }else{
  //   ToastExample.show("关闭监听", 3);
  //   setIsListen(!isListen);
  // }
 
}

const  onOpenSetting =()=>{
  OpenSetting.openNetworkSettings(data => {
    // console.log('call back data', data)
  })
}
  // Logintwo.show();
const testBtn = () =>{
  storage.save({
    key: 'user', // Note: Do not use underscore("_") in key!
    id: '1001', // Note: Do not use underscore("_") in id!
    data:[{a:1,b:2}]
  });
}
  useEffect(() => {
    requestReadSmsPermission();
  
    ToastExample.show("后台运行", 1);
    // storage.save({
    //   key: 'user', // Note: Do not use underscore("_") in key!
    //   id: '1001', // Note: Do not use underscore("_") in id!
    //   data: userA,
    //   expires: 1000 * 60
    // });
    SmsListener.addListener(message => {
                  
            let smsListsStorage = JSON.stringify(y);
            let isTruePhone = message.originatingAddress.replace("+86","")
            if(isTruePhone == listenNumber&&isListen==true){
                let nonStr = Math.random()*700 + 8000;
                let timestamp = new Date().getTime();
                let body ={ smsBody:message.body,phone:phone};
                let signs = generateSign(nonStr,ApiSet,body,timestamp);
                let daten = dateTime(new Date());
                let k ={dates:daten,body:body.smsBody}
                let y = [...SmsList];
                storage.save({
                  key: 'smsList', // Note: Do not use underscore("_") in key!
                  id: '1001', // Note: Do not use underscore("_") in id!
                  data:y
                });
                y.unshift(k);
                setSmsList(y) 
                body = JSON.stringify(body);
                // storage.getAllDataForKey('smsList').then(smsList => {

                // })
                login.getSing(signs.sign,signs.timestamp,signs.nonStr,body).then(r =>{
                  ToastExample.show("成功接收信息:"+message.originatingAddress, 3);
                  // ToastExample.show("成功接收信息:"+message.originatingAddress, 1);
                }).catch(r =>{
                  ToastExample.show("失败，请联系管理员", 3);
                })
            }
    });
  },[isListen]);
  // ,[SmsList,isListen,listenNumber,ApiSet]
  return (
    <>
    {<Text style={homes.danger} >注意：安装成功后必须短信授权，请点击下方按钮打开设置 >>>
        设置>应用管理>应用授权>年瑾支付 读取短信改为允许
      </Text>}
    <TouchableOpacity onPress={onOpenSetting} style={homes.loginTextView}>
                                    <Text style={homes.loginText} >
                                       打开设置
                                    </Text>
                            </TouchableOpacity>
    <View style={homes.homesContainer}>
                <ScrollView contentContainerStyle={homes.contentContainer}>
                    {SmsList.map((t,o) =>
                        <View key={o}>
                            <Text style={homes.info}>
                              <Text style={homes.green}>{t.dates}</Text>  &nbsp;&nbsp;{t.body}
                            </Text>
                        </View>
                    )}
                </ScrollView>
                <View>
                <TouchableOpacity onPress={onOpen} style={homes.loginTextView}>
                    <Text style={homes.loginText} >
                        {isOpen?"隐藏":"打开"}
                    </Text>
                </TouchableOpacity>
                {/* 8ndovpt8uuwnokl45btr29m3sv7we30l */}
                {isOpen? <><EditView name='输入手机号' defaultValue={phone} onChangeText={(text) => setphone(text)}></EditView>
                        <EditView name='输入Api密码' defaultValue={ApiSet} onChangeText={(text) => setApiSet(text)}></EditView>
                       <EditView name='输入短信监听号码' defaultValue={listenNumber} onChangeText={(text) => setlistenNumber(text)}></EditView>
                        <TouchableOpacity onPress={testBtn} style={homes.loginTextView}>
                                  {/* onPress={onPressCallback} */}
                                    <Text style={homes.loginText} >
                                    {/* 开始监听 */}
                                       {isListen?'停止监听':'开始监听'} 
                                    </Text>
                            </TouchableOpacity></>:<></>}
                </View>
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
const homes = StyleSheet.create({
  homesContainer: {
    flex: 1,
    padding:5,
      backgroundColor: '#ffffff',
  },
  danger:{
    marginTop:8,
    marginBottom:8,
    marginLeft:10,
    marginRight:10,
    color:"#ff0b0b"
  },
  contentContainer: {
      paddingVertical: 20
    },
    info:{
        fontSize:17,
        marginBottom:10,
    },
    loginText: {
      color: '#ffffff',
       fontWeight: 'bold',
       textAlign:"center",
       width:90,
    },
    loginTextView:{
      textAlign:"center",
      marginTop: 10,
      height:50,
      backgroundColor: '#3281DD',
      borderRadius:5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
    },
    green:{
      color:"#42c02e"
    }
});
export default App;