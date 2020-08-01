<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">关联运单编号和财富的：</div>
                        <el-input v-model="input1" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input2">
                        <div class="title">市场流水号：</div>
                        <el-input v-model="input2" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input3">
                        <div class="title">银行流水号的撒旦：</div>
                        <el-input v-model="input3" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                </div>
                <div class="head-two">
                    <div class="input1">
                        <div class="title">关联运单编号：</div>
                        <el-input v-model="input5" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input2">
                        <div class="title">市场流水号：</div>
                        <el-input v-model="input6" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input3">
                        <div class="title">银行流水号：</div>
                        <el-input v-model="input7" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                </div>
                <div class="head-three">
                    <div class="input1">
                        <div class="title">关联运单编号：</div>
                        <el-input v-model="input8" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input2">
                        <div class="title">市场流水号：</div>
                        <el-input v-model="input9" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input3">
                        <div class="title">银行流水号：</div>
                        <el-input v-model="input10" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                </div>
                <div class="head-end">
                    <div class="input4">
                        <div class="title">业务类型：</div>
                        <el-select
                            v-model="type"
                            placeholder="下拉框"
                            class="handle-select"
                            style="width:170px"
                        >
                            <el-option key="1" label="广东省" value="广东省"></el-option>
                            <el-option key="2" label="湖南省" value="湖南省"></el-option>
                        </el-select>
                    </div>

                    <div class="but">
                        <el-button type="primary" style="width:100px">查询</el-button>
                        <el-button type="primary" style="width:100px">重置</el-button>
                    </div>
                </div>
            </div>

            <div class="from-head">
                <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
                    @click="operation(item)"
                >{{item}}</el-button>
            </div>
            <div class="box" style="position: relative; overflow: auto;height:90%;">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    highlight-current-row
                    @row-click="clickTableRow"
                    @row-contextmenu="rightClick"
                    :summary-method="getSummaries"
                    show-summary
                    style="position: absolute; width: auto; max-width: none;"
                >
                    <el-table-column prop="operatorNumber" label="运营商编号" width="120" align="center"></el-table-column>
                    <el-table-column prop="enterpriseNumber" label="企业编号" width="120"></el-table-column>
                    <el-table-column prop="enterpriseNmae" label="企业简称" width="120"></el-table-column>
                    <el-table-column prop="waybillNumber" label="关联运单号" width="120"></el-table-column>
                    <el-table-column prop="marketNumber" label="市场流水号" width="120"></el-table-column>
                    <el-table-column prop="bankNumber" label="银行流水号" width="200"></el-table-column>
                    <el-table-column prop="marketNumber" label="市场流水号" width="120"></el-table-column>
                    <el-table-column prop="bankNumber" label="银行流水号" width="180"></el-table-column>

                    <el-table-column prop="businessType" label="业务类型" width="150"></el-table-column>
                    <el-table-column prop="time" label="发生时间" width="200"></el-table-column>
                    <el-table-column prop="text" label="描述" width="100"></el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="15"
                    layout="total,  prev, pager, next, jumper"
                    :total="totalNumber"
                    @contextmenu.prevent="rightClick"
                ></el-pagination>
            </div>
        </div>
        <popup ref="popup"></popup>

        <div id="menu">
            <div
                class="menu"
                v-for="(item,index) in menus"
                :key="index"
                @click.stop="infoClick(index)"
            >{{item}}</div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import '../../assets/css/form/forn.css';
import popup from '../page/Popup.vue';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 15
            },
            editVisible1: false,
            tableData: [],
            show: false,
            delList: [],
            editVisible: false,
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
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
            type: '',
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 101001001,
            menu: '',
            loading: true,
            Total1: '',
            Total2: '',
            id: '123456',
            name: 'lihai',
            sid: 'dhfiuwehfiweoswhfewfjiero'
        };
    },
    created() {
        this.getData();
        this.getBut();
    },
    methods: {
        // 获取表格数据
        getData() {
            this.tableData = [
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1516,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1564,
                    marketNumber: 6479,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1517,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1789,
                    marketNumber: 4568,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1518,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1385,
                    marketNumber: 7256,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                },
                {
                    operatorNumber: 1519,
                    enterpriseNumber: 123456,
                    enterpriseNmae: '中像集运',
                    waybillNumber: 1469,
                    marketNumber: 4598,
                    bankNumber: 9461596849484,
                    businessType: '运输业务',
                    variableAmount: 5000,
                    time: '2020-4-20 16:16:16',
                    text: '已结单'
                }
            ];
            this.totalNumber = 4;
            this.tableData.map(item => {
                this.Total1 = Number(this.Total1) + Number(item.marketNumber);
                return this.Total1;
            });
            // console.log(this.Total1);
            this.tableData.map(item => {
                this.Total2 = Number(this.Total2) + Number(item.waybillNumber);
                return this.Total2;
            });
        },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    this.menus.push(item.fName);
                }
            });
        },

        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            let num = Math.ceil(this.totalNumber / this.query.pageSize);
            if (val > num) {
            } else {
                this.getData();
            }
        },
        toggleSelection(rows) {
            if (rows) {
                // console.log(rows);
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                console.log(rows);
                this.$refs.multipleTable.clearSelection();
            }
        },
        operation1() {
            console.log(this.multipleSelection);
        },
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
            this.menu.style.display = 'none';
        },
        rightClick(row, column, event) {
            var menu = document.querySelector('#menu');
            event.preventDefault();
            //获取我们自定义的右键菜单

            // 根据事件对象中鼠标点击的位置，进行定位
            this.menu.style.left = event.clientX - 230 + 'px';
            this.menu.style.top = event.clientY - 70 + 'px';
            // 改变自定义菜单的隐藏与显示
            menu.style.display = 'block';
            console.log(row, column);
            // 获取当前右键点击table下标
            this.tableData.forEach((item, index) => {
                if (item.name === row.name) {
                    this.currentRowIndex = index;
                    return false;
                }
            });
        },
        // 自定义菜单的点击事件
        infoClick(index) {
            this.$alert('当前table的下标为' + this.currentRowIndex, '你点击了自定义菜单的' + this.menus[index] + '功能', {
                confirmButtonText: '确定',
                callback: action => {
                    var menu = document.querySelector('#menu');
                    menu.style.display = 'none';
                }
            });
        },
        getSummaries(param) {
            const { columns } = param;

            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                //this.closeList等等是后台返回的总的数据，然后取值到这里
                switch (column.property) {
                    case 'marketNumber':
                        sums[index] = this.Total1;
                        break;
                    case 'waybillNumber':
                        sums[index] = this.Total2;
                        break;

                    default:
                        break;
                }
            });

            return sums;
        },
        onMouseDown(event) {
            if (event.button == 0) {
                this.menu.style.display = 'none';
            }
        },
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.input1 = popup1.id;
            this.input2 = popup1.sid;
            this.input3 = popup1.name;
            console.log(popup1);
        },
        operation(item) {
            if (item == '查询') {
                let popup1 = {
                    id: this.id,
                    name: this.name,
                    sid: this.sid
                };
                this.$store.commit('setPopup1', popup1);
                this.$refs.popup.receipt();
            }
        }
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
    components: {
        popup
    }
};
</script>
