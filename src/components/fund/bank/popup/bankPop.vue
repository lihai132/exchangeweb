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
                                    <div class="line-center" style="padding-top:15px">
                                        <div class="name required">银行名称：</div>
                                        <el-input
                                            size="small"
                                            v-model="bean.fName"
                                            style="width:180px"
											:disabled="true"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
						
						<div style="margin: 25px;"></div>
						<div class="news-two" >
						    <div class="title">
						        <div class="left">- 银行状态</div>
						    </div>
						    <div class="nav">
						        <div class="line">
						            <div class="line-center" style="padding-top:15px">
						                <div class="name required">银行状态：</div>
						                <el-select v-model="bean.fStatus">
											<el-option key="1" label="可用" value="1"></el-option>
											<el-option key="2" label="不可用" value="2"></el-option>
										</el-select>
						            </div>
						        </div>
								<div class="line">
								    <div class="line-center" style="padding-top:15px">
								        <div class="name required">是否允许入金：</div>
								        <el-select v-model="bean.fInFundFlag">
											<el-option key="1" label="是" value="1"></el-option>
											<el-option key="2" label="否" value="2"></el-option>
										</el-select>
								    </div>
								</div>
								
								<div class="line">
								    <div class="line-center" style="padding-top:15px">
								        <div class="name required">是否允许出金：</div>
								        <el-select v-model="bean.fOutFundFlag">
											<el-option key="1" label="是" value="1"></el-option>
											<el-option key="2" label="否" value="2"></el-option>
										</el-select>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center" style="padding-top:15px">
								        <div class="name required">是否允许签约：</div>
								        <el-select v-model="bean.fSignFlag">
											<el-option key="1" label="是" value="1"></el-option>
											<el-option key="2" label="否" value="2"></el-option>
										</el-select>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center" style="padding-top:15px">
								        <div class="name required">是否允许解约：</div>
								        <el-select v-model="bean.fUnsignFlag">
											<el-option key="1" label="是" value="1"></el-option>
											<el-option key="2" label="否" value="2"></el-option>
										</el-select>
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
				<!-- </el-form> -->
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
export default {
    data() {
        return {
            editVisible: false,
			submitting:false,
            bean:{},
            titleName: '',
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
			this.titleName='修改银行状态';
			if(this.bean.fStatus){
				this.bean.fStatus +='';
			}
			if(this.bean.fInFundFlag){
				this.bean.fInFundFlag +='';
			}
			if(this.bean.fOutFundFlag){
				this.bean.fOutFundFlag +='';
			}
			if(this.bean.fSignFlag){
				this.bean.fSignFlag +='';
			}
			if(this.bean.fUnsignFlag){
				this.bean.fUnsignFlag +='';
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
       async  determine(formName) {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let url = '/fund/banks/bank/update';
			let result = await request(url, this.bean);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				if(this.bean.fId>0){
					this.$message.success("修改成功");
				}else{
					this.$message.success("新增成功");
				}
				this.$parent.getData();
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(!(bean.fStatus>0)){
				this.$message.error("请选择银行状态");
				return false;
			}
			if(!(bean.fInFundFlag>0)){
				this.$message.error("请选择是否允许入金");
				return false;
			}
			if(!(bean.fOutFundFlag>0)){
				this.$message.error("请选择是否允许出金");
				return false;
			}
			if(!(bean.fSignFlag>0)){
				this.$message.error("请选择是否允许签约");
				return false;
			}
			if(!(bean.fUnsignFlag>0)){
				this.$message.error("请选择是否允许解约");
				return false;
			}
			return true;
		}
    }
};
</script>

