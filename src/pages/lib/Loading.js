import React,{useState,useEffect} from 'react'
import { View,Image, } from 'react-native'

 function Loading() {
     const [show,setShow] = useState(false);
     const shows =() =>{
        setShow(true)
    };
    const hide = () => {
        setShow(false)
    };
    return (
        <View>
            <Text>2222</Text>
        </View>
    )
}
export default Loading;