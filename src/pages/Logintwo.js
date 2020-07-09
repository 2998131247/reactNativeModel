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
export default class Logintwo extends Component {
  constructor(props) {
    super(props);
    _this = this;
    this.userName = "";
    this.password = "";
    this.state ={
      number:0,
      show:false
    };
    
  }
  componentDidMount(){
    let _t =this;
  }
  static show = () => {
    _this.setState({show: true})
};
static hide = () => {
    _this.setState({show: false})
};
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