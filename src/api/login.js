import http from '../until/request'

export default {
    // getSing(sign) {
    //   return http.post(`/api/order/asyncUpdate`,sign,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
       //  return http.post(`/api/order/asyncUpdate?sign=${sign}`,sign,{headers: { // 添加请求头hisDetail
      //     // 'Content-Type': 'application/x-www-form-urlencoded'
      //     "Content-Type":"multipart/form-data"
          
      //   }})
    //   },
      getSing(sign,timestamp,nonStr,body) {
        return http.post(`/api/order/asyncUpdate?sign=${sign}&timestamp=${timestamp}&body=${body}&nonStr=${nonStr}`)
      }
}