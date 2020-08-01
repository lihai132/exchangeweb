<template>
    <div class="Popup">
        <el-dialog title="查看银行卡余额" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left" style="width: 130px;">- {{namePrefix}}基本信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">运营商编号：</div>
								        <el-input
								            size="small"
								            v-model="bean.fCode"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name required">{{namePrefix}}账号：</div>
									    <el-input
									        size="small"
									        v-model="bean.fMobile"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">{{namePrefix}}简称：</div>
								        <el-input
								            size="small"
								            v-model="bean.fTraderName"
								            style="width:180px"
								    		:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name required">{{namePrefix}}状态：</div>
									    <el-select
									        v-model="bean.fStatus"
									        class="handle-select"
									        style="width:180px"
											:disabled="true"
									    >
									        <el-option key="1" label="已开户" value="1"></el-option>
									        <el-option key="2" label="待签约" value="2"></el-option>
									    	<el-option key="3" label="正常" value="3"></el-option>
									    	<el-option key="4" label="申请注销" value="4"></el-option>
									    	<el-option key="5" label="已注销" value="5"></el-option>
									    </el-select>
									</div>
								</div>
								
                                <div class="line">
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
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 银行信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">签约银行：</div>
                                        <el-select  :disabled="true"
										style="width:180px"
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
									    <el-select :disabled="true"
										style="width:180px"
										placeholder="请选择收款银行"
										v-model="bean.fBankName">
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
								        <el-input :disabled="true"
								            size="small"
								            placeholder="请输入持卡人姓名"
								            v-model="bean.fAccountName"
								            style="width:180px"
											maxlength="128"
								        ></el-input>
								    </div>
									<div class="line-center">
										<div class="name required">银行预留手机：</div>
										<el-input :disabled="true"
											size="small"
											placeholder="请输入银行预留手机号"
											v-model="bean.fBankMobile"
											style="width:180px"
											maxlength="11"
										></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">银行卡类型：</div>
								        <el-select :disabled="true"
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
										<el-input :disabled="true"
											size="small"
											placeholder="请输入银行卡号"
											v-model="bean.fBankAccount"
											style="width:180px"
											maxlength="25"
										></el-input>
									</div>
								</div>
                            </div>
                        </div>
						
						<div class="news-img" style="margin-top: 10px;">
						    <div class="title">
						        <div class="left" style="width: 130px;">- 查看银行卡余额</div>
						    </div>
							<div class="nav">
								<div class="line" style="margin-left: 213px;">
									<el-tooltip v-model="showBalanceTip" class="item" effect="dark" content="市场签约号尚未初始化, 无法查看银行卡余额" 
									placement="right" :manual="true" :hide-after="3000" 
									>
									<el-button size="small" :style="{'color': 'rgba(64, 158, 255, 0.78)','border-color': '#c6e2ff','cursor':balanceCursor}"
									@mouseenter.native="enterBalanceTip()" @mouseleave.native="leaveBalanceTip()"
									@click="queryBalance()" :disabled="queryingBalance">查询余额</el-button>
									</el-tooltip>
								</div>
							</div>
							<div class="nav">
								<div class="line">
								    <div class="line-center" id="NetStatusID" style="margin-left: 60px;">
										<div style="border: 1px solid #CBCBCB;height: 100px;width: 400px" contenteditable="false">
											<span>
												<span style="line-height: 8;margin-left: 120px;" contenteditable="false">银行卡余额：</span>
												<span :style="{'line-height':'4','font-size': '23px'}"
												v-if="balance!=null&&balance!=undefined&&balance!=''"
												>{{balance}}</span><span v-if="balance!=null&&balance!=undefined&&balance!=''"
												style="padding-left: 4px;">元</span>
											</span>
										</div>
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
            balance: '',
			bean:{},
			banks:[],
			titleName: '',
			showBalanceTip:false,
			queryingBalance:false,
			submitting:false,
			signBanks:[],
			namePrefix:'交易员',
			balanceCursor:'pointer'
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       async receipt(index, row) {
		    this.balance = '';
            this.editVisible = true;
			this.submitting=false;
			this.showBalanceTip = false;
			this.selectedCitys = [];
			this.balanceCursor = 'pointer';
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			if(this.bean.fTraderType==2){
				this.namePrefix = '司机';
			}else if(this.bean.fTraderType==5){
				this.namePrefix = '经纪人';
			}
			this.titleName=this.namePrefix+'签约';
			if(this.bean.fStatus){
				this.bean.fStatus+='';
			}
			if(this.bean.fAccountType){
				this.bean.fAccountType+='';
			}
			if(this.bean.fOpenBankCode){
				this.bean.fOpenBankCode += '';
			}
			// let list = await request('/fund/bankSign/getBankList', {});
			// this.banks = list.data;
			let signBankList = await request('/fund/bankSign/getTFBankList', {});
			this.signBanks = signBankList.data;
			if(!this.bean.fBankCode&&this.signBanks&&this.signBanks.length==1){
				this.bean.fBankCode=this.signBanks[0].fBankCode;
			}
			if(!(this.bean.fAccountType>0)){
				this.bean.fAccountType='1';
			}
        },
		enterBalanceTip(){
			if(!(this.bean.fSignAccount)){
				this.showBalanceTip = true;
				this.balanceCursor = 'not-allowed';
			}else{
				this.showBalanceTip = false;
				this.balanceCursor = 'pointer';
			}
		},
		leaveBalanceTip(){
			this.showBalanceTip = false;
			this.balanceCursor = 'pointer';
		},
		async queryBalance(){
			if(this.queryingBalance||!(this.bean.fSignAccount)){
				return;
			}
			let param = {"signAccount":this.bean.fSignAccount};
			this.queryingBalance = true;
			let balanceResult = await request('/fund/bankSign/balance/query', param);
			this.queryingBalance = false;
			this.balance=balanceResult.data.balance;
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			this.editVisible = false;
		},
		checkSubmit(bean){
			
		}
    }
};
</script>

