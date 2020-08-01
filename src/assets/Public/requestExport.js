import store from "../../store/index.js";
import axios from 'axios';

function request(url, body) {

    let requestPath = store.state.Login.url +"/exchange"+ url;
    let sid = store.state.Login.loginData.data.sessionId;
    return new Promise((resolve, reject) => {

        axios.post(requestPath, {
                sid: sid,
                body: body
            }, {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                responseType: 'blob'
              })
              .then(res => {
                  let resRef = res;
                  //console.log("daochu",resRef);
                  //let excel = JSON.parse(resRef.data.body);
                const blob = new Blob([res.data], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;chartset=utf-8'
                })
                if ('download' in document.createElement('a')) {
                  // 非IE下载 模拟一个超链接 链接指向url 创建的文件流路径
                  const elink = document.createElement('a')
                  elink.style.display = 'none'
                  elink.href = URL.createObjectURL(blob) // 生成链接
                  elink.target = '_self'
                  //elink.target = '_blank'
                  //获取表头信息中的文件名:start
                  let temp = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
                  //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
                  let iconv = require('iconv-lite'); 
                      iconv.skipDecodeWarning = true;//忽略警告
                  let fileName = decodeURIComponent(iconv.decode(temp, 'utf-8'));
                  //获取表头信息中的文件名:end
                  elink.download = fileName;
                  document.body.appendChild(elink)
                  elink.click()
                  URL.revokeObjectURL(elink.href) // 释放URL 对象
                  document.body.removeChild(elink)
                } else {
                  // IE10+下载
                  navigator.msSaveBlob(blob)
                }
                resolve({code: res.data.code, flag: true})
              }).catch(() => {
                resolve({code: res.data.code, flag: false})
              })
            .catch(error => {
                reject(error)
            });
    })

}



export default request;