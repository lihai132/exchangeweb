import store from "../../store/index.js";
import axios from 'axios';
import router from '@/router';
import {
  message
} from '@/components/common/rewriteMessage';

function request(url, body) {

    let requestPath = store.state.Login.url +"/exchange"+ url;
    let sid = store.state.Login.loginData.data.sessionId;
    return new Promise((resolve, reject) => {

        axios.post(requestPath, {
                sid: sid,
                body: body
            })
            .then(res => {
			let data = JSON.parse(res.data.body);
			if(data.errCode==-110014){
				message.error({message: "会话已过期，请重新登录",duration:1500});
				setTimeout(function()  {
					router.push('/login');
				}, 1600);
				return;
			}
                resolve(data)

            })
            .catch(error => {
                reject(error)
            });
    })

}



export default request;