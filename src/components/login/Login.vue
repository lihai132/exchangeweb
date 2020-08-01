<template>
    <div class="login-wrap">
        <div class="top">
            <div class="title">
                <img src="../../assets/img/footer-logo.png" alt />
            </div>
        </div>
        <div class="center">
            <div class="left">
                <img src="../../assets/img/dbg5.png" alt />
            </div>
            <div class="ms-login">
                <div class="ms-title">交易中心管理系统</div>
                <el-form
                    :model="param"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model.trim="param.username"
                            placeholder="账号"
                            size="medium"
                            @input="param.username = commonUtils.trimAll(param.username)"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="密码"
                            v-model.trim="param.password"
                            size="medium"
                            @input="param.password = commonUtils.trimAll(param.password)"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="verification" style="height: 60px;margin-bottom: 20px;">
                        <el-input
                            type="verification"
                            placeholder="验证码"
                            v-model.trim="param.verification"
                            @blur="blur"
                            size="medium"
                            @input="param.verification = commonUtils.trimAll(param.verification)"
                        ></el-input>

                        <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                            <img
                                id="imgIdentifyingCode"
                                style="height:32px; width: 80px; cursor: pointer;"
                                alt="点击更换"
                                title="点击更换"
                                :src="codeImg"
                            />
                        </div>
                        <!-- <div class="text" v-if="show">请输入验证码</div> -->
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="checkForm" :disabled="submitting">登录</el-button>
                    </div>
                    <div class="text" style="text-align: center;">{{errMsg}}</div>
                </el-form>
                <!-- <button @click="test">调试</button> -->
            </div>
        </div>
        <div class="footer">
            <foot></foot>
        </div>
    </div>
</template>

<script>
import AESUTIL from '../../assets/js/encryption.js';
import AESUTILNormal from '../../assets/js/AESUTILNormal';
import decryptAPIAESUTIL from '../../assets/js/decryptAPIAESUTIL';
import pwdmd5 from '../../assets/js/pwdmd5';
import CryptoJS from 'crypto-js';
import foot from './footer.vue';
import commonUtils from '../../utils/commonUtils.js';

