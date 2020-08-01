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
								        <div class="name required">所属运营商：</div>
								        <el-select
								            size="small"
											style="width:180px"
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
								        <div class="name required">客户简称：</div>
								        <el-input
								            size="small"
								            v-model="bean.fName"
								            style="width:180px"
											maxlength="32"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
										<div class="name required">手机号码：</div>
										<el-input
											size="small"
											v-model="bean.fMobile"
											style="width:180px"
											maxlength="11"
											:disabled="true"
											ref="mobileInputRef"
										></el-input>
									</div>
								</div>
                                <div class="line">
									<div class="line-center">
									    <div class="name required">客户类型：</div>
									    <el-select
									        v-model="bean.fTraderTypeChild"
									        class="handle-select"
									        style="width:180px"
											:disabled="true"
									    >
									        <el-option key="1" label="个人客户" value="1"></el-option>
									        <el-option key="2" label="企业客户" value="2"></el-option>
									    </el-select>
									</div>
                                    <div class="line-center" id="percent" v-show="bean.fTraderTypeChild==2">
                                    	<div class="name required">税率：</div>
                                    	<el-input
                                    		size="small"
                                    		v-model="fBusnessReward"
                                    		style="width:180px"
                                    		maxlength="6"
                                    		ref="RewardInputRef"
                                    		:disabled="true"
                                    	>
										<i slot="suffix">%</i>
										</el-input>
                                    </div>
							    </div>
							</div>
                        </div>
						<div class="news-two">
						    <div class="title">
						        <div class="left">- 联系信息</div>
						    </div>
						    <div class="nav">
						        <div class="line">
						            <div class="line-center">
						                <div class="name">联系电话：</div>
						                <el-input
						                    size="small"
						                    v-model="bean.fInvoicePhone"
						                    style="width:180px;"
											:disabled="true"
						                ></el-input>
						            </div>
									<div class="line-center">
									    <div class="name">邮政编码：</div>
									    <el-input
									        size="small"
									        v-model="bean.fPostCode"
									        style="width:180px;"
											:disabled="true"
									    ></el-input>
									</div>
						        </div>
								<!-- <div class="line">
								    <div class="line-center">
								        <div class="name">电子邮箱：</div>
								        <el-input
								            size="small"
								            v-model="bean.fEmail"
								            style="width:180px;"
								    		:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name">传真号码：</div>
									    <el-input
									        size="small"
									        v-model="bean.fTaxCode"
									        style="width:180px;"
											:disabled="true"
									    ></el-input>
									</div>
								</div> -->
								<div class="line">
									<div class="line-center">
									    <div class="name">通讯地址：</div>
									    <el-input
									        size="small"
									        v-model="bean.fInvoiceAddress"
									        style="width:512px;"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
						    </div>
						</div>
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 状态信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">客户状态：</div>
                                        <el-select
                                            size="small"
                                        	style="width:180px"
                                            v-model="bean.fStatus"
                                        	:disabled="true"
                                        >
										<el-option key="6" label="未注册" value="6"></el-option>
										<el-option key="1" label="已开户" value="1"></el-option>
										<el-option key="2" label="待签约" value="2"></el-option>
										<el-option key="3" label="正常" value="3"></el-option>
										<el-option key="4" label="申请注销" value="4"></el-option>
										<el-option key="5" label="已注销" value="5"></el-option>
										</el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
						<div class="news-three">
							<div class="title">
							    <div class="left">- 实名认证</div>
							</div>
							<div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name">企业名称：</div>
								        <el-input
								            size="small"
								            v-model="bean.fComName"
								            style="width:180px;"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name">信用代码：</div>
									    <el-input
									        size="small"
									        v-model="bean.fCreditCode"
									        style="width:180px;"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name">法人姓名：</div>
								        <el-input
								            size="small"
								            v-model="bean.fLegalName"
								            style="width:180px;"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name">法人手机：</div>
									    <el-input
									        size="small"
									        v-model="bean.fLegalMobile"
									        style="width:180px;"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name">身份证号：</div>
								        <el-input
								            size="small"
								            v-model="bean.fLegalIdcard"
								            style="width:180px;"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name">身份证有效期：</div>
									    <el-input
									        size="small"
									        v-model="bean.fIdcardValidTime"
									        style="width:180px;"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
							</div>
						</div>
						<div class="news-img">
							<div class="title">
							    <div class="left">- 证件照片</div>
							</div>
							<div class="nav">
								<div class="img">
								    <el-image v-if="fImageCert1!=null&&fImageCert1!=undefined&&fImageCert1.length>0" :src="fImageCert1" preview="1" preview-textss alt :preview-src-list="fImageCert1List">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">营业执照</div>
								</div>
								<!-- <div class="img" style="padding-left: 150px;">
								    <el-image v-if="fImageCert2!=null&&fImageCert2!=undefined&&fImageCert2.length>0" :src="fImageCert2" preview="1" preview-textss alt :preview-src-list="fImageCert2List">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">银行开户许可证</div>
								</div> -->
								<div class="img" style="padding-left: 150px;">
								    <el-image v-if="fImageIdcardF!=null&&fImageIdcardF!=undefined&&fImageIdcardF.length>0" :src="fImageIdcardF" preview="1" preview-text alt :preview-src-list="fImageIdcardFList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(正面)</div>
								</div>
							</div>
							<div class="nav" v-if="fImageIdcardN!=null&&fImageIdcardN!=undefined&&fImageIdcardN.length>0">
								<div class="img">
								    <el-image v-if="fImageIdcardN!=null&&fImageIdcardN!=undefined&&fImageIdcardN.length>0" :src="fImageIdcardN" preview="1" preview-textss alt :preview-src-list="fImageIdcardNList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(反面)</div>
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
	#percent .el-input__suffix{
		top:7px;
	}
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
            editVisible: false,
			bean:{},
			titleName: '',
			fBusnessReward:'',
			submitting:false,
			members:[],
			defualtImage: require('../../../../assets/img/logo.jpg'),
			fImageCert1: '',
			fImageCert2: '',
			fImageIdcardN: '',
			fImageIdcardF: '',
			fImageCert1List:[],
			fImageCert2List:[],
			fImageIdcardNList:[],
			fImageIdcardFList:[],
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.titleName='客户详情';
			this.orgs = [];
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
            if(this.bean.fStatus>0){
            	this.bean.fStatus += '';
            }
			if(this.bean.fTraderTypeChild>0){
				this.bean.fTraderTypeChild = this.bean.fTraderTypeChild+'';
			}
			this.fImageCert1 = (this.bean.fImageCert1FullUrl);
			this.fImageCert2 = (this.bean.fImageCert2FullUrl);
			this.fImageIdcardN = (this.bean.fImageIdcardNFullUrl);
			this.fImageIdcardF = this.bean.fImageIdcardFFullUrl;
			this.fImageCert1List = [];
			this.fImageCert2List = [];
			this.fImageIdcardNList = [];
			this.fImageIdcardFList = [];
			this.fImageCert1List.push(this.fImageCert1);
			this.fImageCert2List.push(this.fImageCert2);
			this.fImageIdcardNList.push(this.fImageIdcardN);
			this.fImageIdcardFList.push(this.fImageIdcardF);
			if(this.bean.fBusnessReward>0){
				this.fBusnessReward = 100*parseFloat(this.bean.fBusnessReward);
			}
			this.listMembers();
			console.log(this.fImageIdcardN)
        },
		change (e) {
		      this.$forceUpdate()
		},
		async listMembers(){
			let members = await request('/account/org/listMember',{});
			this.members = members.data;
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			this.editVisible = false;
			return;
		},
    }
};
</script>

