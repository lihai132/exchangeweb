<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog  v-bind:title="title"   :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 基本信息</div>
                            </div>
                            <div class="nav"><div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商编号:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fCode"
                                            :disabled="true"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商简称:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fName"
                                            :disabled="true"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商类型:</div>
                                        <el-select :disabled="true" v-model="data.fTypeChild" placeholder="请选择" style="width:180px">
                                            <el-option
                                            
                                            v-for="item in memberChild"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            
                                            </el-option>
                                        </el-select>
                                        <!-- <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            :disabled="true"
                                            :value="data.fNameEx"
                                            style="width:180px"
                                        ></el-input> -->
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商状态:</div>
                                        <el-select :disabled="true" v-model="data.fStatus" placeholder="请选择" style="width:180px">
                                            <el-option
                                            v-for="item in dealerStatus"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            
                                            </el-option>
                                        </el-select>
                                        <!-- <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            :disabled="true"
                                            :value="data.fNameEx"
                                            style="width:180px"
                                        ></el-input> -->
                                    </div>
                                </div>
                               

                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">税率:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fTaxRate"
                                            @input="checkfTaxRate($event)"
                                            style="width:180px"
                                        ></el-input>%
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">是否审核司机:</div>
                                        <el-select v-model="data.fDriverAutoAudit" placeholder="请选择" style="width:180px">
                                            <el-option
                                            v-for="item in flag"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            
                                            </el-option>
                                        </el-select>
                                        
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">运营商出金阈值:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fMOutFundThreshold"
											@input="CHECK.onlyNumber($data.data,'fMOutFundThreshold',7)"
                                            :maxlength="7"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">客服服务费比例:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model.number="data.fOperatorCharge"
                                            style="width:180px"
                                            @input="checkfOperatorCharge($event)"
                                        ></el-input>%
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
import request from '../../../assets/Public/request.js';
import '../../../assets/css/popup/popup.css';
import check from '../../../assets/Public/check.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
            data:{},
            fFundId:'',
            memberlist:{},
            dealerStatus:[],
            memberChild:[],
            flag:[],
			title:''
        };
    },
    created() {
        
        
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        async init(){
            this.dealerStatus = (await request('/enum/dealerStatus/api', this.query)).data;
            this.memberChild =  (await request('/enum/memberChildType/api', this.query)).data;
            this.flag =  (await request('/enum/numberTransBoolean/api', this.query)).data;
        },
        async getData() {
			let body = {"fFundId":this.fFundId};
		    var jsonData = (await request('/parameter/member/param//api', body));
		    
            if(jsonData.data != null){
                this.data = jsonData.data ;
            }
            this.data.fTypeChild = this.data.fTypeChild + "";
            this.data.fStatus = this.data.fStatus + "";
            this.data.fDriverAutoAudit = this.data.fDriverAutoAudit + "";
			
        },
        commitData(){
            if (!check.notNulWarn(this, this.data.fTaxRate, "税率")) {
                return false;
            }
            
            if (!check.notNulWarn(this, this.data.fMOutFundThreshold, "运营商出金阈值")) {
                return false;
            }
            
            if (!check.notNulWarn(this, this.data.fOperatorCharge, "客服服务费比例")) {
                return false;
            }
            var jsonData = request('/parameter/member/param/update', this.data);
            return true;
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.fFundId = popup1.fFundId;
            
            this.title = popup1.title;
            this.init();
            this.getData();
            
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine() {
            if (!check.notNulWarn(this, this.data.fTaxRate, "税率")) {
                return false;
            }
            
            if (!check.notNulWarn(this, this.data.fMOutFundThreshold, "运营商出金阈值")) {
                return false;
            }
            
            if (!check.notNulWarn(this, this.data.fOperatorCharge, "客服服务费比例")) {
                return false;
            }
            let obj = this;
            request('/parameter/member/param/update', this.data).then(response => {
                if(response.errCode != "0"){
                    
                     this.$message.error(response.errMsg);
                     return;
                 }else{
                    obj.$parent.getData();
                    obj.editVisible = false;
                 }
            });
            
        },
        fDealerCateIdFormat(row) {
            console.log(row);
                if(row.fDealerCateId==3){
                    return "运营商方案";
                }
                
	        }
    ,
        checkfTaxRate(obj) {
            var num;
            num = obj.replace(/[^0-9.]|^\./g, '').replace(/\.{2,}/g, '.').replace(/^0[0-9]/, '0')
            .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if(num>100){
                num = 100.00;
            }
            this.data.fTaxRate = num; 
        }
        ,
        checkfOperatorCharge(obj) {
            var num;
            num = obj.replace(/[^0-9.]|^\./g, '').replace(/\.{2,}/g, '.').replace(/^0[0-9]/, '0')
            .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if(num>100){
                num = 100.00;
            }
            this.data.fOperatorCharge = num; 
        }
    },
    components: {
        
    }
};
</script>

