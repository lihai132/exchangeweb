<template>
    <div class="Popup">
        <el-dialog :title="title" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- {{traderTypeName}}信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
                                            size="small"
                                            v-model="bean.fMemberId"
                                			:disabled="true"
                                			filterable
                                        >
                                		<el-option
                                		      v-for="item in members"
                                		      :key="item.fDealerId"
                                		      :label="item.dealerCodeName"
                                		      :value="item.fDealerId">
                                		    </el-option>
                                		</el-select>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属机构：</div>
                                        <el-select
                                            size="small"
                                            v-model="bean.fParentId"
                                			:disabled="true"
                                        	filterable
                                        >
                                        <el-option
                                              v-for="item in orgs"
                                              :key="item.fDealerId"
                                              :label="item.dealerCodeName"
                                              :value="item.fDealerId">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
								<div class="line">
									<div class="line-center">
										<div class="name required">{{traderTypeName}}账号：</div>
										<el-input
											size="small"
											placeholder="请输入内容"
											v-model="bean.fMobile"
											style="width:180px"
											maxlength="11"
											:disabled="true"
										></el-input>
									</div>
								    <div class="line-center">
								        <div class="name required">{{traderTypeName}}简称：</div>
								        <el-input
								            size="small"
								            placeholder="请输入内容"
								            v-model="bean.fName"
								            style="width:180px"
											maxlength="128"
											:disabled="true"
								        ></el-input>
								    </div>
								</div>
                            </div>
                        </div>
						
						<div class="news-two">
						    <div class="title">
						        <div class="left">- {{pwdTip}}</div>
						    </div>
						    <div class="nav">
								<div class="line" v-if="bean.showType=='money'">
								    <div class="line-center">
								        <div class="name required">新密码：</div>
								        <el-input
								            size="small"
											type="password"
								            placeholder="请输入新密码"
								            v-model.trim="newPwd"
								            style="width:180px"
											auto-complete="new-password"
											maxlength="6"
											@input="newPwd = commonUtils.trimForDigit(newPwd);change($event)"
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
											maxlength="6"
											@input="confirmPwd = commonUtils.trimForDigit(confirmPwd);change($event)"
								        ></el-input>
								    </div>
								</div>
								
						        <div class="line" v-else>
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
import '../../../../assets/css/popup/popup.css';
import request from '../../../../assets/Public/request.js';
import commonUtils from '../../../../utils/commonUtils.js';
import pwdmd5 from '../../../../assets/js/pwdmd5';
export default {
    // props:["show"],
    data() {
        return {
			commonUtils:commonUtils,
            editVisible: false,
            bean: {},
            confirmPwd:'',
			submitting:false,
			newPwd:"",
			members:[],
			orgs:[],
			pwdTip:'',
			title:'',
			traderTypeName:''
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
			if(this.bean.showType=='money'){
				this.pwdTip='资金密码';
				this.title='重置资金密码';
			}else if(this.bean.showType=='login'){
				this.pwdTip='登录密码';
				this.title='重置登录密码';
			}
			if(this.bean.fTraderType==3){
				this.traderTypeName='调度员';
			}else if(this.bean.fTraderType==4){
				this.traderTypeName='客服';
			}
			if(this.bean.fParentId>0&&this.bean.fMemberId>0){
				this.listMembers();
				this.listOrgs(this.bean.fMemberId);
			}
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
		async listMembers(){
			let members = await request('/account/org/listMember',{});
			this.members = members.data;
		},
		async listOrgs(fDealerId){
			let orgs = await request('/account/broker/listOrgsByMemberId',{"fDealerId":fDealerId});
			this.orgs = orgs.data;
		},
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let newPassword = pwdmd5(bean.fMobile + '_' + this.newPwd);
			var obj = {};
			if(this.bean.showType=='login'){
				obj.fLoginPassword = newPassword;
			}else if(this.bean.showType=='money'){
				obj.fMoneyPassword = newPassword;
			}
			obj.fTraderId = this.bean.fTraderId;
			this.submitting=true;
			let result = await request('/account/trader/resetPassword', obj);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				this.$message.success("重置成功");
			}else if(!commonUtils.isEmpty(result.errMsg)){
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
			if(commonUtils.isEmpty(this.confirmPwd)){
				this.$message.error("确认密码不能为空");
				return false;
			}
			if(bean.showType=='money'){
				var moneyPwdReg = /^\d{6}$/;
				if(!moneyPwdReg.test(this.newPwd)){
					this.$message.error("资金密码须是6位纯数字");
					return false;
				}
				if(!moneyPwdReg.test(this.confirmPwd)){
					this.$message.error("确认密码须是6位纯数字");
					return false;
				}
			}else{
				if(!commonUtils.loginPwdRegTest(this.newPwd)){
					this.$message.error("密码须是8-16位数字、字母、符号组成");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.confirmPwd)){
					this.$message.error("确认密码须是8-16位数字、字母、符号组成");
					return false;
				}
			}
			
			if(this.confirmPwd!==this.newPwd){
				this.$message.error("两次密码不一致");
				return false;
			}
			if(!(bean.fMobile)){
				this.$message.error("信息丢失");
				return false;
			}
			return true;
		},
    }
};
</script>

