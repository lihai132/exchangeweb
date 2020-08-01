<template>
    <div class="Popup">
    
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
    
        <el-dialog v-bind:title="title" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
    
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
    
                                        <div class="name">方案名称:</div>
    
                                        <el-input size="small" placeholder="请输入内容" :disabled="true" :value="this.data.fName" style="width:180px"></el-input>
    
                                    </div>
    
                                </div>
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">用户类型:</div>
    
                                        <el-input size="small" placeholder="请输入内容" :disabled="true" :value="this.fDealerCateIdType[this.data.fDealerCateId]" style="width:180px"></el-input>
    
                                    </div>
    
                                </div>
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">客服服务费下限:</div>
    
                                        <el-input :maxlength="maxlenthCharge" @input="CHECK.onlyNumber($data.data,'fChargeOpenFloor')"  size="small" placeholder="请输入内容" v-model.number="data.fChargeOpenFloor" style="width:180px"></el-input>
    
                                    </div>
    
                                </div>
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">客服服务费上限:</div>
    
                                        <el-input size="small" :maxlength="maxlenthCharge" @input="CHECK.onlyNumber($data.data,'fChargeOpenCeil')" placeholder="请输入内容" v-model.number="data.fChargeOpenCeil" style="width:180px"></el-input>
    
                                    </div>
    
                                </div>
    
    
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">市场留存客服服务费:</div>
    
                                        <el-input size="small" placeholder="请输入内容" @input="checkfChargeOpenMarket($event)" v-model="data.fChargeOpenMarket" style="width:180px"></el-input>%
    
                                    </div>
    
                                </div>
    
    
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">调度服务费下限:</div>
    
                                        <el-input size="small" :maxlength="maxlenthCharge" @input="CHECK.onlyNumber($data.data,'fChargeCloseFloor')" placeholder="请输入内容" v-model.number="data.fChargeCloseFloor" style="width:180px"></el-input>
    
                                    </div>
    
                                </div>
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">调度服务费上限:</div>
    
                                        <el-input size="small" :maxlength="maxlenthCharge"  @input="CHECK.onlyNumber($data.data,'fChargeCloseCeil')" placeholder="请输入内容" v-model.number="data.fChargeCloseCeil" style="width:180px">
    
                                        </el-input>
    
                                    </div>
    
                                </div>
    
    
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name">市场留存调度服务费:</div>
    
                                        <el-input @input="checkfChargeCloseMarket($event)" size="small" placeholder="请输入内容" v-model="data.fChargeCloseMarket" style="width:180px"></el-input>%
    
                                    </div>
    
                                </div>
    
                                <div class="line">
    
                                    <div class="line-center">
    
                                        <div class="name"></div>
    
                                        <el-checkbox v-model="data.checked">是否同步全部运营商</el-checkbox>
    
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
import check from '../../../assets/Public/check.js';
import '../../../assets/css/popup/popup.css';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
            maxlenthCharge: "",
            data: {
                fName: '',
                fDealerCateId: '',
                fChargeCloseCeil: '',
                fChargeCloseFloor: '',
                fChargeCloseMarket: '',
                fChargeOpenCeil: '',
                fChargeOpenFloor: '',
                fChargeOpenMarket: '',
                checked: false,
                fChargeCloseMarketEx: '',
            },
            fChargeOpenMarket: '',
            fDealerCateIdType: { '3': '运营商方案' },
            title: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            input10: '',
            input11: '',
            options1: [{
                    value: '选项1',
                    label: '工商银行'
                },
                {
                    value: '选项2',
                    label: '邮政银行'
                },
                {
                    value: '选项3',
                    label: '华夏银行'
                },
                {
                    value: '选项4',
                    label: '农业银行'
                },
                {
                    value: '选项5',
                    label: '东莞银行'
                }
            ],
            options2: [{
                    value: '选项1',
                    label: '借记卡'
                },
                {
                    value: '选项2',
                    label: '信用卡'
                }
            ],
            value1: '',
            value2: '',
            img1: require('../../../assets/img/logo.jpg'),
            img2: require('../../../assets/img/goods.jpg')
        };
    },
    created() {
       this.init();
    },
    mounted() {

    },
    methods: {
        init() {
            this.maxlenthCharge = check.maxlenthCharge;

        },
        async getData() {
            let body = { fDealerCateId: this.fDealerCateId };
            var jsonData = await request('/parameter/servercharge/default/charge/api', body);
            this.data = jsonData.data;
        },
        commitData() {
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
            var jsonData = request('/parameter/servercharge/default/update', this.data);
            return true;



        },
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
            request('/parameter/servercharge/default/update', this.data).then(response => {
                if(response.errCode != "0"){
                     this.$message.error(response.errMsg);
                     return;
                 }else{
                    obj.$parent.getData();
                    obj.editVisible = false;
                 }
            });
        },
        fDealerCateIdFormat(row) {
            if (row.fDealerCateId == 3) {
                return '运营商方案';
            }
        },
        check1(obj) {
            obj.value = obj.value.replace(/[^0-9.]|^\./g, '').replace(/^0[0-9]/g, '0');
            obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
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
