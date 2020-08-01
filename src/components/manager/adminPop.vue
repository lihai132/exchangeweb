<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
				<!-- <el-form :rules="rules" :model="ruleForm" ref="ruleForm"> -->
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left" style="width: 140px;">- {{oneTitle}}</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">登录账号:</div>
                                        <el-input
                                            size="small"
                                            v-model.trim="bean.fAccount"
                                            style="width:180px"
											:disabled="bean.fAdminId>0"
											maxlength="16"
											placeholder="请输入登录账号"
											@input="bean.fAccount = commonUtils.trimAll(bean.fAccount)"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name required">账号名称:</div>
                                        <el-input
                                            size="small"
                                            v-model.trim="bean.fFullName"
                                            style="width:180px"
											:disabled="bean.showType==1||bean.showType==3"
											maxlength="16"
											placeholder="请输入账号名称"
											@input="bean.fFullName = commonUtils.trimForAccountName(bean.fFullName)"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line" v-show="bean.showType!=3">
                                   <div class="line-center">
                                       <div class="name required">账号状态:</div>
                                       <el-select
                                           v-model="bean.fStatus"
                                           placeholder="请选择账号状态"
                                           style="width:180px"
										   :disabled="bean.showType==1"
                                       >
                                           <el-option
                                               v-for="item in status"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"
                                           ></el-option>
                                       </el-select>
                                   </div>
                                    <div class="line-center" v-show="bean.showType!=3">
                                        <div class="name required">手机号码:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入手机号码"
                                            v-model="bean.fMobile"
                                            style="width:180px"
											:disabled="bean.showType==1"
											maxlength="11"
											@blur="mobileBlur"
											@input="mobileChange"
											ref="mobileInputRef"
                                        ></el-input>
                                    </div>
                                </div>
								<div class="line">
								    <div class="line-center" v-show="bean.showType==3||bean.showType==4">
								        <div class="name required">管理密码:</div>
								        <el-input type="password"
								            size="small"
								            v-model.trim="newPwd"
								            style="width:180px"
											autocomplete="new-password"
											maxlength="16"
											placeholder="请输入密码"
											@input="newPwd = commonUtils.trimAll(newPwd)"
								        ></el-input>
								    </div>
								    <div class="line-center" v-show="bean.showType==3||bean.showType==4">
								        <div class="name required">确认密码:</div>
								        <el-input type="password"
								            size="small"
											@input="confirmPwd = commonUtils.trimAll(confirmPwd);change($event)"
								            v-model.trim="confirmPwd"
								            style="width:180px"
											autocomplete="new-password"
											maxlength="16"
											placeholder="请再次输入密码"
								        ></el-input>
								    </div>
								</div>
								<div class="line" v-show="bean.showType!=3">
								    <div class="line-center" style="padding-left: 52px;">
								        <el-checkbox
								            size="small"
								            placeholder="请输入内容"
											@input="change($event)"
								            v-model="bean.canLoginRisk"
								            style="width:180px"
											:disabled="bean.showType==1"
								        >
										是否允许登录风控端
										</el-checkbox>
								    </div>
								</div>
								<div style="margin: 25px;"></div>
								<div class="news-two" v-show="bean.showType!=3">
								    <div class="title">
								        <div class="left" style="width: 140px;">- 描述信息</div>
								    </div>
								    <div class="nav">
								        <div class="line">
								            <div class="line-center" style="padding-top:15px">
								                <div class="name">描述:</div>
								                <el-input
								                    size="small"
								        			type="textarea"
								                    placeholder="请输入描述"
								                    v-model="bean.fDescn"
								                    style="width:487px;"
								        			:disabled="bean.showType==1"
								        			maxlength="64"
								        			rows="8"
								        			autoHeight="true"
								                ></el-input>
								            </div>
								        </div>
								    </div>
								</div>
								
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine('ruleForm')" :disabled="submitting">确定</el-button>
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
			submitting:false,
            bean:{},
			newPwd:"",
			confirmPwd:'',
			oneTitle:'',
            status: [
                {
                    value: '1',
                    label: '启用'
                },
                {
                    value: '2',
                    label: '禁用'
                }
            ],
            titleName: '',
			ruleForm:{
				fAccount:''
			},
			rules:{
				fAccount: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' },
					{ min: 1, max: 32, message: '长度不能超过{{max}}字符', trigger: 'blur' }
				],
			}
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.newPwd="";
			this.confirmPwd="";
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
			if(this.bean.fStatus!=null&&this.bean.fStatus!=undefined){
				this.bean.fStatus = this.bean.fStatus+"";
			}
			if(this.bean.showType==1||this.bean.showType==2||this.bean.showType==4){
				if(this.bean.fEnableLoginRisk==1){
					this.bean.canLoginRisk=true;
				}else{
					this.bean.canLoginRisk=false;
				}
			}
			this.oneTitle='基本信息';
			if(this.bean.showType==1){
				this.titleName='管理员详情';
			}else if(this.bean.showType==2){
				this.titleName='基本信息修改';
			}else if(this.bean.showType==3){
				this.titleName='重置登录密码';
				this.oneTitle='重置登录密码信息';
			}else if(this.bean.showType==4){
				this.titleName='新增管理员';
			}
        },
		mobileBlur(){
			let mphone = this.bean.fMobile;
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
			if((this.bean.fMobile=commonUtils.trimForDigit(this.bean.fMobile))){
				var reg=/^\d{1,11}$/;
				if(!reg.test(this.bean.fMobile)){
					while(this.bean.fMobile.length>0){
						let val = this.bean.fMobile.substring(0, this.bean.fMobile.length - 1);
						this.bean.fMobile = val;
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
        //取消事件
        cancel() {
            this.editVisible = false;
			if(this.bean.showType==3){
				this.bean.fMgrPassword=this.bean.oldPwd;
			}
        },
        //确定事件
       async determine(formName) {
		   if(this.bean.showType==1){
			   this.editVisible = false;
			   return;
		   }
		   let bean = this.bean;
			if(bean.canLoginRisk){
				bean.fEnableLoginRisk=1;
			}else{
				bean.fEnableLoginRisk=2;
			}
			if(!this.checkSubmit(bean)){
				return;
			}
			let url = "";
			if(this.bean.showType==4){
				url='/account/admin/add';
				// 加密处理
				bean.fMgrPassword=pwdmd5(bean.fAccount + '_' + this.newPwd);
			}else if(this.bean.showType==2){
				url='/account/admin/update';
			}else if(this.bean.showType==3){
				url='/account/admin/resetLoginPsw';
				// 加密处理
				bean.fMgrPassword=pwdmd5(bean.fAccount + '_' + this.newPwd);
			}else{
				this.$message.error("未知的操作类型"+this.bean.showType);
				return;
			}
			this.submitting=true;
			let result = await request(url, this.bean);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				if(this.bean.showType==3){
					this.$message.success("密码重置成功");
				}else if(this.bean.showType==2){
					this.$message.success("修改成功");
				}else if(this.bean.showType==4){
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
			if(commonUtils.isEmpty(bean.fAccount)){
				this.$message.error("登录账号不能为空");
				return false;
			}
			if(!commonUtils.loginAccountRegTest(bean.fAccount)){
				this.$message.error("登录账号须是4-16位字母，数字，下划线组成");
				return false;
			}
			if(commonUtils.isEmpty(bean.fFullName)){
				this.$message.error("账号名称不能为空");
				return false;
			}
			if(!commonUtils.accountNameRegTest(bean.fFullName)){
				this.$message.error("账号名称须是2-16位中文，字母，数字组成");
				return false;
			}
			if(commonUtils.isEmpty(bean.fStatus)){
				this.$message.error("请选择账号状态");
				return false;
			}
			if(commonUtils.isEmpty(bean.fMobile)){
				this.$message.error("手机号码不能为空");
				return false;
			}
			if(commonUtils.isInvalidMobilePhone(bean.fMobile)){
				this.$message.error("手机号格式有误");
				return false;
			}
			if(bean.showType!=2){
				if(commonUtils.isEmpty(this.newPwd)){
					this.$message.error("管理密码不能为空");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.newPwd)){
					this.$message.error("管理密码须是8-16位数字、字母、符号组成");
					return false;
				}
				if(commonUtils.isEmpty(this.confirmPwd)){
					this.$message.error("确认密码不能为空");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.confirmPwd)){
					this.$message.error("确认密码须是8-16位数字、字母、符号组成");
					return false;
				}
				if(this.newPwd!==this.confirmPwd){
					this.$message.error("两次密码不一致");
					return false;
				}
			}
			if(!commonUtils.isEmpty(bean.fDescn)&&bean.fDescn>64){
				this.$message.error("账号描述太长了，不能超过64个字符");
				return false;
			}
			return true;
		},
    }
};
</script>

