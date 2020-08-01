<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px"  :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 基本信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">所属运营商：</div>
								        <el-select
								            size="small"
											style="width:180px"
								            placeholder="请搜索/选择运营商"
								            v-model="bean.fMemberId"
											:disabled="bean.fTraderId>0"
											@change="memberSelected"
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
                                        <div class="name">所属机构：</div>
                                        <el-select
                                            size="small"
											style="width:180px"
                                            :placeholder="orgTip"
                                            v-model="bean.fOrgId"
											:disabled="bean.fTraderId>0"
											@change="orgSelected"
                                        	filterable
											clearable
                                        >
                                        <el-option
                                              v-for="item in orgs"
                                              :key="item.fDealerId"
                                              :label="item.dealerCodeName"
                                              :value="item.fDealerId">
                                            </el-option>
                                        </el-select>
                                    </div>
									<div class="line-center">
									    <div class="name">所属经纪人：</div>
									    <el-select
									        size="small"
											style="width:180px"
									        :placeholder="brokerTip"
									        v-model="bean.fBrokerId"
											:disabled="bean.fTraderId>0"
											@change="change"
									    	filterable
											clearable
									    >
									    <el-option
									          v-for="item in brokers"
									          :key="item.fDealerId"
									          :label="item.dealerCodeName"
									          :value="item.fDealerId">
									        </el-option>
									    </el-select>
									</div>
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">司机简称：</div>
								        <el-input
								            size="small"
								            placeholder="请输入司机简称"
								            v-model.trim="bean.fName"
								            style="width:180px"
											maxlength="32"
											:disabled="bean.showType=='detail'"
								        ></el-input>
								    </div>
									<div class="line-center">
										<div class="name required">手机号码：</div>
										<el-input
											size="small"
											placeholder="请输入司机手机"
											v-model="bean.fMobile"
											style="width:180px"
											maxlength="11"
											:disabled="bean.fTraderId>0"
											@blur="mobileBlur"
											@input="mobileChange"
											ref="mobileInputRef"
										></el-input>
									</div>
								</div>
                                <div class="line">
									<div class="line-center">
									    <div class="name required">账号状态：</div>
									    <el-select
									        v-model="bean.fAccountStatus"
									        class="handle-select"
									        style="width:180px"
											:disabled="bean.showType=='detail'"
									    >
									        <el-option key="1" label="启用" value="1"></el-option>
									        <el-option key="2" label="禁用" value="2"></el-option>
									    </el-select>
									</div>
							    </div>
							</div>
                        </div>
						
                        <div class="news-two" v-show="this.bean.showType=='add'">
                            <div class="title">
                                <div class="left">- 密码信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
									<div class="line-center">
									    <div class="name required">司机账号：</div>
									    <el-input
											placeholder="请先填写司机手机"
									        size="small"
									        :disabled="true"
									        v-model="fAccount"
									        style="width:180px"
											maxlength="32"
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
                        					:disabled="bean.showType=='detail'"
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
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	}
	input[type="number"]{
	  -moz-appearance: textfield;
	}
