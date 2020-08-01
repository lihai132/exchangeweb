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
                                        <div class="name">积分等级:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fLevelName"
                                            :disabled="true"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                 <div class="line">
                                    <div class="line-center">
                                        <div class="name">所需积分:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fScore"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">福币奖励:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fFubiReward"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">货主别名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fCustomerTitle"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">司机别名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fDriverTitle"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">客服别名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fOperatorTitle"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">调度别名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fDispatcherTitle"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">经纪人别名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="data.fBrokerTitle"
                                            style="width:180px"
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
                
            },
            fLevelId:'',
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
            
        },
        async getData() {
			let body = {"fLevelId":this.fLevelId};
		    var jsonData = (await request('/parameter/scoreLevel/param/detail', body));
		    console.log(jsonData);
            if(jsonData.data != null){
                this.data = jsonData.data ;
            }

			
        },
        async commitData(){
            if (!check.notNulWarn(this, this.data.fLevelName, "积分等级")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fScore, "所需积分")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fFubiReward, "福币奖励")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fCustomerTitle, "货主别名")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fDriverTitle, "司机别名")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fOperatorTitle, "客服别名")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fDispatcherTitle, "调度别名")) {
                return false;
            }
            if (!check.notNulWarn(this, this.data.fBrokerTitle, "经纪人别名")) {
                return false;
            }
            var jsonData = (await request('/parameter/scoreLevel/param/update', this.data));
            return true;
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.fLevelId = popup1.fLevelId;
            
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
            this.$parent.getData();
            this.editVisible = false;
            
        },
        fDealerCateIdFormat(row) {
            console.log(row);
                if(row.fDealerCateId==3){
                    return "运营商方案";
                }
                
	        }
    },
    components: {
        
    }
};
</script>

