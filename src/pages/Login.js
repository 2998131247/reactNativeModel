import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank,Toast } from '@ant-design/react-native';
import EditView from './lib/EditView';
import LoginButton from './lib/LoginButton';
import LoginSuccess from './ui/LoginSuccess';
import DeviceInfo from 'react-native-device-info';
import NetUitl from './lib/NetUtil';
import login from "../api/login"
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
    this.state ={
      number:0
    };
    
  }
  componentDidMount(){
    let _t =this;
    this.requestReadSmsPermission()
  }

  async requestReadSmsPermission() {
    let _t =this;
    try {
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: '获取权限',
          message: '需要获取手机设备权限',
        },
      );
      const granted3 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        {
          title: '接收短信',
          message: '需要获取接收短信权限',
        },
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: '阅读短信',
          message: '需要获取阅读短信权限',
        },
      );
      
       if(granted=="granted"&&granted2=="granted"&&granted3=="granted"){
        DeviceInfo.getPhoneNumber().then(phoneNumber => {
          if(phoneNumber.length>= 11){
            setTimeout(()=>{
              this.props.navigation.replace('Homes', {
                phoneNumber: phoneNumber,
              });
              this.setState({
                number:phoneNumber
              })
            },2000)
          }else{
            setTimeout(() =>{
              this.props.navigation.replace('logs', {
                phoneNumber: "test",
              });
            },2000)
            
          }
          // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
        }).catch(r =>{
        });
       }else{
         if(granted!="granted"){
          Toast.fail('请开启获取阅读短信权限', 3);
         }
         if(granted2!="granted"){
          Toast.fail('请开启获取手机设备权限', 3);
         }
         if(granted3!="granted"){
          Toast.fail('需要获取接收短信权限', 3);
         }
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  componentWillUnmount(){
  }
  render() {
      return (

    <View style={LoginStyles.loginview}>
     <View   style={{flexDirection: 'row',marginTop:1,
        justifyContent: 'center',
        alignItems: 'center',}}>
       <Image style={{width:180,height:180}} source={require('../../images/ng.png')}/> 
     </View>
     {/* <View style={{marginTop:180}}>
       <EditView  name='输入用户名/注册手机号' password={false} onChangeText={(text) => {
            this.userName = text;
        }}/>
       <EditView name='输入密码'  password={true}  onChangeText={(text) => {
            this.password = text;
        }}/>
        <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
      <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？{}</Text>
      </View> */}
     </View>
   )
  }


  onPressCallback = () => {
    // login.getSing(1).then(r =>{
    //   let  res = JSON.stringify(r);
    //   console.log(r)
    //   alert(res)
    // }).catch(r =>{
    //   let  res = JSON.stringify(r);
    //   alert(22)
    //   console.log(r)
    // })

fetch('http://192.168.0.134:4000/test1', {  
    method: 'GET'
}).then(function(response) {
    //获取数据,数据处理
    alert(111)
    console.log(response)
}).catch(function(e) {
  alert(333)
  console.log(e)
    //错误处理
});
  };

  //跳转到第二个页面去
    onLoginSuccess(){
     const { navigator } = this.props;
     if (navigator) {
       navigator.push({
         name : 'LoginSuccess',
         component : LoginSuccess,
       });
     }
   }

}

class loginLineView extends Component {
  render() {
    return (
        <Text >
            没有帐号
          </Text>
    );
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
      justifyContent:'center',
      alignItems:"center"
  },
});