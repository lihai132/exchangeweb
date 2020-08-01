<template>
    <div class="Popup">
        <el-dialog title="运营商详情" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
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
								        <div class="name required">运营商编号：</div>
								        <el-input
								            size="small"
								            disabled="disabled"
								            v-model="bean.fCode"
								            style="width:180px"
								        ></el-input>
								    </div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商简称：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fName"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
									<!-- <div class="line-center">
									    <div class="name">联系电话：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fPhone"
									        style="width:180px"
									    ></el-input>
									</div> -->
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">运营商类型：</div>
								        <el-select
								            v-model="bean.fTypeChild"
								            style="width:180px"
											disabled="disabled"
								        >
								            <el-option key="2" label="综合运营商" value="2"></el-option>
								            <el-option key="1" label="特别运营商" value="1"></el-option>
								        	<el-option key="3" label="经纪运营商" value="3"></el-option>
								        </el-select>
								    </div>
									<div class="line-center">
									    <div class="name required">服务费方案：</div>
									    <el-select
									        v-model="bean.fGroupId"
									        style="width:180px"
											disabled="disabled"
									    >
											<el-option
											      v-for="item in groupOptions"
											      :key="item.fSchemaId"
											      :label="item.fName"
											      :value="item.fSchemaId">
											</el-option>
									    </el-select>
									</div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">管理员：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fOperateName"
                                            style="width:180px"
                                        ></el-input>
									</div>
									<div class="line-center">
										<div class="name required">管理员手机：</div>
										<el-input
											size="small"
											disabled="disabled"
											v-model="bean.fOperateMobile"
											style="width:180px"
										></el-input>
									</div>
							    </div>
								<div class="line">
									<div class="line-center">
										<div class="name required">所在城市：</div>
										<el-cascader
											style="width:512px"
											v-model="selectedCitys"
										    disabled="disabled"
										    :options="cityOptions"
										    filterable>
											</el-cascader>
									</div>
								</div>
								<div class="line">
									<div class="line-center">
										<div class="name">企业地址：</div>
										<el-input
											size="small"
											disabled="disabled"
											v-model="bean.fAddress"
											style="width:510px"
										></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name">描述信息：</div>
								        <el-input
								            size="small"
								        	type="textarea"
								            disabled="disabled"
								            v-model="bean.fDescn"
								            style="width:512px;"
								        	maxlength="256"
								        ></el-input>
								    </div>
								</div>
							</div>
                        </div>
                        <div class="news-two">
                            <div class="title">
                                <div class="left">- 状态信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">运营商状态：</div>
                                        <el-input 
                                            size="small"
                                            disabled="disabled"
                                            v-model="fStatus"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">开户时间：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fCreateTime"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
									<div class="line-center">
									    <div class="name">认证时间：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fValidTime"
									        style="width:180px"
									    ></el-input>
									</div>
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name">冻结时间：</div>
								        <el-input
								            size="small"
								            disabled="disabled"
								            v-model="bean.fFreezeTime"
								            style="width:180px"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name">解冻时间：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fActivateTime"
									        style="width:180px"
									    ></el-input>
									</div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">终止时间：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fTeminateTime"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
									<div class="line-center">
									    <div class="name">签约时间：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fSignTime"
									        style="width:180px"
									    ></el-input>
									</div>
                                </div>
                            </div>
                        </div>
                        <div class="news-img">
                            <div class="title">
                                <div class="left">- 企业信息</div>
                            </div>
                            <div class="nav">
                                <div class="img">
                                    <el-image v-if="fImageCert1!=null&&fImageCert1!=undefined&&fImageCert1.length>0" :src="fImageCert1" preview="1" preview-textss alt :preview-src-list="fImageCert1List">
									</el-image>
									<img :src="img1" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">营业执照</div>
                                </div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:15px;">
									    <div class="name required" style="display: inline-block;">企业名称：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fFullName"
									        style="width:220px"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top: 30px;">
									    <div class="name required" style="display: inline-block;">信用代码：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fCreditCode"
									        style="width:220px"
									    ></el-input>
									</div>
								</div>
                            </div>
                        </div>
						<div class="news-img">
						    <div class="title">
						        <div class="left">- 法人信息</div>
						    </div>
						    <div class="nav">
						        <div class="img">
						            <el-image v-if="fImageIdcardF!=null&&fImageIdcardF!=undefined&&fImageIdcardF.length>0" :src="fImageIdcardF" preview="1" preview-text alt :preview-src-list="fImageIdcardFList">
									</el-image>
									<img :src="img1" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(正面)</div>
						        </div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:40px;">
									    <div class="name required" style="display: inline-block;">法人姓名：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fLegalName"
									        style="width:220px"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:15px;">
									    <div class="name required" style="display: inline-block;">身份证号：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fLegalIdcard"
									        style="width:220px"
									    ></el-input>
									</div>
								</div>
						    </div>
							<div class="nav">
								<div class="img">
								    <el-image v-if="fImageIdcardN!=null&&fImageIdcardN!=undefined&&fImageIdcardN.length>0" :src="fImageIdcardN" preview="1" preview-textss alt :preview-src-list="fImageIdcardNList">
									</el-image>
									<img :src="img1" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(反面)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top: 40px;margin-left: -30px;">
									    <div class="name required" style="display: inline-block;">身份证有效期：</div>
									    <el-input
									        size="small"
									        disabled="disabled"
									        v-model="bean.fIdcardValidTime"
									        style="width:220px"
									    ></el-input>
									</div>
								</div>
							</div>
						</div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine">确定</el-button>
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
export default {
    data() {
        return {
            editVisible: false,
			bean:{},
			img1: require('../../../../assets/img/logo.jpg'),
			fImageCert1: '',
			fImageIdcardN: '',
			fImageIdcardF: '',
			fImageCert1List:[],
			fImageIdcardNList:[],
			fImageIdcardFList:[],
			cityOptions:[],
			groupOptions:[],
			selectedCitys:[],
			fStatus:''
        };
    },
    methods: {
        async receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			this.fImageCert1 = (this.bean.fImageCert1FullUrl);
			this.fImageIdcardN = (this.bean.fImageIdcardNFullUrl);
			this.fImageIdcardF = this.bean.fImageIdcardFFullUrl;
			this.fImageCert1List.push(this.fImageCert1);
			this.fImageIdcardNList.push(this.fImageIdcardN);
			this.fImageIdcardFList.push(this.fImageIdcardF);
			//
			let cardTime = this.bean.fIdcardValidTime;
			if(cardTime!=null&&cardTime!=undefined&&typeof(cardTime.indexOf) =='function'){
				let idx = cardTime.indexOf(' ');
				if(idx>-1&&typeof(cardTime.substring) =='function'){
					this.bean.fIdcardValidTime = cardTime.substring(0,idx);
				}
			}
			if(this.bean.fStatus==1&&this.bean.fValidTime){
				this.bean.fValidTime = '';
			}
			if(this.bean.fStatus!=6&&this.bean.fTeminateTime){
				this.bean.fTeminateTime = '';
			}
			if(this.bean.fTypeChild>0){
				this.bean.fTypeChild += '';
			}
			this.fStatus=this.statusFormat(this.bean);
			let citys = await request('/city/cityOptions',{});
			this.cityOptions=citys.data;
			if(this.bean.fCity>0){
				this.selectedCitys = commonUtils.searchCitys(this.cityOptions,this.bean.fCity);
			}
			let charge = await request('/parameter/servercharge/customsize/selectByDealerId',{"fDealerId":this.bean.fDealerId});
			this.groupOptions = charge.data;
        },
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '待认证';
            }
            if (row.fStatus == 2) {
                return '待签约';
            }
		    if (row.fStatus == 3) {
                return '待激活';
            }
            if (row.fStatus == 4) {
                return '正常';
            }
			if (row.fStatus == 5) {
                return '已冻结';
            }
            if (row.fStatus == 6) {
                return '已终止';
            } 
		},
		change (e) {
		      this.$forceUpdate()
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
            this.editVisible = false;
        }
    }
};
</script>

