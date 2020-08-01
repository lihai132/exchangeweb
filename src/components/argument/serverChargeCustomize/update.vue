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
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">方案名称:</div>
                                        <el-input
                                            size="small"
                                            :maxlength="32"
                                            placeholder="请输入内容"
                                            v-model="data.fName"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">运营商:</div>
                                        <el-select v-model="data.fDealerId" placeholder="请选择" style="width: 180px;" disabled="true">
                                            <el-option
                                            v-for="item in memberlist"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            <span style="float: left">{{ item.value }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.add }}</span>
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
                                        <div class="name" style="width:140px">方案类型:</div>
                                        <el-select v-model="data.fDealerCateId" placeholder="请选择" style="width: 180px;" disabled="true">
                                            <el-option
                                            v-for="item in fDealerCateIdType"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            <!-- <span style="float: left">{{ item.value }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.add }}</span> -->
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>

                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">客服服务费下限:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model.number="data.fChargeOpenMin"
											@input="CHECK.onlyNumber($data.data,'fChargeOpenMin')"
                                            :maxlength="maxlenthCharge"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">客服服务费上限:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fChargeOpenMax"
											@input="CHECK.onlyNumber($data.data,'fChargeOpenMax')"
                                            :maxlength="maxlenthCharge"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">市场留存客服服务费:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fChargeOpenMarket"
                                            
                                             @input="checkfChargeOpenMarket($event)"
                                            style="width:180px"
                                        ></el-input>%
                                    </div>
                                </div>
                                
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">调度服务费下限:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fChargeCloseMin"
                                            :maxlength="maxlenthCharge"
											@input="CHECK.onlyNumber($data.data,'fChargeCloseMin')"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">调度服务费上限:</div>
                                            <el-input
                                                size="small"
                                                placeholder="请输入内容"
                                                v-model="data.fChargeCloseMax"
												@input="CHECK.onlyNumber($data.data,'fChargeCloseMax')"
                                                :maxlength="maxlenthCharge"
                                                style="width:180px"
                                            >
                                            </el-input>
                                    </div>
                                </div>
                                
                                <div class="line">
                                        <div class="line-center">
                                            <div class="name" style="width:140px">市场留存调度服务费:</div>
                                            <el-input
                                                size="small"
                                                placeholder="请输入内容"
                                                v-model="data.fChargeCloseMarket"
                                                @input="checkfChargeCloseMarket($event)"
                                                style="width:180px"
                                            ></el-input>%
                                        </div>
                                </div>
                            </div>
                            
                              
                        </div>
                        <!--  <listHome ref="listHome"></listHome> -->
                        
                        
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
<script>
import request from '../../../assets/Public/request.js';
import '../../../assets/css/popup/popup.css';
import listHome from '../serverChargeCustomize/list.vue';
import check from '../../../assets/Public/check.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
            maxlenthCharge: "",
            data:{
                fSchemaId:'',
                fName:'',
                fNameEx:'',
                fDealerId:"",
                fDealerCateId:'',
                fChargeCloseMin:'',
                fChargeCloseMax:"",
                fChargeCloseMarket:"",
                fChargeOpenMin:"",
                fChargeOpenMax:"",
                fChargeOpenMarket:""
            },
            memberlist:{},
            fDealerCateIdType:[{"key":"3","value":"运营商方案"}],
            img1: require('../../../assets/img/logo.jpg'),
            img2: require('../../../assets/img/goods.jpg')
        };
    },
    created() {
        this.init();
        
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        init() {
            this.maxlenthCharge = check.maxlenthCharge;
        },
        showData(){
            
        },
        async getData() {
            let body1 = {"":""};
		    var jsonData = (await request('/memberAll/list/api', body1));
			this.memberlist = jsonData.data ;
		    let body = {"fSchemaId":this.data.fSchemaId};
		    var jsonData = (await request('/parameter/servercharge/customsize/api', body));
            if(jsonData.data != null){
                this.data = jsonData.data ;
            }
            this.data.fDealerId = this.data.fDealerId+"";
            this.data.fDealerCateId = this.data.fDealerCateId+"";
			
			
        },
        commitData(){
             if (!check.notNulWarn(this, this.data.fName, "方案名称")) {
                return false;
            }
            if(this.data.fDealerId == ''){
                this.$message({message: '请选择运营商',type: 'error'});
                return false;
            }
            if(this.data.fDealerCateId == ''){
                this.$message({message: '请选择方案类型',type: 'error'});
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenMin, "客服服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenMax, "客服服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeOpenMin, "客服服务费下限", this.data.fChargeOpenMax, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseMin, "调度服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseMax, "调度服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeCloseMin, "调度服务费下限", this.data.fChargeCloseMax, "调度服务费上限")) {
                return false;
            }
            var jsonData = request('/parameter/servercharge/customsize/update', this.data);
           
            return true;
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.data.fSchemaId = popup1.fSchemaId;
            
            this.title = popup1.title;
            this.getData();
            
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine() {
            if (!check.notNulWarn(this, this.data.fName, "方案名称")) {
                return false;
            }
            if(this.data.fDealerId == ''){
                this.$message({message: '请选择运营商',type: 'error'});
                return false;
            }
            if(this.data.fDealerCateId == ''){
                this.$message({message: '请选择方案类型',type: 'error'});
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenMin, "客服服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenMax, "客服服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeOpenMin, "客服服务费下限", this.data.fChargeOpenMax, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseMin, "调度服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseMax, "调度服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeCloseMin, "调度服务费下限", this.data.fChargeCloseMax, "调度服务费上限")) {
                return false;
            }
            let obj = this;
            request('/parameter/servercharge/customsize/update', this.data).then(response => {
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
                if(row.fDealerCateId==3){
                    return "运营商方案";
                }
                
	        },
        checkfChargeOpenMarket(obj) {
            var num;
            num = obj.replace(/[^0-9.]|^\./g, '').replace(/\.{2,}/g, '.').replace(/^0[0-9]/, '0')
            .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if(num>100){
                num = 100.00;
            }
            this.data.fChargeOpenMarket = num; 
        }
        ,
        checkfChargeCloseMarket(obj) {
            var num;
            num = obj.replace(/[^0-9.]|^\./g, '').replace(/\.{2,}/g, '.').replace(/^0[0-9]/, '0')
            .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if(num>100){
                num = 100.00;
            }
            this.data.fChargeCloseMarket = num; 
        }
    },
    components: {
        listHome
    }
};
</script>

