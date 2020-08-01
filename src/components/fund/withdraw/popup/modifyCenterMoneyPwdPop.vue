<template>
    <div class="Popup">
        <el-dialog title="修改资金密码" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">修改资金密码</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">交易中心编号：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fCode"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name required">交易中心简称：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fName"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
								<div class="line">
									<div class="line-center">
									    <div class="name required">旧密码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入旧密码"
									        v-model.trim="oldPwd"
									        style="width:180px"
											type="password"
											auto-complete="new-password"
											maxlength="6"
											@input="oldPwd=commonUtils.trimForDigit(oldPwd);$forceUpdate()"
									    ></el-input>
									</div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">新密码：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入新密码"
                                            v-model.trim="newPwd"
                                            style="width:180px"
											type="password"
											auto-complete="new-password"
											maxlength="6"
											@input="newPwd=commonUtils.trimForDigit(newPwd);$forceUpdate()"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name required">确认密码：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请再次输入新密码"
                                            v-model.trim="confirmPwd"
                                            style="width:180px"
											type="password"
											auto-complete="new-password"
											maxlength="6"
											@input="confirmPwd=commonUtils.trimForDigit(confirmPwd);$forceUpdate()"
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
import '../../../../assets/css/popup/popup.css';
import request from '../../../../assets/Public/request.js';
import commonUtils from '../../../../utils/commonUtils.js';
import pwdmd5 from '../../../../assets/js/pwdmd5';
export default {
    data() {
        return {
			commonUtils:commonUtils,
            editVisible: false,
            bean: {},
            confirmPwd:'',
			newPwd:'',
			submitting:false,
			fAcount:'',
			oldPwd:''
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        
        async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.newPwd='';
			this.confirmPwd='';
			this.oldPwd='';
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
			//let result = await request('/account/admin/getFAcountByFDealerId', {"fDealerId":this.bean.fDealerId});
			this.fAcount=this.bean.fCode;
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
			let obj = {};
			obj.fDealerId = bean.fDealerId;
			obj.newPwd=pwdmd5(this.fAcount+"_"+this.newPwd);
			obj.oldPwd=pwdmd5(this.fAcount+"_"+this.oldPwd);
			this.submitting=true;
			let result = await request('/account/center/modifyMoneyPwd', obj);
			this.submitting=false;
            if(result.data==1){
            	this.editVisible = false;
            	this.$message.success("重置成功");
            }else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(this.oldPwd)){
				this.$message.error("旧密码不能为空");
				return false;
			}
			if(commonUtils.isEmpty(this.newPwd)){
				this.$message.error("新密码不能为空");
				return false;
			}
			let pwdLen = this.newPwd.length;
			if(pwdLen<6||pwdLen>16){
				this.$message.error("新密码须是6~16个字符");
				return false;
			}
			if(commonUtils.isEmpty(this.confirmPwd)){
				this.$message.error("确认密码不能为空");
				return false;
			}
			if(this.confirmPwd!==this.newPwd){
				this.$message.error("两次密码不一致");
				return false;
			}
			if(commonUtils.isEmpty(this.fAcount)){
				this.$message.error("账号信息有误");
				return false;
			}
			return true;
		},
    }
};
</script>