</style>
<script>
import '../../../../assets/css/popup/popup.css';
import request from '../../../../assets/Public/request.js';
import commonUtils from '../../../../utils/commonUtils.js';
import pwdmd5 from '../../../../assets/js/pwdmd5.js';
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
			orgTip:'',
			brokerTip:'',
			members:[],
			orgs:[],
			brokers:[],
			fAccount:'',
			fBusnessReward:'',
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.orgs = [];
			this.orgTip="请先选择运营商";
			this.brokerTip="请先选择运营商";
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
            if(this.bean.showType=='add'){
				this.bean.fAccountStatus='1';
				this.titleName='新增司机';
				this.loginPwd='';
				this.moneyPwd='';
				this.confirmLoginPwd='';
				this.confirmMoneyPwd='';
				this.fAccount='';
            }else if(this.bean.showType=='update'){
            	this.titleName='修改司机';
            }else if(this.bean.showType=='detail'){
				this.titleName='司机详情';
			}
			if(this.bean.fAccountStatus>0){
				this.bean.fAccountStatus = this.bean.fAccountStatus+'';
			}
			this.listMembers();
			if(this.bean.fOrgId>0){
				this.listOrgs(this.bean.fMemberId);
				if(this.bean.fBrokerId>0){
					this.listBrokers(this.bean.fOrgId);
				}else{
					this.bean.fBrokerId='';
				}
			}else{
				this.bean.fOrgId='';
				this.bean.fBrokerId='';
			}
        },
		change (e) {
		      this.$forceUpdate()
		},
		rewardChange(){
			var regu = /^[0-9]+\.?[0-9]*$/;
			if (!regu.test(this.fBusnessReward)) {
				let val = this.fBusnessReward.substring(0, this.fBusnessReward.length - 1);
				if(isNaN(val)){
					this.fBusnessReward = '';
				}else{
					this.fBusnessReward = val;
				}
				this.$refs.RewardInputRef.$el.children[0].focus();
			}
		},
		orgSelected(fDealerId){
			this.listBrokers(fDealerId);
			this.brokerTip="请选择经纪人";
			this.bean.fBrokerId="";
		},
		memberSelected(fDealerId){
			this.listOrgs(fDealerId);
			this.orgTip="请选择机构";
			this.bean.fParentId = '';
			this.brokerTip="请先选择机构";
		},
		async listMembers(){
			let members = await request('/account/org/listMember',{});
			this.members = members.data;
		},
		async listOrgs(fDealerId){
			let orgs = await request('/account/broker/listOrgsByMemberId',{"fDealerId":fDealerId});
			this.orgs = orgs.data;
		},
		async listBrokers(orgId){
			let brokers = await request('/account/broker/listBrokersByOrgId',{"fDealerId":orgId});
			this.brokers = brokers.data;
		},
		rewardChange(){
			var regu = /^[0-9]+\.?[0-9]*$/;
			if (!regu.test(this.fBusnessReward)) {
				this.fBusnessReward = this.fBusnessReward.substring(0, this.fBusnessReward.length - 1);
				this.$refs.RewardInputRef.$el.children[0].focus();
			}
		},
		mobileBlur(){
			let mphone = this.bean.fMobile;
			if(mphone){
				let isInvalid = true;
				if(!this.mobileChange()||(isInvalid=commonUtils.isInvalidMobilePhone(mphone))){
					var that = this;
					setTimeout(function () {
					  if(that.editVisible){
						  that.$message.error("手机号格式有误");
						  return false;
					  }
					},300);
				}
				if(isInvalid&&commonUtils.isInvalidMobilePhone(mphone)){
					this.fAccount='';
				}else{
					this.fAccount=mphone;
				}
			}
		},
		mobileChange(){
			if(this.bean.fMobile){
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
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			if(this.bean.showType=='detail'){
				this.editVisible = false;
				return;
			}
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let url = "";
			if(bean.showType=='add'){
				url='/account/driver/add';
			}else if(bean.showType=='update'){
				url='/account/trader/update';
			}
			this.submitting=true;
            let result = await request(url, this.bean);
            this.submitting=false;
            if(result.data>0){
            	this.editVisible = false;
            	if(this.bean.showType=='update'){
            		this.$message.success("修改成功");
            	}else if(this.bean.showType=='add'){
            		this.$message.success("新增成功");
            	}else{
            		this.$message.success("操作成功");
            	}
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(bean.fMemberId)||bean.fMemberId<=0){
				this.$message.error("请选择所属运营商");
				return false;
			}
			bean.fParentId = bean.fMemberId;
			if(bean.fOrgId>0){
				bean.fParentId = bean.fOrgId;
			}
			if(bean.fBrokerId>0){
				bean.fParentId = bean.fBrokerId;
			}
			if(commonUtils.isEmpty(bean.fName)){
				this.$message.error("司机简称不能为空");
				return false;
			}
			if(bean.fName.length>32){
				this.$message.error("司机简称不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fAccountStatus)||bean.fAccountStatus<=0){
				this.$message.error("请选择账号状态");
				return false;
			}
			if(commonUtils.isEmpty(bean.fMobile)){
				this.$message.error("手机号码不能为空");
				return false;
			}
			if(commonUtils.isInvalidMobilePhone(bean.fMobile)){
				this.$message.error("手机号码格式有误");
				return false;
			}
			if(bean.showType=='add'||!(bean.fTraderId>0)){
				if(commonUtils.isEmpty(this.loginPwd)){
					this.$message.error("登录密码不能为空");
					return false;
				}
				if(!commonUtils.loginPwdRegTest(this.loginPwd)){
					this.$message.error("登录密码须是8-16位数字、字母、符号组成");
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
					this.$message.error("资金密码不能为空");
					return false;
				}
				if(commonUtils.isEmpty(this.confirmMoneyPwd)){
					this.$message.error("资金确认密码不能为空");
					return false;
				}
				var moneyPwdReg = /^\d{6}$/;
				if(!moneyPwdReg.test(this.moneyPwd)){
					this.$message.error("资金密码须是6位纯数字");
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
				bean.loginPwd=pwdmd5(bean.fMobile + '_' + this.loginPwd);
				bean.moneyPwd=pwdmd5(bean.fMobile + '_' + this.moneyPwd);
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

