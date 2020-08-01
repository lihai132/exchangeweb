<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left" style="width: 130px;">- 运营中心信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">运营中心编号：</div>
								        <el-input
								            size="small"
								            placeholder="请输入两位数字编号"
								            v-model="bean.fCode"
								            style="width:180px"
											maxlength="2"
											@blur="codeBlur($event)"
											:disabled="bean.fDealerId>0"
											@input="codeChange"
											ref="codeInputRef"
								        ></el-input>
								    </div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营中心简称：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入运营中心简称"
                                            v-model.trim="bean.fName"
                                            style="width:180px"
											maxlength="32"
                                        ></el-input>
                                    </div>
									<div class="line-center">
									    <div class="name">联系电话：</div>
									    <el-input
									        size="small"
									        placeholder="请输入联系电话"
									        v-model="bean.fPhone"
									        style="width:180px"
											maxlength="24"
									    ></el-input>
									</div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">负责人：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入负责人名称"
                                            v-model.trim="bean.fOperateName"
                                            style="width:180px"
											maxlength="32"
                                        ></el-input>
									</div>
									<div class="line-center">
										<div class="name required">负责人手机：</div>
										<el-input
											size="small"
											placeholder="请输入负责人手机"
											v-model="bean.fOperateMobile"
											style="width:180px"
											maxlength="11"
											@blur="mobileBlur"
											@input="mobileChange"
											ref="mobileInputRef"
										></el-input>
									</div>
							    </div>
								<div class="line">
									<div class="line-center">
										<div class="name required">企业地址：</div>
										<el-input
											size="small"
											placeholder="请输入企业地址"
											v-model="bean.fAddress"
											style="width:510px"
											maxlength="80"
										></el-input>
									</div>
								</div>
							</div>
                        </div>
                        <div class="news-two" v-show="this.bean.showType==1">
                            <div class="title">
                                <div class="left">- 管理员信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">管理员账户：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入管理员账户"
                                            v-model.trim="bean.fAccount"
                                            style="width:180px"
											maxlength="16"
											@change="accountChange()"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">登录密码：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入登录密码"
                                            v-model.trim="loginPwd"
                                            style="width:180px"
											type="password"
											autocomplete="new-password"
											maxlength="16"
                                        ></el-input>
                                    </div>
									<div class="line-center">
									    <div class="name required">确认密码：</div>
									    <el-input
									        size="small"
									        placeholder="请再次输入登录密码"
									        v-model.trim="confirmLoginPwd"
									        style="width:180px"
											type="password"
											autocomplete="new-password"
											maxlength="16"
									    ></el-input>
									</div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">资金密码：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入资金密码"
                                            v-model.trim="moneyPwd"
                                            style="width:180px"
											type="password"
											autocomplete="new-password"
											maxlength="6"
											@input="moneyPwd = commonUtils.trimForDigit(moneyPwd);change($event)"
                                        ></el-input>
                                    </div>
									<div class="line-center">
									    <div class="name required">确认密码：</div>
									    <el-input
									        size="small"
									        placeholder="请再次输入资金密码"
									        v-model.trim="confirmMoneyPwd"
									        style="width:180px"
											type="password"
											autocomplete="new-password"
											maxlength="6"
											@input="confirmMoneyPwd = commonUtils.trimForDigit(confirmMoneyPwd);change($event)"
									    ></el-input>
									</div>
                                </div>
                            </div>
                        </div>
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 描述信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">描述信息：</div>
                                        <el-input
                                            size="small"
                                        	type="textarea"
                                            placeholder="请输入描述信息"
                                            v-model="bean.fDescn"
                                            style="width:420px;"
                                        	maxlength="64"
											rows="5"
											autoHeight="true"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine" :disabled="submitting">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<style>
	.required:before {
		content: '* ';
		color: red;
	}
