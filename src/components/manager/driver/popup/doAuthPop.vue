<template>
    <div class="Popup">
        <el-dialog title="审核司机实名认证" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 账号信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
											style="width:180px"
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
                                        <div class="name">所属机构：</div>
                                        <el-select
											style="width:180px"
                                            size="small"
                                            v-model="bean.fOrgId"
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
                                	<div class="line-center">
                                	    <div class="name">所属经纪人：</div>
                                	    <el-select
											style="width:180px"
                                	        size="small"
                                	        v-model="bean.fBrokerId"
                                			:disabled="true"
                                	    	filterable
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
                        				<div class="name required">司机账号：</div>
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
                        		        <div class="name required">司机简称：</div>
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
						<div class="news-img">
						    <div class="title">
						        <div class="left">- 司机信息</div>
						    </div>
						    <div class="nav">
						        <!-- <el-upload
						          :action="imgUploadUrl"
						          list-type="picture-card"
						          :on-preview="handlePictureCardPreview"
						          :on-remove="fImageIdcardFRemove"
								  :on-success="fImageIdcardFUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fImageIdcardF!=null&&bean.fImageIdcardF!=undefined&&bean.fImageIdcardF!=''}"
								  ref="fImageIdcardF-upload"
								  >
						          <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">身份证照(正面)</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog> -->
								<div class="img">
								    <el-image v-if="fImageIdcardF!=null&&fImageIdcardF!=undefined&&fImageIdcardF.length>0" :src="fImageIdcardF" preview="1" preview-text alt :preview-src-list="fImageIdcardFList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip required" align="center">身份证照(正面)</div>
								</div>
								<div class="img" style="margin-left: 157px;">
								    <el-image v-if="fImageCert2!=null&&fImageCert2!=undefined&&fImageCert2.length>0" :src="fImageCert2" preview="1" preview-textss alt :preview-src-list="fImageCert2List">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip required" align="center">驾驶证</div>
								</div>
						    </div>
							
							<div class="nav">
								<div class="line" style="margin-left: -43px;">
									<div class="line-center" style="margin-top:13px;">
									    <div class="name required" style="display: inline-block;">真实姓名：</div>
									    <el-input
									        size="small"
									        placeholder="请输入真实姓名"
									        v-model="bean.fLegalName"
									        style="width:180px"
											maxlength="64"
									    ></el-input>
									</div>
								</div>
								<div class="line" style="margin-left: 35px;">
									<div class="line-center" style="margin-top:13px;">
									    <div class="name required" style="display: inline-block;">身份证号：</div>
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
						
						<div class="news-img" style="margin-top: 10px;">
						    <div class="title">
						        <div class="left">- 车辆信息</div>
						    </div>
						    <div class="nav">
						        <!-- <el-upload
						          :action="imgUploadUrl"
						          list-type="picture-card"
						          :on-preview="handlePictureCardPreview"
						          :on-remove="fDrivingPermitFaceRemove"
								  :on-success="fDrivingPermitFaceUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fDrivingPermitFace!=null&&bean.fDrivingPermitFace!=undefined&&bean.fDrivingPermitFace!=''}"
								  ref="fDrivingPermitFace-upload"
								  >
						          <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">行驶证(正页)</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog> -->
								<div class="img">
								    <el-image v-if="fDrivingPermitFace!=null&&fDrivingPermitFace!=undefined&&fDrivingPermitFace.length>0" :src="fDrivingPermitFace" preview="1" preview-textss alt :preview-src-list="fDrivingPermitFaceList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip required" align="center">行驶证(正页)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: -25px;">车辆识别代码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车辆识别代码"
									        v-model="bean.fCreditCode"
									        style="width:220px"
											maxlength="17"
											@input="bean.fCreditCode=commonUtils.trimForVIN(bean.fCreditCode);$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;padding-left: 12px;">车辆类型：</div>
										<el-input
										    size="small"
										    placeholder="请输入车辆类型"
										    v-model="bean.fCarTypeDesp"
										    style="width:220px"
											maxlength="64"
										></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: -2px;">车辆所有人：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车辆所有人"
									        v-model="bean.fOwner"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
								</div>
						    </div>
							
							<div class="nav">
							    <!-- <el-upload
							      :action="imgUploadUrl"
							      list-type="picture-card"
							      :on-preview="handlePictureCardPreview"
							      :on-remove="fDrivingPermitNextRemove"
								  :on-success="fDrivingPermitNextUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fDrivingPermitNext!=null&&bean.fDrivingPermitNext!=undefined&&bean.fDrivingPermitNext!=''}"
								  ref="fDrivingPermitNext-upload"
								  >
							      <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">行驶证(副页)</div>
							    </el-upload>
							    <el-dialog :visible.sync="dialogVisible">
							      <img width="100%" :src="dialogImageUrl" alt="">
							    </el-dialog> -->
								<div class="img">
								    <el-image v-if="fDrivingPermitNext!=null&&fDrivingPermitNext!=undefined&&fDrivingPermitNext.length>0" :src="fDrivingPermitNext" preview="1" preview-textss alt :preview-src-list="fDrivingPermitNextList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip required" align="center">行驶证(副页)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:1px;">
									    <div class="name" style="display: inline-block;margin-left: 12px;">注册地址：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车辆注册地"
									        v-model="bean.fAddress"
									        style="width:220px"
											maxlength="128"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: -21px;">总质量(千克)：</div>
									    <el-input
									        size="small"
									        placeholder="请输入总质量"
									        v-model="bean.fTotalMass"
											@input="totalMassChange"
											ref="totalMassInputRef"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: -49px;">核定载质量(千克)：</div>
									    <el-input
									        size="small"
									        placeholder="请输入核定载质量"
									        v-model="bean.fLoadWeight"
											@input="fLoadWeightChange"
											ref="fLoadWeightInputRef"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;margin-left: -17px;">
									    <div class="name" style="display: inline-block;">车辆能源类型：</div>
										<el-input
										    size="small"
										    placeholder="请输入车辆能源类型"
										    v-model="bean.fOilType"
										    style="width:220px"
											maxlength="64"
										></el-input>
									</div>
								</div>
							</div>
							
							<div class="nav">
								<!-- <el-upload
								  :action="imgUploadUrl"
								  list-type="picture-card"
								  :on-preview="handlePictureCardPreview"
								  :on-remove="fImageCarRemove"
								  :on-success="fImageCarUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fImageCar!=null&&bean.fImageCar!=undefined&&bean.fImageCar!=''}"
								  ref="fImageCar-upload"
								  >
								  <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">车辆正面照</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog> -->
								<!-- <div class="img">
								    <el-image v-if="fImageCar!=null&&fImageCar!=undefined&&fImageCar.length>0" :src="fImageCar" preview="1" preview-textss alt :preview-src-list="fImageCarList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">车辆正面照</div>
								</div> -->
								<div class="line-center" style="margin-top:15px;margin-left: -21px;">
								    <div class="name required" style="display: inline-block;">车牌号：</div>
								    <el-input
								        size="small"
								        placeholder="请输入车牌号"
								        v-model="bean.fCarNumber"
								        style="width:180px"
										maxlength="64"
										ref="fCarNumber"
								    ></el-input>
								</div>
								<div class="line-center" style="margin-top:15px;margin-bottom: 15px;margin-left: 27px;">
								    <div class="name required" style="display: inline-block;">车牌颜色：</div>
									<el-select v-model="bean.fPlateColor" placeholder="请选择" style="width:180px">
									    <el-option
									      v-for="item in carNoColors"
									      :key="item.value"
									      :label="item.value"
									      :value="item.value">
									    </el-option>
									  </el-select>
								</div>
							</div>
							<div class="nav">
								<div class="line-center" style="margin-top:-15px;margin-left: -8px;">
								    <div class="name required" style="display: inline-block;">车型：</div>
									<el-select v-model="bean.fCarType" placeholder="请选择" style="width:180px">
									    <el-option
									      v-for="item in carTypes"
									      :key="item.key"
									      :label="item.value"
									      :value="item.key">
									    </el-option>
									  </el-select>
								</div>
								<div class="line-center" style="margin-top:-15px;margin-left: 55px;">
								    <div class="name required" style="display: inline-block;">车长：</div>
									<el-select v-model="bean.fCarLength" placeholder="请选择" style="width:180px">
									    <el-option
									      v-for="item in carLengths"
									      :key="item.key"
									      :label="item.value"
									      :value="item.key">
									    </el-option>
									  </el-select>
								</div>
							</div>
						</div>
						
						<div class="news-img" style="margin-top: 10px;">
						    <div class="title">
						        <div class="left" style="width: 130px;">- 道路运输证信息</div>
						    </div>
							<div class="nav">
								<div class="line" style="margin-left: 200px;">
									<el-tooltip class="item" v-model="showQueryRoadLicenseTip" effect="dark" content="请先输入车牌号" 
									placement="right" :manual="true" :hide-after="3000">
									<el-button size="small" style="color: rgba(64, 158, 255, 0.78);border-color: #c6e2ff;"
									@click="queryRoadLicense()" :disabled="queryingRoadLicense">查询道路运输证</el-button>
									</el-tooltip>
								</div>
							</div>
							<div class="nav">
							    <!-- <el-upload
							      :action="imgUploadUrl"
							      list-type="picture-card"
							      :on-preview="handlePictureCardPreview"
							      :on-remove="fRoadPermitImageRemove"
								  :on-success="fRoadPermitImageUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fRoadPermitImage!=null&&bean.fRoadPermitImage!=undefined&&bean.fRoadPermitImage!=''}"
								  ref="fRoadPermitImage-upload"
								  >
							      <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">道路运输证</div>
							    </el-upload>
							    <el-dialog :visible.sync="dialogVisible">
							      <img width="100%" :src="dialogImageUrl" alt="">
							    </el-dialog> -->
								<div class="img">
								    <el-image v-if="fRoadPermitImage!=null&&fRoadPermitImage!=undefined&&fRoadPermitImage.length>0" :src="fRoadPermitImage" preview="1" preview-textss alt :preview-src-list="fRoadPermitImageList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">道路运输证</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:5px;">
									    <div class="name" style="display: inline-block;margin-left: -27px;">道路运输证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入道路运输证号"
									        v-model="bean.fRoadPermitCode"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: -55px;">道路运输证有效期：</div>
									    <el-input
									        size="small"
									        placeholder="请输入道路运输证有效期"
									        v-model="bean.fRoadPermitInvalid"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: -27px;">经营许可证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入经营许可证号"
									        v-model="bean.fRoadOperateCode"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;">业户名称：</div>
										<el-input
										    size="small"
										    placeholder="请输入业户名称"
										    v-model="bean.fRoadOperateName"
										    style="width:220px"
											maxlength="64"
										></el-input>
									</div>
								</div>
							</div>
						</div>
						
						<div class="news-img" style="margin-top: 10px;">
						    <div class="title">
						        <div class="left" style="width: 130px;">- 车辆入网校验</div>
						    </div>
							<div class="nav">
								<div class="line" style="margin-left: 213px;">
									<el-tooltip v-model="showVerifyCarNumTip" class="item" effect="dark" content="请先输入车牌号" 
									placement="right" :manual="true" :hide-after="3000">
									<el-button size="small" style="color: rgba(64, 158, 255, 0.78);border-color: #c6e2ff;"
									@click="verifyCarNum()" :disabled="verifyingCarNum">入网校验</el-button>
									</el-tooltip>
								</div>
							</div>
							<div class="nav">
								<div class="line">
								    <div class="line-center" id="NetStatusID" style="margin-left: 60px;">
								        <!-- <el-input
											size="small"
                                        	type="textarea"
											v-model="NetStatusTxt"
											rows="5"
											style="width:400px;"
											:readonly="true"
											resize="none"
										>
										</el-input> -->
										<div style="border: 1px solid #CBCBCB;height: 100px;width: 400px" contenteditable="false">
											<span>
												<span style="line-height: 8;margin-left: 120px;" contenteditable="false">入网状态：</span>
												<span :style="{'line-height':'5','font-size': '20px','color': NetStatusColor}"
												v-if="NetStatusTxt!=null&&NetStatusTxt!=undefined&&NetStatusTxt!=''"
												>{{NetStatusTxt}}</span>
											</span>
										</div>
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
	#NetStatusID textarea {  
	  FONT-SIZE: 20px;    
	  height:100px;
	  line-height:85px;
	  text-align:center;
	}
	.required:before {
		content: '* ';
		color: red;
	}
	.disableUpload .el-upload--picture-card {
	    display: none;
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
            submitting:false,
			queryingRoadLicense:false,
			verifyingCarNum:false,
			showQueryRoadLicenseTip:false,
			showVerifyCarNumTip:false,
			NetStatusTxt:'',
			NetStatusColor:'',
			bean:{},
			imageUrl:'',
			members:[],
			orgs:[],
			brokers:[],
			brokers:[],
			carTypes:[],
			carLengths:[],
			carNoColors:[],
            dialogImageUrl: '',
            dialogVisible: false,
			imgUploadUrl:commonUtils.imgUploadUrl,
			defualtImage: require('../../../../assets/img/logo.jpg'),
			fImageCert2: '',
			fImageIdcardN: '',
			fImageIdcardF: '',
			fImageCert2List:[],
			fImageIdcardNList:[],
			fImageIdcardFList:[],
			fImageCar:'',
			fImageCarList:[],
			fRoadPermitImage:'',
			fRoadPermitImageList:[],
			fDrivingPermitNext:'',
			fDrivingPermitNextList:[],
			fDrivingPermitFace:'',
			fDrivingPermitFaceList:[]
        };
    },
    methods: {
      async receipt(index, row) {
			this.NetStatusTxt='';
            this.editVisible = true;
			this.submitting=false;
			this.dialogImageUrl='';
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
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
			this.bean.fNetStatus = 0;
			//this.bean.fSex='1';
			let carLenList = await request('/enum/ioCarLenghtType/api', {});
			this.carLengths = carLenList.data;
			let carTypeList = await request('/enum/ioCarType/api', {});
			this.carTypes = carTypeList.data;
			let carNoTypeList = await request('/enum/ioCarNoColorType/api', {});
			this.carNoColors = carNoTypeList.data;
			if(this.bean.fCarType>0){
				this.bean.fCarType = this.bean.fCarType+'';
			}
			if(this.bean.fCarLength>0){
				this.bean.fCarLength = this.bean.fCarLength+'';
			}
			//
			this.fImageCert2 = (this.bean.fImageCert2FullUrl);
			this.fImageIdcardN = (this.bean.fImageIdcardNFullUrl);
			this.fImageIdcardF = this.bean.fImageIdcardFFullUrl;
			this.fImageCert2List = [];
			this.fImageIdcardNList = [];
			this.fImageIdcardFList = [];
			this.fImageCert2List.push(this.fImageCert2);
			this.fImageIdcardNList.push(this.fImageIdcardN);
			this.fImageIdcardFList.push(this.fImageIdcardF);
			//
			this.fImageCar = (this.bean.fImageCarFullUrl);
			this.fRoadPermitImage = (this.bean.fRoadPermitImageFullUrl);
			this.fDrivingPermitNext = this.bean.fDrivingPermitNextFullUrl;
			this.fDrivingPermitFace = this.bean.fDrivingPermitFaceFullUrl;
			this.fImageCarList = [];
			this.fRoadPermitImageList = [];
			this.fDrivingPermitNextList = [];
			this.fDrivingPermitFaceList = [];
			this.fImageCarList.push(this.fImageCar);
			this.fRoadPermitImageList.push(this.fRoadPermitImage);
			this.fDrivingPermitNextList.push(this.fDrivingPermitNext);
			this.fDrivingPermitFaceList.push(this.fDrivingPermitFace);
        },
		//查询道路运输证
		async queryRoadLicense(){
			if(this.queryingRoadLicense){
				return;
			}
			var carNumber = this.bean.fCarNumber;
			if(!carNumber){
				this.showQueryRoadLicenseTip = true;
				var that = this;
				setTimeout(function()  {
					that.showQueryRoadLicenseTip = false;
				}, 2000);
				this.$refs.fCarNumber.$el.children[0].focus();
				return false;
			}
			var param = {};
			param.carNumber = carNumber;
			if(this.bean.fPlateColor){
				if(this.bean.fPlateColor=='蓝牌'){
					param.plateColor = 2;
				}else if(this.bean.fPlateColor=='黄牌'){
					param.plateColor = 1;
				}else{
					param.plateColor = this.bean.fPlateColor;
					return false;
				}
			}
			this.queryingRoadLicense = true;
			var res = await request('/account/driver/queryVehicleRoadLicense',param);
			this.queryingRoadLicense = false;
			if(res&&res.data&&res.data.roadLicenseCode){
				this.bean.fRoadPermitCode=res.data.roadLicenseCode;
				if(res.data.invalidDate&&res.data.invalidDate!='未知'){
					this.bean.fRoadPermitInvalid = res.data.invalidDate;
				}
			}else if(res.errMsg){
				this.$message.error(res.errMsg);
				return false;
			}
		},
		//入网校验
		async verifyCarNum(){
			if(this.verifyingCarNum){
				return;
			}
			var carNumber = this.bean.fCarNumber;
			if(!carNumber){
				this.showVerifyCarNumTip = true;
				var that = this;
				setTimeout(function()  {
					that.showVerifyCarNumTip = false;
				}, 2000);
				this.$refs.fCarNumber.$el.children[0].focus();
				return false;
			}
			var param = {};
			param.carNumber = carNumber;
			this.verifyingCarNum=true;
			var res = await request('/account/driver/vehicleAccessVerify',param);
			this.verifyingCarNum=false;
			if(res&&res.data){
				if(res.data.status>0){
					this.bean.fNetStatus = 1;
					this.NetStatusTxt = "已入网";
					this.NetStatusColor="green";
				}else{
					this.bean.fNetStatus = 0;
					this.NetStatusTxt = "未入网";
					this.NetStatusColor="red";
				}
			}else if(res.errMsg){
				this.$message.error(res.errMsg);
				return false;
			}
		},
		clearUpload(){
			let uploadRef;
			let removed = false;
			if((uploadRef=this.$refs['fImageCert1-upload'])){
				uploadRef.clearFiles();
				this.fImageCert1Remove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageCert2-upload'])){
				uploadRef.clearFiles();
				this.fImageCert2Remove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageIdcardF-upload'])){
				uploadRef.clearFiles();
				this.fImageIdcardFRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageIdcardN-upload'])){
				uploadRef.clearFiles();
				this.fImageIdcardNRemove();
				removed = true;
			}
			//
			if((uploadRef=this.$refs['fDrivingPermitFace-upload'])){
				uploadRef.clearFiles();
				this.fDrivingPermitFaceRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fDrivingPermitNext-upload'])){
				uploadRef.clearFiles();
				this.fDrivingPermitNextRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fRoadPermitImage-upload'])){
				uploadRef.clearFiles();
				this.fRoadPermitImageRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageCar-upload'])){
				uploadRef.clearFiles();
				this.fImageCarRemove();
				removed = true;
			}
			if(removed){
				this.$forceUpdate();
			}
		},
		IdcardBlur(){
			if(this.bean.fLegalIdcard){
				if(!this.IdcardChange()||commonUtils.isInvalidIDCard(this.bean.fLegalIdcard)){
					var that = this;
					setTimeout(function () {
					  if(that.editVisible){
						  that.$message.error("身份证号格式有误");
						  return false;
					  }
					},300);
				}
			}
		},
		IdcardChange(){
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
		change (e) {
		      this.$forceUpdate()
		},
		totalMassChange(){
			this.bean.fTotalMass = commonUtils.trimForDigit(this.bean.fTotalMass,{'allowDecimal':true});
			this.$forceUpdate();
		},
		fLoadWeightChange(){
			this.bean.fLoadWeight = commonUtils.trimForDigit(this.bean.fLoadWeight,{'allowDecimal':true});
			this.$forceUpdate();
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
        //取消事件
        cancel() {
            this.editVisible = false;
			this.clearUpload();
        },
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		fImageCert1UploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCert1 = result.data.url;
		   this.$forceUpdate();
		},
		fImageCert1Remove(file, fileList) {
		    this.bean.fImageCert1 = "";
		},
		fImageCert2UploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCert2 = result.data.url;
		   this.$forceUpdate();
		},
		fImageCert2Remove(file, fileList) {
		    this.bean.fImageCert2 = "";
		},
		fImageIdcardFUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardF = result.data.url;
		},
		fImageIdcardFRemove(file, fileList) {
		    this.bean.fImageIdcardF = "";
		},
		fImageIdcardNUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardN = result.data.url;
		},
		fImageIdcardNRemove(file, fileList) {
		    this.bean.fImageIdcardN = "";
		},
		//
		fDrivingPermitFaceUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fDrivingPermitFace = result.data.url;
		   this.$forceUpdate();
		},
		fDrivingPermitFaceRemove(file, fileList) {
		    this.bean.fDrivingPermitFace = "";
		},
		fDrivingPermitNextUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fDrivingPermitNext = result.data.url;
		   this.$forceUpdate();
		},
		fDrivingPermitNextRemove(file, fileList) {
		    this.bean.fDrivingPermitNext = "";
		},
		fRoadPermitImageUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fRoadPermitImage = result.data.url;
		   this.$forceUpdate();
		},
		fRoadPermitImageRemove(file, fileList) {
		    this.bean.fRoadPermitImage = "";
		},
		fImageCarUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCar = result.data.url;
		   this.$forceUpdate();
		},
		fImageCarRemove(file, fileList) {
		    this.bean.fImageCar = "";
		},
        //确定事件
        async determine(opType) {
			if(opType!='pass'&&opType!='unpass'){
				this.$message.error("未知的操作类型");
				return false;
			}
			this.bean.opType=opType;
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let result = await request('/account/driver/doAuthCertification', this.bean);
			this.submitting=false;
			if(result.data>=0){
				this.editVisible = false;
				if(opType!='unpass'){
					this.$message.success("审核成功");
				}
				this.$parent.getData();
			}else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(bean.opType!='pass'){
				return true;
			}
			if(commonUtils.isEmpty(bean.fLegalName)){
				this.$message.error("真实姓名不能为空");
				return false;
			}
			if(bean.fLegalName.length>64){
				this.$message.error("真实姓名不能超过64个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLegalIdcard)){
				this.$message.error("身份证号不能为空");
				return false;
			}
			if(commonUtils.isInvalidIDCard(bean.fLegalIdcard)){
				this.$message.error("身份证号格式有误，请输入正确的18位二代身份证号");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fIdcardValidTime)){
			// 	this.$message.error("身份证号有效期不能为空");
			// 	return false;
			// }
			// if(bean.fIdcardValidTime.length>32){
			// 	this.$message.error("身份证号有效期不能超过32个字符");
			// 	return false;
			// }
			if(commonUtils.isEmpty(bean.fImageIdcardF)){
				this.$message.error("请上传身份证照(正面)");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fImageIdcardN)){
			// 	this.$message.error("请上传身份证照(反面)");
			// 	return false;
			// }
			if(commonUtils.isEmpty(bean.fImageCert2)){
				this.$message.error("请上传驾驶证照片");
				return false;
			}
			
			//
			if(commonUtils.isEmpty(bean.fCarNumber)){
				this.$message.error("车牌号不能为空");
				return false;
			}
			if(!commonUtils.plateNumberRegTest(bean.fCarNumber)){
				this.$message.error("车牌号格式有误");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCreditCode)){
				this.$message.error("车辆识别代码不能为空");
				return false;
			}
			if(!commonUtils.VINRegTest(bean.fCreditCode)){
				this.$message.error("车辆识别代码格式有误");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fCarTypeDesp)){
			// 	this.$message.error("车辆类型不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fCarTypeDesp)&&bean.fCarTypeDesp.length>64){
				this.$message.error("车辆类型不能超过64个字符");
				return false;
			}
			//
			// if(commonUtils.isEmpty(bean.fOwner)){
			// 	this.$message.error("车辆所有人不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fOwner)&&bean.fOwner.length>64){
				this.$message.error("车辆所有人不能超过64个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fAddress)){
			// 	this.$message.error("车辆注册地不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fAddress)&&bean.fAddress.length>128){
				this.$message.error("车辆注册地不能超过128个字符");
				return false;
			}
			//
			if(commonUtils.isEmpty(bean.fTotalMass)){
				this.$message.error("总质量不能为空");
				return false;
			}
			if(isNaN(bean.fTotalMass)){
				this.$message.error("总质量须是数字");
				return false;
			}
			if(parseFloat(bean.fTotalMass)<=0){
				this.$message.error("总质量需要大于0");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLoadWeight)){
				this.$message.error("核定载质量不能为空");
				return false;
			}
			if(isNaN(bean.fLoadWeight)){
				this.$message.error("核定载质量须是数字");
				return false;
			}
			if(parseFloat(bean.fLoadWeight)<=0){
				this.$message.error("核定载质量需要大于0");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fOilType)){
			// 	this.$message.error("车辆能源类型不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fOilType)&&bean.fOilType.length>64){
				this.$message.error("车辆能源类型不能超过64个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadPermitCode)){
			// 	this.$message.error("道路运输证号不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadPermitCode)&&bean.fRoadPermitCode.length>64){
				this.$message.error("道路运输证号不能超过64个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadOperateCode)){
			// 	this.$message.error("经营许可证号不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadOperateCode)&&bean.fRoadOperateCode.length>64){
				this.$message.error("经营许可证号不能超过64个字符");
				return false;
			}
			//
			// if(commonUtils.isEmpty(bean.fRoadOperateName)){
			// 	this.$message.error("业户名称不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadOperateName)&&bean.fRoadOperateName.length>64){
				this.$message.error("业户名称不能超过64个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fRoadPermitInvalid)&&bean.fRoadPermitInvalid.length>32){
				this.$message.error("道路运输证有效期不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCarType)||!(bean.fCarType>0)){
				this.$message.error("请选择车型");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCarLength)||!(bean.fCarLength>0)){
				this.$message.error("请选择车长");
				return false;
			}
			if(commonUtils.isEmpty(bean.fPlateColor)){
				this.$message.error("请选择车牌颜色");
				return false;
			}
			//
			if(commonUtils.isEmpty(bean.fDrivingPermitFace)){
				this.$message.error("请上传行驶证(正页)");
				return false;
			}
			if(commonUtils.isEmpty(bean.fDrivingPermitNext)){
				this.$message.error("请上传行驶证(副页)");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadPermitImage)){
			// 	this.$message.error("请上传道路运输证");
			// 	return false;
			// }
			// if(commonUtils.isEmpty(bean.fImageCar)){
			// 	this.$message.error("请上传车辆正面照");
			// 	return false;
			// }
			return true;
		}
    }
};
</script>

