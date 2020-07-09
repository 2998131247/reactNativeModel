import React, { Component,useState,useEffect } from 'react'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,AsyncStorage,Alert,PermissionsAndroid,DeviceEventEmitter} from "react-native"
import LoginButton from './lib/LoginButton';
import SmsListener from 'react-native-android-sms-listener2';
import EditView from './lib/EditView'
import {ToastExample} from "../pageModule/index";
// import BackgroundJob from 'react-native-background-job';
import { Button, Flex, WhiteSpace, WingBlank,Toast } from '@ant-design/react-native';
import login from '../api/login'
import md5 from 'js-md5'
//后台任务
// const backgroundJob = {
//     jobKey: "myJob",
//     job: () => console.log("Running in background")
//    };
    
//    BackgroundJob.register(backgroundJob);
    
//    var backgroundSchedule = {
//     jobKey: "myJob",
//    }
    
//    BackgroundJob.schedule(backgroundSchedule)
//      .then(() => console.log("Success"))
//      .catch(err => console.err(err));
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
 const Homes = (props) =>{

    const [phone,setphone] = useState(()=>{
        let numbers ="";
        console.log()
         if(props.route.params.phoneNumber!=="test"){
             numbers = props.route.params.phoneNumber.replace("+86","");
         }
         return numbers;
    })
    const [ApiSet,setApiSet] = useState("8ndovpt8uuwnokl45btr29m3sv7we30l");
    const [listenNumber,setlistenNumber]  = useState("");
    const [isOpen,setIsOpen]  = useState(true);
    const [SmsList,setSmsList] = useState([]);
    const [isListen,setIsListen] = useState(false);
    const generateSign = (nonStr,Secret,order,timestamp) => {
        let params = {};
        params.nonStr=nonStr;
        params.timestamp = timestamp;
        params.order = JSON.stringify(order);
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
    useEffect(()=>{
        requestReadSmsPermission();
        DeviceEventEmitter.addListener('listerSms',function(message){
          ToastExample.show(message.body, ToastExample.SHORT);
            // alert(JSON.stringify(message))
            let isTruePhone = message.originatingAddress.replace("+86","")
            if(isTruePhone == listenNumber&&isListen==true){
                let nonStr = Math.random()*700 + 8000;
                let timestamp = new Date().getTime();
                let body ={ smsBody:message.body,phone:phone};
                let signs = generateSign(nonStr,ApiSet,body,timestamp);
                let daten = dateTime(new Date());
                let k ={dates:daten,body:body.smsBody}
                let y = [...SmsList];
                login.getSing(signs,timestamp,nonStr,body).then(r =>{
                 y.unshift(k)
                setSmsList(y)     
                    alert("成功")
                }).catch(r =>{
                    alert("失败")
                })
            }else{
                Toast.fail("请填写完整表单",3)
            }
        })
        //  let isTruePhone = '222222222'
        //         let nonStr = Math.random()*700 + 8000;
        //         let timestamp = new Date().getTime();
        //         let body ={ smsBody:"2222222222",phone:"15870924408"};
        //         let signs = generateSign(nonStr,ApiSet,body,timestamp);
                
        //         let daten = dateTime(new Date());
        //         let k ={dates:daten,body:body.smsBody}
        //         let y = [...SmsList];
                
        //         body =JSON.stringify(body);
        //         login.getSing(signs,timestamp,nonStr,body).then(r =>{
        //             y.unshift(k)
        //             setSmsList(y)
        //             alert("成功")
        //         }).catch(r =>{
        //             alert("失败")
        //         }) 
        // console.log("SmsList:"+SmsList,+"isListen:"+isListen,+"listenNumber:"+listenNumber,+"ApiSet:"+ApiSet)
        // SmsListener.addListener(message => {
            // alert(JSON.stringify(message))
            // let isTruePhone = message.originatingAddress
            // if(isTruePhone == listenNumber&&isListen==true){
            //     let nonStr = Math.random()*700 + 8000;
            //     let timestamp = new Date().getTime();
            //     let body ={ smsBody:message.body,phone:phone};
            //     let signs = generateSign(nonStr,ApiSet,body,timestamp);
            //     let daten = dateTime(new Date());
            //     let k ={dates:daten,body:body.smsBody}
            //     let y = [...SmsList];
            //     login.getSing(signs,timestamp,nonStr,body).then(r =>{
            //      y.unshift(k)
            //     setSmsList(y)     
            //         alert("成功")
            //     }).catch(r =>{
            //         alert("失败")
            //     })
            // }else{
            //     Toast.fail("请填写完整表单",3)
            // }
        })
    
    // })
    //,[SmsList,isListen,listenNumber,ApiSet]
    
     const onOpen =() =>{
        let isOpens = !isOpen;
        setIsOpen(isOpens);
     }
    
    const  ontest =() =>{
        let nonStr = Math.random()*700 + 8000;
        let timestamp = new Date().getTime();
        let body ={smsBody:"通知",phone:"15870924408"};
        let signs = this.generateSign(nonStr,this.state.ApiSet,body,timestamp)
        let infos ={
            sign:signs,
            timestamp:timestamp,
            nonStr:nonStr,
            body:JSON.stringify(body),
        }
        const dateTime =(date) =>{
            const pad = n => n < 10 ? `0${n}` : n;
            const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
            const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            return `${dateStr} ${timeStr}`
        }
        let daten = dateTime(new Date());
        console.log(daten)
        let k ={dates:daten,body:body.smsBody}
        let y = [...this.state.SmsList];
        y.unshift(k)
        this.setState({
            SmsList:y
        })
        Toast.info(JSON.stringify(infos));
        body=JSON.stringify(body);
        login.getSing(signs,timestamp,nonStr,body).then(r =>{
            console.log("成功")
            console.log(r)
        }).catch(r =>{

            Toast.fail("失败");
            console.log(r)
        })
      }
     const onPressCallback =() =>{
        setIsListen(true);
        //  let {phone ,ApiSet, listenNumber} =this.state;
        // if(phone==""||ApiSet==""||listenNumber==""){
        //     Toast.fail('请填写完整信息', 3);
        // }else{
        //     SmsListener.addListener(message => {
        //         let isTruePhone = message.originatingAddress
        //         if(isTruePhone == y.listenNumber){
        //             let nonStr = Math.random()*700 + 8000;
        //             let timestamp = new Date().getTime();
        //             let body ={ smsBody:message.body,phone:phone};
        //             let signs = this.generateSign(nonStr,ApiSet,body,timestamp);
        //             const dateTime =(date) =>{
        //                 const pad = n => n < 10 ? `0${n}` : n;
        //                 const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        //                 const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        //                 return `${dateStr} ${timeStr}`
        //             }
        //             let daten = dateTime(new Date());
        //             let k ={dates:daten,body:body.smsBody}
        //             let y = [...this.state.SmsList];
        //             y.unshift(k)
        //             this.setState({
        //                 SmsList:y
        //             })
        //             body =JSON.stringify(body);
        //             Toast.info(JSON.stringify(infos));
        //             login.getSing(infos).then(r =>{
        //                 alert("成功")
        //             }).catch(r =>{
        //                 alert("失败")
        //             })
        //         }
        //     })
        // }
     }
        return (
            <View style={homes.homesContainer}>
                <ScrollView contentContainerStyle={homes.contentContainer}>
                    {SmsList.map((t,o) =>
                        <View key={o}>
                            <Text style={homes.info}>
                                {t.dates}&nbsp;&nbsp;{t.body}
                            </Text>
                        </View>
                        
                    )}
                    
                </ScrollView>
                <View>
                <TouchableOpacity onPress={onOpen} style={homes.loginTextView}>
                    <Text style={homes.loginText} >
                        {isOpen?"关闭":"打开"}
                    </Text>
                </TouchableOpacity>
                {/* 8ndovpt8uuwnokl45btr29m3sv7we30l */}
                {isOpen? <><EditView name='输入手机号' defaultValue={phone} onChangeText={(text) => {setphone(text)}}></EditView>
                        <EditView name='输入Api密码' defaultValue={ApiSet} onChangeText={(text) => {setApiSet(text)}}></EditView>
                       <EditView name='输入短信监听号码' onChangeText={(text) => {setlistenNumber(text)}}></EditView>
                        <TouchableOpacity onPress={onPressCallback} style={homes.loginTextView}>
                                    <Text style={homes.loginText} >
                                        开始监听
                                    </Text>
                            </TouchableOpacity></>:<></>}
                </View>
            </View>
        )
    }


const homes = StyleSheet.create({
    homesContainer: {
      flex: 1,
      padding:5,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingVertical: 20,
        height:800
      },
      info:{
          fontSize:20,
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

  });
export default Homes;