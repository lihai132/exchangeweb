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
                                        <div class="name">银行名称:</div>
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
                                        <div class="name">出入金渠道:</div>
                                        <el-select :disabled="true" v-model="data.fChannel" placeholder="请选择" style="width:180px">
                                            <el-option
                                            
                                            v-for="item in channel"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">计算类型:</div>
                                        <el-select v-model="data.fType" placeholder="请选择" style="width:180px">
                                            <el-option
                                            v-for="item in calculatelType"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                            
                                            </el-option>
                                        </el-select>

                                    </div>
                                </div>
                               

                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">费率:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fValue"
                                            @input="formatfValue"
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
            data:{
				fName:"",
                fBankCode:"",
                fChannel:"",
				fValue:"",
            },
            dataEx:{
                fValue:"",
            },
            channel:[],
            calculatelType:[],
            fFundId:'',
            memberlist:{},
            dealerStatus:[],
            memberChild:[],
            flag:[],
            img1: require('../../../assets/img/logo.jpg'),
            img2: require('../../../assets/img/goods.jpg')
        };
    },
    created() {
        
        
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        async init(){
            this.channel = (await request('/enum/channel/api', '')).data;
            this.calculatelType = (await request('/enum/calculatelType/api', '')).data;
            
        },
        async getData() {
			
			let dataTemp  =  (await request('/parameter/bankCharge/api', this.data));
			console.log("dataTemp",dataTemp);
			if (undefined != dataTemp) {
				this.data = dataTemp.data;
				this.data.fType = this.data.fType+"";
				this.data.fChannel = this.data.fChannel+"";
			}
        },
        commitData(){
            if (!check.notNulWarn(this, this.data.fValue, "费率")) {
                return false;
            }
            var jsonData = request('/parameter/bankCharge/update', this.data);
            return true;
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.data.fBankCode = popup1.fBankCode;
            this.data.fChannel = popup1.fChannel;
            this.data.fType = popup1.fType;
			
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
            if(!this.commitData()){
                return;
            }
            this.$emit('getData');
            this.$parent.getData();
            this.editVisible = false;
            
        },
        fDealerCateIdFormat(row) {
            console.log(row);
                if(row.fDealerCateId==3){
                    return "运营商方案";
                }
                
	        },
        formatfValue(obj) {
            var num;
            num = obj.replace(/[^0-9.]|^\./g, '').replace(/\.{2,}/g, '.').replace(/^0[0-9]/, '0')
            .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if(num>100){
                num = 100.00;
            }
            this.data.fValue = num; 
        }
    },
    components: {
        
    }
};
</script>