export default {
    data: function() {
        return {
            commonUtils: commonUtils,
            codeImg: '',
            codeID: '',
            show: false,
            submitting: false,
            param: {
                username: '',
                password: '',
                verification: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                verification: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            errMsg: ''
        };
    },
    created() {
        this.getCode();
        let that = this;
        document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which;
            if (keycode == 13 && !this.submitting) {
                that.checkForm(); // 登录方法名
                return false;
            }
        };
    },
    methods: {
        getIdentifyingCode: function(bRefresh) {
            this.getCode();
        },

        //获取验证码
        getCode() {
            let requestPath = this.$store.state.Login.url + '/exchange/account/getValidCode';
            // console.log(this.$store.state.Login.url);
            this.$axios
                .post(requestPath, {})
                .then(res => {
                    let body = JSON.parse(res.data.body);

                    this.codeImg = `data:image/jpg;base64,${body.data.validImg}`;
                    this.codeID = body.data.validId;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        blur() {
            if (this.param.verification.length == 0) {
                this.show = true;
            } else {
                this.show = false;
            }
        },
        checkForm() {
            this.$refs['login'].validate(valid => {
                if (!valid || this.submitting) {
                    return false;
                }
                this.submitting = true;
                let action = this.$store.state.Login.url + '/exchange/account/login';
                // 加密处理
                var curTime = new Date().getTime();
                var hs_pwd = AESUTIL(this.param.username + '_' + this.param.password, this.param.username + '|' + curTime);
                let pwd1 = CryptoJS.enc.Utf8.parse(hs_pwd);

                var bd = {
                    encryptData: hs_pwd,
                    loginTime: curTime,
                    account: this.param.username,

                    validId: this.codeID,
                    validCode: this.param.verification
                };
                this.errMsg = '';
                // post请求
                this.$axios
                    .post(action, {
                        body: bd
                    })
                    .then(res => {
                        this.submitting = false;
                        let loginData = JSON.parse(res.data.body);
                        // console.log(res);
                        if (loginData.errCode >= 0) {
                            this.$store.commit('setLogin', loginData);
                            this.getList();
                        } else {
                            this.errMsg = loginData.errMsg;
                            this.getCode();
                        }
                    })
                    .catch(error => {
                        this.submitting = false;
                        console.log(error);
                    });
            });
        },
        //获取导航菜单的方法
        getList() {
            let requestPath = this.$store.state.Login.url + '/exchange/account/getFuncList';
            let sid = this.$store.state.Login.loginData.data.sessionId;

            this.$axios
                .post(requestPath, { sid: sid, body: '' })
                .then(res => {
                    let bd = JSON.parse(res.data.body);
                    let actionList = bd.data.actionList;
                    // console.log(actionList);
                    let menuList = bd.data.funcTree;
                    this.$store.commit('setmenuList', menuList);
                    //console.log(menuList);
                    this.$store.commit('setactionList', actionList);
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                    console.log(error);
                });
        }

        // 这是获取城市地址的方法
        // getaddress() {
        //     let action = this.$store.state.Login.url + '/31009';
        //     let loginData = JSON.parse(this.$store.state.Login.loginData);

        //     var storage = window.localStorage;
        //     let AddressList = storage.AddressList;
        //     if (AddressList) {
        //         let restaurants = JSON.parse(AddressList);
        //         this.$store.commit('setaddressList', restaurants);
        //     } else {
        //         var bd = {
        //             tid: loginData.tid,
        //             vn: '20190101'
        //         };
        //         this.$axios
        //             .post(action, {
        //                 hd: {
        //                     pi: 31009,
        //                     sq: 8,
        //                     si: loginData.si
        //                 },
        //                 bd: bd
        //             })
        //             .then(res => {
        //                 let assetsData = JSON.parse(res.data.bd);
        //                 let assetsList = assetsData.olst;
        //                 let restaurants = [];
        //                 assetsList.map(item => {
        //                     restaurants.push({ value: item.mne, address: item.ne, id: item.id });
        //                 });
        //                 storage.AddressList = JSON.stringify(restaurants);
        //                 this.$store.commit('setaddressList', restaurants);
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // }
    },
    components: {
        foot
    }
};
</script>

<style lang="scss" scoped>
.el-input {
    height: 40px;
    /deep/.el-input__inner {
        height: 40px;
    }
}
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.top {
    box-sizing: border-box;
    height: 88px;
    width: 100%;
    display: flex;
    padding: 22px 100px;
    align-items: center;
    background-color: #020429;
    // border-bottom: 1px solid #ccc;

    .title {
        width: 50%;

        // img {
        //     height: 60px;
        //     width: 340px;
        // }
    }
}

.center {
    flex: 1;
    background-image: url(../../assets/img/dbg1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    .left {
        // img{
        //     width: 750px;
        //     height: 564px;
        // }
        position: absolute;
        left: 15%;
        top: 20%;
    }
}

.footer {
    height: 240px;
    background: #fff;
    position: relative;
}
.ms-title {
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
    background: #409eff;
    font-weight: 700;
}
.ms-login {
    position: absolute;
    right: 15%;
    top: 40%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    /* background: rgba(255, 255, 255, 1); */
    background-color: hsla(0, 0%, 100%, 0.9);
    overflow: hidden;
}
.ms-content {
    padding: 30px 40px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.divIdentifyingCode {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 82px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    background: #e2e2e2;
    margin: 0;
    img {
        height: 39px !important;
    }
}
.text {
    font-size: 12px;
    line-height: 16px;
    color: #f56c6c;
}
.el-input__inner {
    height: 60px;
}
</style>