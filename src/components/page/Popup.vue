<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog title="弹窗" :visible.sync="editVisible" width="700px">
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
                                        <div class="name">运营商编号:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input1"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name">运营商简称:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input2"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">运营商类型:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input3"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name">运营商状态:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input4"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news-two">
                            <div class="title">
                                <div class="left">- 基本信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">企业名称:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input5"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">企业信用代码:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input6"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">法人真实姓名:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input7"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name">法人身份证号:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input8"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 基本信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">企业名称:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input9"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>

                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">收款银行:</div>
                                        <el-select
                                            v-model="value1"
                                            placeholder="请选择"
                                            style="width:180px"
                                        >
                                            <el-option
                                                v-for="item in options1"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                    <div class="line-center">
                                        <div class="name">收款账户类型:</div>
                                        <el-select
                                            v-model="value2"
                                            placeholder="请选择"
                                            style="width:180px"
                                        >
                                            <el-option
                                                v-for="item in options2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">收款银行卡号:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input10"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                    <div class="line-center">
                                        <div class="name">银行预留手机号:</div>
                                        <el-input
                                            size="small"
                                            placeholder="请输入内容"
                                            v-model="input11"
                                            style="width:180px"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news-img">
                            <div class="title">
                                <div class="left">- 货物图片</div>
                            </div>
                            <div class="nav">
                                <div class="img">
                                    <img :src="img1" preview="1" preview-text alt />
                                </div>
                                <div class="img">
                                    <img :src="img2" preview="1" preview-textss alt />
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
import '../../assets/css/popup/popup.css';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
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
            options1: [
                {
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
            options2: [
                {
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
            img1: require('../../assets/img/logo.jpg'),
            img2: require('../../assets/img/goods.jpg')
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        
        receipt() {
            this.editVisible = true;
            //获取页面传过来的值
            let popup1 = this.$store.state.Popup.popup1;
            this.input1 = popup1.id;
            this.input2 = popup1.sid;
            this.input3 = popup1.name;
            console.log(popup1);
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine() {
            this.editVisible = false;
        }
    }
};
</script>

