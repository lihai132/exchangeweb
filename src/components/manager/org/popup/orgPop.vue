<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 机构信息</div>
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
											:disabled="bean.fDealerId>0"
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
                                <div class="line" v-show="bean.fDealerId>0">
                                    <div class="line-center">
                                        <div class="name required">机构编号：</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入机构编号"
                                            v-model="bean.fCode"
                                            style="width:180px"
											:disabled="true"
                                        ></el-input>
                                    </div>
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">机构简称：</div>
								        <el-input
								            size="small"
								            placeholder="请输入机构简称"
								            v-model.trim="bean.fName"
								            style="width:180px"
											maxlength="32"
											:disabled="bean.showType=='detail'"
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
											:disabled="bean.showType=='detail'"
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
											:disabled="bean.showType=='detail'"
										></el-input>
									</div>
							    </div>
								<div class="line">
									<div class="line-center">
										<div class="name required">业务佣金：</div>
										<el-input
											size="small"
											placeholder="请输入业务佣金"
											v-model="fBusnessReward"
											style="width:180px"
											maxlength="6"
											@input="rewardChange"
											ref="RewardInputRef"
											:disabled="bean.showType=='detail'"
										></el-input>%
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
			cityOptions:[],
			groupOptions:[],
			members:[],
			fBusnessReward:''
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.selectedCitys = [];
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
            if(this.bean.showType=='add'){
            	this.titleName='新增机构';
				this.fBusnessReward='';
				this.loginPwd='';
				this.moneyPwd='';
				this.confirmLoginPwd='';
				this.confirmMoneyPwd='';
            }else if(this.bean.showType=='update'){
            	this.titleName='修改机构';
				this.fBusnessReward = this.bean.fBusnessReward*100;
            }else if(this.bean.showType=='detail'){
				this.titleName='机构详情';
				this.fBusnessReward = this.bean.fBusnessReward*100;
			}
			let members = await request('/account/org/listMember',{});
			this.members = members.data;
			if(this.bean.showType!='add'){
				let has = false;
				for(var i=0;i<this.members.length;i++){
					let mb = this.members[i];
					if(this.bean.fMemberId==mb.fDealerId){
						has = true;
						break;
					}
				}
				if(!has){
					var obj = {};
					obj.fDealerId=this.bean.fMemberId;
					obj.dealerCodeName=this.bean.memberCodeName;
					this.members.push(obj);
					console.log(this.members)
				}
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
		rewardChange(){
			this.fBusnessReward=commonUtils.trimForDigit(this.fBusnessReward,{'maxPrecision':4});
			var rate;
			while (this.fBusnessReward&&(rate = parseFloat(this.fBusnessReward))>100) {
				this.fBusnessReward = this.fBusnessReward.substring(0, this.fBusnessReward.length - 1);
				//this.$refs.RewardInputRef.$el.children[0].focus();
			}
		},
		codeBlur(event){
			let val = event.target.value;
			if(!commonUtils.isEmpty(val)){
				if(!(/^\d{3}$/.test(val))){
					this.$message.error("运营商编号格式有误，须是三位数字编号");
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
				url='/account/org/add';
			}else if(bean.showType=='update'){
				url='/account/org/update';
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
			if(commonUtils.isEmpty(bean.fName)){
				this.$message.error("机构简称不能为空");
				return false;
			}
			if(bean.fName.length>32){
				this.$message.error("机构简称不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fOperateName)){
				this.$message.error("负责人名称不能为空");
				return false;
			}
			if(bean.fOperateName.length>32){
				this.$message.error("负责人名称不能超过32个字符");
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
			if(commonUtils.isEmpty(this.fBusnessReward)){
				this.$message.error("业务佣金不能为空");
				return false;
			}
			if(isNaN(this.fBusnessReward)){
				this.$message.error("业务佣金须是数字");
				return false;
			}
			var rate = parseFloat(this.fBusnessReward);
			if(rate<0){
				this.$message.error("业务佣金不能小于0");
				return false;
			}
			if(rate>100){
				this.$message.error("业务佣金不能大于100%");
				return false;
			}
			bean.fBusnessReward=parseFloat((rate/100).toFixed(6));
			if(bean.showType=='add'||!(bean.fDealerId>0)){
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
				bean.loginPwd=window.btoa(this.loginPwd);
				bean.moneyPwd=window.btoa(this.moneyPwd);
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


