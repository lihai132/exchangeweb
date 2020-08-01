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
                                            :maxlength="32"
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fName"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name" style="width:140px">运营商:</div>
                                        <el-select v-model="data.fDealerId" placeholder="请选择" style="width: 180px;">
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
                                        <el-select v-model="data.fDealerCateId" placeholder="请选择" style="width: 180px;">
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
                                            v-model.number="data.fChargeOpenFloor"
											@input="CHECK.onlyNumber($data.data,'fChargeOpenFloor')"
                                            :maxlength="maxlenthCharge"
                                            size="small"
                                            placeholder="请输入内容"
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
                                            v-model.number="data.fChargeOpenCeil"
											@input="CHECK.onlyNumber($data.data,'fChargeOpenCeil')"
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
                                            @input="checkfChargeOpenMarket($event)"
                                            placeholder="请输入内容"
                                            v-model="data.fChargeOpenMarket"
                                            :maxlength="maxlenthCharge"
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
                                            v-model.number="data.fChargeCloseFloor"
											@input="CHECK.onlyNumber($data.data,'fChargeCloseFloor')"
                                            :maxlength="maxlenthCharge"
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
                                                v-model.number="data.fChargeCloseCeil"
												@input="CHECK.onlyNumber($data.data,'fChargeCloseCeil')"
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
                                                @input="checkfChargeCloseMarket($event)"
                                                v-model="data.fChargeCloseMarket"
                                                :maxlength="maxlenthCharge"
                                                style="width:180px"
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
<script>
import request from '../../../assets/Public/request.js';
import '../../../assets/css/popup/popup.css';
import check from '../../../assets/Public/check.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
            maxlenthCharge: "",
            data:{
                fName:'',
                fNameEx:'',
                fDealerId:"",
                fDealerCateId:'',
                fChargeCloseCeil:'',
                fChargeCloseFloor:"",
                fChargeCloseMarket:"",
                fChargeOpenCeil:"",
                fChargeOpenFloor:"",
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
        showData(){
            console.log(JSON.stringify( this.data));
        },
        init() {
            this.maxlenthCharge = check.maxlenthCharge;

        },
        async getData() {
		   let body = {"":""};
		    var jsonData = (await request('/memberNormal/list/api', body));
			this.memberlist = jsonData.data ;
			
			
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
            if (!check.notNulWarn(this, this.data.fChargeOpenFloor, "客服服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeOpenFloor, "客服服务费下限", this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseFloor, "调度服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseCeil, "调度服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeCloseFloor, "调度服务费下限", this.data.fChargeCloseCeil, "调度服务费上限")) {
                return false;
            }
            var jsonData = request('/parameter/servercharge/customsize/add', this.data);
            console.log(jsonData);
            return true;
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.fDealerCateId = popup1.fDealerCateId;
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
            if (!check.notNulWarn(this, this.data.fChargeOpenFloor, "客服服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeOpenFloor, "客服服务费下限", this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeOpenCeil, "客服服务费上限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseFloor, "调度服务费下限")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fChargeCloseCeil, "调度服务费上限")) {
                return false;
            }
            if (!check.v1NotGTv2(this, this.data.fChargeCloseFloor, "调度服务费下限", this.data.fChargeCloseCeil, "调度服务费上限")) {
                return false;
            }
            let obj = this;
            request('/parameter/servercharge/customsize/add', this.data).then(response => {
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
    }
};
</script>