</style>
<script>
import '../../assets/css/popup/popup.css';
import request from '../../assets/Public/request.js';
import commonUtils from '../../utils/commonUtils.js';
import pwdmd5 from '../../assets/js/pwdmd5.js';
export default {
    data() {
        return {
			commonUtils:commonUtils,
            editVisible: false,
            confirmLoginPwd: '',
            confirmMoneyPwd: '',
			loginPwd:'',
			moneyPwd:'',
			bean:{},
			titleName: '',
			accountInput:false,
			submitting:false,
            options1: [],
            options2: [],
            value1: '',
            value2: '',
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
            if(this.bean.showType==1){
            	this.titleName='新增运营中心';
				this.loginPwd='';
				this.moneyPwd='';
				this.confirmLoginPwd='';
				this.confirmMoneyPwd='';
				this.getNextCode();
            }else if(this.bean.showType==2){
            	this.titleName='修改运营中心基本信息';
            }
        },
		mobileBlur(){
			let mphone = this.bean.fOperateMobile;
			if(mphone){
				if(!this.mobileChange()||commonUtils.isInvalidMobilePhone(mphone)){
					var that = this;
					setTimeout(function () {
					  if(that.editVisible){
						  that.$message.error("手机号格式有误");
						  return false;
					  }
					},300);
				}
			}
		},
		mobileChange(){
			if(this.bean.fOperateMobile){
				var reg=/^\d{1,11}$/;
				if(!reg.test(this.bean.fOperateMobile)){
					while(this.bean.fOperateMobile.length>0){
						let val = this.bean.fOperateMobile.substring(0, this.bean.fOperateMobile.length - 1);
						this.bean.fOperateMobile = val;
						if(isNaN(val)){
							continue;
						}
						break;
					}
					this.$refs.mobileInputRef.$el.children[0].focus();
					return false;
				}
				return true;
			}
		},
		change (e) {
		      this.$forceUpdate()
		},
		codeChange(){
			var regu = /^\d{1,2}$/;
			if (this.bean.fCode&&!regu.test(this.bean.fCode)) {
				this.bean.fCode = this.bean.fCode.substring(0, this.bean.fCode.length - 1);
				this.$refs.codeInputRef.$el.children[0].focus();
			}
			this.$forceUpdate();
		},
		async getNextCode(){
			let nextCode = await request('/account/center/getNextCode',{});
			this.bean.fCode = nextCode.data;
			this.bean.fAccount = this.bean.fCode+"_admin";
			this.$forceUpdate();
		},
		codeBlur(event){
			let val = event.target.value;
			if(!commonUtils.isEmpty(val)){
				if(!(/^\d{2}$/.test(val))){
					this.$message.error("运营中心编号格式有误，须是两位数字编号");
					this.codeChange();
					return false;
				}
				if(!this.accountInput){
					this.bean.fAccount = val+"_admin";
					this.change();
				}
			}
		},
		accountChange(){
			let val = this.bean.fAccount;
			if(commonUtils.isEmpty(val)){
				this.accountInput=false;
			}else{
				this.accountInput=true;
			}
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let url = "";
			if(bean.showType==1){
				url='/account/center/add';
			}else if(bean.showType==2){
				url='/account/center/update';
			}
			this.submitting=true;
            let result = await request(url, this.bean);
            this.submitting=false;
            if(result.data>=0){
            	this.editVisible = false;
            	if(this.bean.showType==2){
            		this.$message.success("修改成功");
            	}else if(this.bean.showType==1){
            		this.$message.success("新增成功");
            	}else{
            		this.$message.success("操作成功");
            	}
				this.$parent.getData();
            }else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(bean.fCode)){
				this.$message.error("运营中心编号不能为空");
				return false;
			}
			if(!(/^\d{2}$/.test(bean.fCode))){
				this.$message.error("运营中心编号格式有误，须是两位数字编号");
				return false;
			}
			if(commonUtils.isEmpty(bean.fName)){
				this.$message.error("运营中心简称不能为空");
				return false;
			}
			if(bean.fName.length>32){
				this.$message.error("运营中心简称不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fOperateName)){
				this.$message.error("负责人不能为空");
				return false;
			}
			if(bean.fOperateName.length>32){
				this.$message.error("负责人不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fOperateMobile)){
				this.$message.error("负责人手机不能为空");
				return false;
			}
			if(commonUtils.isInvalidMobilePhone(bean.fOperateMobile)){
				this.$message.error("负责人手机格式有误");
				return false;
			}
			if(commonUtils.isEmpty(bean.fAddress)){
				this.$message.error("企业地址不能为空");
				return false;
			}
			if(bean.fAddress.length>80){
				this.$message.error("企业地址不能超过80个字符");
				return false;
			}
			if(bean.showType==1||!(bean.fDealerId>0)){
				if(commonUtils.isEmpty(bean.fAccount)){
					this.$message.error("管理员账户不能为空");
					return false;
				}
				if(!commonUtils.loginAccountRegTest(bean.fAccount)){
					this.$message.error("管理员账户须是4-16位字母，数字，下划线组成");
					return false;
				}
				if(commonUtils.isEmpty(this.loginPwd)){
					this.$message.error("管理员密码不能为空");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.loginPwd)){
					this.$message.error("管理员密码须是8-16位数字、字母、符号组成");
					return false;
				}
				if(commonUtils.isEmpty(this.confirmLoginPwd)){
					this.$message.error("登录确认密码不能为空");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.confirmLoginPwd)){
					this.$message.error("登录确认密码须是8-16位数字、字母、符号组成");
					return false;
				}
				if(this.confirmLoginPwd!==this.loginPwd){
					this.$message.error("两次登录密码不一致");
					return false;
				}
				if(commonUtils.isEmpty(this.moneyPwd)){
					this.$message.error("管理员资金密码不能为空");
					return false;
				}
				if(commonUtils.isEmpty(this.confirmMoneyPwd)){
					this.$message.error("资金确认密码不能为空");
					return false;
				}
				var moneyPwdReg = /^\d{6}$/;
				if(!moneyPwdReg.test(this.moneyPwd)){
					this.$message.error("管理员资金密码须是6位纯数字");
					return false;
				}
				if(!moneyPwdReg.test(this.confirmMoneyPwd)){
					this.$message.error("资金确认密码须是6位纯数字");
					return false;
				}
				if(this.confirmMoneyPwd!==this.moneyPwd){
					this.$message.error("两次资金密码不一致");
					return false;
				}
				bean.loginPwd=pwdmd5(bean.fAccount + '_' + this.loginPwd);
				bean.moneyPwd=pwdmd5(bean.fAccount + '_' + this.moneyPwd);
			}
			if(!commonUtils.isEmpty(bean.fDescn)&&bean.fDescn.length>64){
				this.$message.error("描述信息太长了，不能超过64个字符");
				return false;
			}
			return true;
		}
    }
};
</script>

