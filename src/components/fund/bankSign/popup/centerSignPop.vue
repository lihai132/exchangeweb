<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
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
								        <div class="name required">运营中心编号：</div>
								        <el-input
								            size="small"
								            v-model="bean.fCode"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name required">运营中心简称：</div>
									    <el-input
									        size="small"
									        v-model="bean.fName"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								<div class="line">
									<div class="line-center">
									    <div class="name required">运营中心状态：</div>
									    <el-select
									        v-model="bean.fStatus"
									        class="handle-select"
									        style="width:180px"
											:disabled="true"
									    >
									        <el-option key="1" label="待认证" value="1"></el-option>
									        <el-option key="2" label="待签约" value="2"></el-option>
									    	<el-option key="3" label="待激活" value="3"></el-option>
									    	<el-option key="4" label="正常" value="4"></el-option>
									    	<el-option key="5" label="已冻结" value="5"></el-option>
									    	<el-option key="6" label="已终止" value="6"></el-option>
									    </el-select>
									</div>
									<div class="line-center">
									    <div class="name required">市场签约账号：</div>
									    <el-input
									        size="small"
									        v-model="bean.fSignAccount"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								
							</div>
                        </div>
						<div class="news-two">
							<div class="title">
							    <div class="left">- 企业信息</div>
							</div>
							<div class="nav">
								<div class="line">
									<div class="line-center">
									    <div class="name">企业名称：</div>
									    <el-input
									        size="small"
									        placeholder="请输入企业名称"
									        v-model="bean.fFullName"
									        style="width:180px"
											maxlength="128"
									    ></el-input>
									</div>
									<div class="line-center">
									    <div class="name required">信用代码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入信用代码"
									        v-model="bean.fCreditCode"
									        style="width:180px"
											maxlength="32"
									    ></el-input>
									</div>
								</div>
								<div class="line">
									<div class="line-center">
									    <div class="name required">法人姓名：</div>
									    <el-input
									        size="small"
									        placeholder="请输入法人姓名"
									        v-model="bean.fLegalName"
									        style="width:180px"
											maxlength="32"
									    ></el-input>
									</div>
									<div class="line-center">
									    <div class="name required">身份证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入身份证号"
									        v-model="bean.fLegalIdcard"
									        style="width:180px"
											maxlength="18"
											@input="IdcardChange"
											ref="IdcardInputRef"
									    ></el-input>
									</div>
								</div>
							</div>
						</div>
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 签约信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">签约银行：</div>
                                        <el-select 
										placeholder="请选择签约银行"
										v-model="bean.fBankCode">
											<el-option
											      v-for="item in signBanks"
											      :key="item.fBankCode"
											      :label="item.fName"
											      :value="item.fBankCode">
											    </el-option>
										</el-select>
                                    </div>
									<div class="line-center">
									    <div class="name required">收款银行：</div>
									    <el-select 
										placeholder="请选择收款银行"
										v-model="bean.fOpenBankCode">
											<el-option
											      v-for="item in banks"
											      :key="item.fBankCode"
											      :label="item.fName"
											      :value="item.fBankCode">
											    </el-option>
										</el-select>
									</div>
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">持卡人姓名：</div>
								        <el-input
								            size="small"
								            placeholder="请输入持卡人姓名"
								            v-model="bean.fAccountName"
								            style="width:180px"
											maxlength="128"
								        ></el-input>
								    </div>
									<div class="line-center">
										<div class="name required">银行预留手机：</div>
										<el-input
											size="small"
											placeholder="请输入银行预留手机号"
											v-model="bean.fBankMobile"
											style="width:180px"
											maxlength="11"
											@blur="checkMobile"
										></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">银行卡类型：</div>
								        <el-select
								            v-model="bean.fAccountType"
								            class="handle-select"
											placeholder="请选择银行卡类型"
											style="width:180px"
								        >
								            <el-option key="1" label="借记卡" value="1"></el-option>
								        	<el-option key="2" label="信用卡" value="2"></el-option>
								        </el-select>
								    </div>
									<div class="line-center">
										<div class="name required">银行卡号：</div>
										<el-input
											size="small"
											placeholder="请输入银行卡号"
											v-model="bean.fBankAccount"
											style="width:180px"
											maxlength="25"
											@input="bean.fBankAccount=commonUtils.trimForDigit(bean.fBankAccount);$forceUpdate()"
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
			banks:[],
			titleName: '',
			accountInput:false,
			submitting:false,
			signBanks:[],
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
			this.titleName='运营中心签约';
			if(this.bean.fStatus){
				this.bean.fStatus+='';
			}
			if(this.bean.fAccountType){
				this.bean.fAccountType+='';
			}
			let list = await request('/fund/bankSign/getBankList', {});
			this.banks = list.data;
			let signBankList = await request('/fund/bankSign/getTFBankList', {});
			this.signBanks = signBankList.data;
			if(!this.bean.fBankCode&&this.signBanks&&this.signBanks.length==1){
				this.bean.fBankCode=this.signBanks[0].fBankCode;
			}
			if(!(this.bean.fAccountType>0)){
				this.bean.fAccountType='1';
			}
        },
		change (e) {
		      this.$forceUpdate()
		},
		checkMobile(){
			let val = this.bean.fBankMobile;
			if(!commonUtils.isEmpty(val)&&commonUtils.isInvalidMobilePhone(val)){
				this.$message.error("手机号格式有误");
			}
		},
		IdcardChange(){
			this.$forceUpdate();
			if(!(this.bean.fLegalIdcard)){
				return;
			}
			var regu = /^([0-9]{1,17})$|^(\d{17}[0-9xX])$/;
			if (!regu.test(this.bean.fLegalIdcard)) {
				while(this.bean.fLegalIdcard.length>0){
					let val = this.bean.fLegalIdcard.substring(0, this.bean.fLegalIdcard.length - 1);
					this.bean.fLegalIdcard = val;
					if(isNaN(val)){
						continue;
					}
					break;
				}
				this.$forceUpdate();
				this.$refs.IdcardInputRef.$el.children[0].focus();
				return false;
			}
			if(this.bean.fLegalIdcard.length==18){
				let last = this.bean.fLegalIdcard.substring(17);
				if(last==='x'){
					this.bean.fLegalIdcard=this.bean.fLegalIdcard.substring(0,17)+'X';
				}
			}
			this.$forceUpdate();
			return true;
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
			this.submitting=true;
            let result = await request('/fund/bankSign/dealer/sign', this.bean);
            this.submitting=false;
            if(result.data==1){
            	this.editVisible = false;
            	this.$message.success("签约成功");
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(bean.fBankCode)){
				this.$message.error("请选择签约银行");
				return false;
			}
			if(commonUtils.isEmpty(bean.fOpenBankCode)){
				this.$message.error("请选择收款银行");
				return false;
			}
			
			if(commonUtils.isEmpty(bean.fAccountName)){
				this.$message.error("持卡人姓名不能为空");
				return false;
			}
			if(bean.fAccountName.length>32){
				this.$message.error("持卡人姓名不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fBankMobile)){
				this.$message.error("银行预留手机不能为空");
				return false;
			}
			if(commonUtils.isInvalidMobilePhone(bean.fBankMobile)){
				this.$message.error("手机号码格式有误");
				return false;
			}
			if(commonUtils.isEmpty(bean.fAccountType)||!(bean.fAccountType>0)){
				this.$message.error("请选择银行卡类型");
				return false;
			}
			
			if(commonUtils.isEmpty(bean.fBankAccount)){
				this.$message.error("银行卡号不能为空");
				return false;
			}
			if(!commonUtils.bankCarNoRegTest(bean.fBankAccount)){
				this.$message.error("银行卡号格式有误");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCreditCode)){
				this.$message.error("信用代码不能为空");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLegalName)){
				this.$message.error("法人姓名不能为空");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLegalIdcard)){
				this.$message.error("身份证号不能为空");
				return false;
			}
			if(commonUtils.isInvalidIDCard(bean.fLegalIdcard)){
				this.$message.error("身份证号格式有误");
				return false;
			}
			
			return true;
		}
    }
};
</script>

