<template>
    <div class="Popup">
        <el-dialog title="重置密码" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 重置密码</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">管理员账户：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fAccount"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name required">管理员名称：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fFullName"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">新密码：</div>
                                        <el-input
                                            size="small"
											type="password"
                                            placeholder="请输入新密码"
                                            v-model.trim="newPwd"
                                            style="width:180px"
											auto-complete="new-password"
											maxlength="16"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name required">确认密码：</div>
                                        <el-input
                                            size="small"
											type="password"
                                            placeholder="请再次输入新密码"
                                            v-model.trim="confirmPwd"
                                            style="width:180px"
											auto-complete="new-password"
											maxlength="16"
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
import pwdmd5 from '../../assets/js/pwdmd5';
export default {
    // props:["show"],
    data() {
        return {
			commonUtils:commonUtils,
            editVisible: false,
            bean: {},
            confirmPwd:'',
			submitting:false,
			newPwd:""
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.newPwd='';
			this.confirmPwd='';
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
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
			bean.fMgrPassword=pwdmd5(bean.fAccount + '_' + this.newPwd);
			this.submitting=true;
			let result = await request('/account/admin/resetLoginPsw', this.bean);
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
			if(commonUtils.isEmpty(this.newPwd)){
				this.$message.error("新密码不能为空");
				return false;
			}
			if(!commonUtils.loginPwdRegTest(this.newPwd)){
				this.$message.error("密码须是8-16位数字、字母、符号组成");
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
			if(this.confirmPwd!==this.newPwd){
				this.$message.error("两次密码不一致");
				return false;
			}
			return true;
		},
    }
};
</script>

