<template>
    <div class="Popup">
        <el-dialog title="审核运营中心实名认证" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
			
			<!-- <el-dialog
			  title="审核操作提示"
			  :visible.sync="tipVisible"
			  width="30%"
			  append-to-body
			  >
			  <span>{{tip}}</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="tipVisible=false;opType=''">取 消</el-button>
			    <el-button type="primary" @click="determine">确 定</el-button>
			  </span>
			</el-dialog> -->
			
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
							<!-- <div class="formatLine">
				                <div class="formatTittleleft"></div>
				                <div class="formatTittle">- 运营中心信息</div>
				                <div class="formatTittleright"></div>
							</div> -->
							<div class="title">
							    <div class="left">运营中心信息</div>
							</div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">运营中心编号：</div>
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
                                        <div class="name required">运营中心简称：</div>
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
                                        <div class="name required">申请人：</div>
                                        <el-input
                                            size="small"
                                            disabled="disabled"
                                            v-model="bean.fApplicantName"
                                            style="width:180px"
                                        ></el-input>
									</div>
									<div class="line-center">
										<div class="name required">申请人电话：</div>
										<el-input
											size="small"
											disabled="disabled"
											v-model="bean.fApplicantMobile"
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
									<img :src="defualtImage" v-else/>
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
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(正面)</div>
						        </div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:50px;">
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
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(反面)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top: 30px;margin-left: -30px;">
									    <div class="name" style="display: inline-block;">身份证有效期：</div>
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
                    <el-button size="small" @click="determine('pass')" :disabled="submitting">通过</el-button>
                    <el-button size="small" @click="determine('unpass')" :disabled="submitting">不通过</el-button>
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
export default {
    data() {
        return {
            editVisible: false,
			bean:{},
			defualtImage: require('../../assets/img/logo.jpg'),
			fImageCert1: '',
			fImageIdcardN: '',
			fImageIdcardF: '',
			fImageCert1List:[],
			fImageIdcardNList:[],
			fImageIdcardFList:[],
			tipVisible:false,
			submitting:false,
			opType:'',
			tip:''
        };
    },
    methods: {
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.opType='';
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			this.fImageCert1 = (this.bean.fImageCert1FullUrl);
			this.fImageIdcardN = (this.bean.fImageIdcardNFullUrl);
			this.fImageIdcardF = this.bean.fImageIdcardFFullUrl;
			this.fImageCert1List = [];
			this.fImageIdcardNList = [];
			this.fImageIdcardFList = [];
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
        },
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '已开户';
            }
            if (row.fStatus == 2) {
                return '待审核';
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
		// auth(type){
		// 	if(type=='pass'){
		// 		this.tip='确定审核通过吗?';
		// 	}else{
		// 		this.tip='确定审核不通过吗?';
		// 	}
		// 	this.opType=type;
		// 	this.tipVisible = true;
		// },
        //取消事件
        cancel() {
            this.editVisible = false;
			this.submitting=false;
			this.opType='';
        },
        //确定事件
        async determine(type) {
			this.opType=type;
			this.tipVisible = false;
			if(this.opType!='pass'&&this.opType!='unpass'){
				this.$message.error("未知的操作类型");
				return false;
			}
			
			this.submitting=true;
			let result = await request('/account/center/doAuthCertification', {"fId":this.bean.fId,"opType":this.opType});
			this.submitting=false;
			if(result.data>=0){
				this.editVisible = false;
				if(type!='unpass'){
					this.$message.success("审核成功");
				}
				this.$parent.getData();
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        }
    }
};
</script>

