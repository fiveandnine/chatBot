/**
 * Created by xiaolei on 2018/4/21.
 */
import {getWeChatPayData} from '../../services/api'
export const weChatPay=(data,url)=>{
        console.log(data,url);

        let ua=navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger"){
            getWeChatPayData(Object.assign({},data,{"payType": "JSAPI"})).then(data=>{

            });
        }else{
            //h5
            getWeChatPayData(Object.assign({},data,{"payType": "MWEB"})).then(data=>{
                window.location.href = data.mweb_url +"&redirect_url="+encodeURIComponent(url);
            });

        }



}

// {
//     "orderId": data.orderId,
//     "payFee": data.payFee,
//     "body": data.body,
//     "payType": "MWEB",
//     "businessType": 'activity',
//     "attach": JSON.stringify({'attach':'activity'})
// }