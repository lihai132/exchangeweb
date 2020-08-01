<template>
    <div class="Popup">
        <el-dialog title="运营商绑定" :visible.sync="editVisible" width="750px" :close-on-click-modal="false">
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
								            disabled="disabled"
								            v-model="bean.fCode"
								            style="width:230px"
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
                                            style="width:230px"
                                        ></el-input>
                                    </div>
                                </div>
							</div>
                        </div>
                        <div class="news-img">
                            <div class="title">
                                <div class="left">- 运营商绑定</div>
                            </div>
                            <div class="nav" style="padding-left: 10px;">
                                <el-transfer
									ref="bindTransfer"
                                    v-model="selectedDealerIds"
									:render-content="renderFunc"
									:button-texts="['到左边', '到右边']"
									:titles="['要绑定的运营商', '已绑定的运营商']"
                                    :data="data">
										<span slot-scope="{ option }" :title="option.label">{{option.label}}</span>
                                  </el-transfer>
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
export default {
    data() {
        return {
            editVisible: false,
            submitting:false,
			selectedDealerIds:[],
			bean:{},
            data: [],
			img1: require('../../assets/img/logo.jpg'),
			img2: require('../../assets/img/goods.jpg')
        };
    },
    methods: {
       async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.selectedDealerIds=[];
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			let result = await request('/account/center/bindMemberList', {"fDealerId":this.bean.fDealerId});
			this.data = result.data;
			let binded = await request('/account/center/getBindedMemberIds', {"fDealerId":this.bean.fDealerId});
			if(binded.data!=null&&binded.data!=undefined&&binded.data.length>0){
				this.selectedDealerIds = binded.data;
			}
			if(this.$refs.bindTransfer){
			  this.$refs.bindTransfer.$children["0"]._data.query = '';
			  // 清空右边搜索
			  this.$refs.bindTransfer.$children["3"]._data.query = '';
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
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let obj = {};
			obj.fDealerId=bean.fDealerId;
			obj.selectedDealerIds=this.selectedDealerIds.join(",");
			this.submitting=true;
			let result = await request('/account/center/doBindMembers', obj);
			this.submitting=false;
			if(result.data>=0){
				this.editVisible = false;
				this.$message.success("绑定成功");
				//this.$parent.getData();
			}else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(!(bean.fDealerId>0)){
				this.$message.error("请选择数据");
				return false;
			}
			if(commonUtils.isEmpty(this.selectedDealerIds)||this.selectedDealerIds.length==0){
				this.$message.error("请选择要绑定的运营商并移到右边");
				return false;
			}
			return true;
		}
    }
};
</script>

