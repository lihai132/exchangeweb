import CryptoJS from 'crypto-js'
const AES_PARA = "JJL2@ys5xs0^99N!"; //密钥参数




// 解密方法
// function Decrypt(word){
//     var iv2  = CryptoJS.enc.Utf8.parse(AES_PARA);
// }
export default {
    // 加密方法
    AESUTIL(pwd, md) {
        var iv2 = CryptoJS.enc.Utf8.parse(AES_PARA);
        var key_hash = CryptoJS.MD5(pwd); // "pwd" 代表明文密码
        // 两次md5加密
        var key = CryptoJS.enc.Utf8.parse(key_hash);
        var key_hash2 = CryptoJS.MD5(key);
        // 三次md5加密
        var key2 = CryptoJS.enc.Utf8.parse(key_hash2);
        var key_hash3 = CryptoJS.MD5(key2);
        var encrypted = CryptoJS.AES.encrypt(md, key_hash3, {
            iv: iv2,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Iso10126
        });
        return encrypted + "";
    },

    // 加密方法
    pwdmd5(pwd,key) {
        var key_hash = CryptoJS.MD5(pwd); // "pwd" 代表明文密码
        // 两次md5加密
        var key = CryptoJS.enc.Utf8.parse(key_hash);
        var key_hash2 = CryptoJS.MD5(key);
        // 三次md5加密
        var key2 = CryptoJS.enc.Utf8.parse(key_hash2);
        var key_hash3 = CryptoJS.MD5(key2);
        return key_hash3;
    },


    // 通用api加密
    APIAESUTIL(sessionKey, md) {
        var iv2 = CryptoJS.enc.Utf8.parse(AES_PARA);
        var encrypted = CryptoJS.AES.encrypt(md, sessionKey, {
            iv: iv2,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Iso10126
        });
        return encrypted + "";
    },

    // api
    decryptAPIAESUTIL(sessionKey, md) {
        var iv2 = CryptoJS.enc.Utf8.parse(AES_PARA);

        var decryptmsg = CryptoJS.AES.decrypt(md, sessionKey, {
            iv: iv2,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Iso10126
        });
        return decryptmsg + "";
    },



    AESUTILNormal(pwd) {
        var iv2 = CryptoJS.enc.Utf8.parse(AES_PARA);
        var encrypted = CryptoJS.AES.encrypt(pwd, iv2, {
            iv: iv2,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Iso10126
        });
        return encrypted + "";
    }

}