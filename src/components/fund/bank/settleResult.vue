<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">对账日期：</div>
                        <el-date-picker type="date" v-model="date" ref="date"></el-date-picker>
                    </div>
                    <div class="but">
                        <el-button
                            type="primary"
                            @click="query.page=1;marketQuery.page=1;bankQuery.page=1;getData()"
                            style="width:100px"
                        >查询</el-button>
                        <el-button
                            type="primary"
                            @click="download"
                            :disabled="submitting"
                            style="width:100px"
                        >下载对账文件</el-button>
                    </div>
                </div>
                <div class="head-two">
                    <span style="font-size: 12px;padding-left: 33px;">
                        对账文件下载状态：
                        <span style="color: red;">{{downloadStatus}}</span>
                    </span>
                </div>
            </div>

            <div class="from-head">
                <!-- <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item,index)"
                >{{item}}</el-button>-->
                <span style="font-size: 12px;padding-left: 10px;font-weight: bold;">对账汇总</span>
            </div>
            <el-table
                :data="tableData"
                border
                class="table1"
                ref="multipleTable"
                header-cell-class-name="table-header"
                highlight-current-row
                @row-click="clickTableRow"
                @row-contextmenu="rightClick"
                height="150px"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="80"
                    :index="indexMethod"
                    align="center"
                ></el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="port"
                    label="交易端"
                    align="center"
                ></el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payTimes"
                    label="支付总次数"
                    align="center"
                ></el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="payBalance"
                    label="支付总金额"
                    align="center"
                ></el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="refundTimes"
                    label="退款总次数"
                    align="center"
                ></el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="refundBalance"
                    label="退款总金额"
                    align="center"
                ></el-table-column>
            </el-table>
            <div>
                <el-tabs v-model="activeTapName" @tab-click="tabClick">
                    <el-tab-pane label="市场单边账" name="market">
                        <el-table
                            :data="marketTableData"
                            border
                            class="table"
                            ref="marketMultipleTable"
                            header-cell-class-name="table-header"
                            highlight-current-row
                            @row-click="clickTableRow"
                            @row-contextmenu="rightClick"
                            :summary-method="getSummaries"
                            height="390px"
                        >
                            <el-table-column
                                label="序号"
                                type="index"
                                width="80"
                                :index="marketIndexMethod"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fIoCode"
                                label="市场流水号"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fBankFlowId"
                                label="银行流水号"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fIoFlag"
                                :formatter="ioFlagFormat"
                                label="流水类型"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fAmount"
                                label="金额"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fCreateTime"
                                label="支付时间"
                                align="center"
                            ></el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleMarketCurrentChange"
                                :current-page="marketCurrentPage"
                                :page-size="2"
                                layout="total,  prev, pager, next, jumper"
                                :total="marketTotalNumber"
                                @contextmenu.prevent="rightClick"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="银行单边账" name="bank">
                        <el-table
                            :data="bankTableData"
                            border
                            class="table"
                            ref="bankMultipleTable"
                            header-cell-class-name="table-header"
                            highlight-current-row
                            @row-click="clickTableRow"
                            @row-contextmenu="rightClick"
                            :summary-method="getSummaries"
                            height="390px"
                        >
                            <el-table-column
                                label="序号"
                                type="index"
                                width="80"
                                :index="bankIndexMethod"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fIoCode"
                                label="市场流水号"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fBankFlowId"
                                label="银行流水号"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fFlowBankIdBak"
                                label="银行本地流水号"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fIoFlag"
                                :formatter="ioFlagFormat"
                                label="流水类型"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fAmount"
                                label="金额"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                :show-overflow-tooltip="true"
                                prop="fCreateTime"
                                label="支付时间"
                                align="center"
                            ></el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleBankCurrentChange"
                                :current-page="bankCurrentPage"
                                :page-size="2"
                                layout="total,  prev, pager, next, jumper"
                                :total="bankTotalNumber"
                                @contextmenu.prevent="rightClick"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <popup ref="popup"></popup>
        <div id="menu">
            <div
                class="menu"
                v-for="(item,index) in menus"
                :key="index"
                @click.stop="infoClick(item,index)"
            >{{item}}</div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index.js';
// import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

import popup from './popup/bankPop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
            marketQuery: {
                page: 1,
                pageSize: 15
            },
            bankQuery: {
                page: 1,
                pageSize: 15
            },
            selectedRow: '',
            tableData: [],
            marketTableData: [],
            bankTableData: [],
            downloadStatus: '',
            show: false,
            editVisible: false,
            marketTotalNumber: 0,
            bankTotalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            marketCurrentPage: 1,
            bankCurrentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: -1,
            menu: '',
            querying:false,
            activeTapName: 'market',
            date: '',
            submitting: false
        };
    },
    created() {
		this.getData();
        this.getBut();
    },
	activated(){
		this.getData();
	},
    methods: {
        indexMethod(index) {
            return index + 1 + (this.query.page - 1) * this.query.pageSize;
        },
        marketIndexMethod(index) {
            return index + 1 + (this.marketQuery.page - 1) * this.marketQuery.pageSize;
        },
        bankIndexMethod(index) {
            return index + 1 + (this.bankQuery.page - 1) * this.bankQuery.pageSize;
        },
        // 获取表格数据
        async getData() {
            if (!this.date) {
                this.tableData = [];
                this.marketTableData = [];
                this.bankTableData = [];
                this.marketTotalNumber = 0;
                this.bankTotalNumber = 0;
				if(this.$refs.date){
					this.$refs.date.$el.children[0].focus();
				}
                return;
            }
            this.query.date = this.date;
            this.marketQuery.date = this.date;
            this.bankQuery.date = this.date;
			if(this.querying){
						   return;
			}
			this.querying = true;
            let list = await request('/fund/banks/settleResult/totalList', this.query);
			this.querying = false;
            this.tableData = list.data.totalList;
            this.downloadStatus = list.data.downStatus;
            //if(list.data.downStatus=='下载成功'){
            this.queryMarketList();
            this.queryBankketList();
            //}
        },
        async queryMarketList() {
            let list = await request('/fund/banks/settleResult/marketlList', this.marketQuery);
            this.marketTableData = list.data.data;
            this.marketTotalNumber = list.data.total;
        },
        async queryBankketList() {
            let list = await request('/fund/banks/settleResult/bankList', this.bankQuery);
            this.bankTableData = list.data.data;
            this.bankTotalNumber = list.data.total;
        },
        tabClick(tab, event) {
            //console.log(tab, event);
        },
        async btnClick(item, index) {},
        async download() {
            if (!this.date) {
                return;
            }
            this.submitting = true;
            let result = await request('/fund/banks/settleResult/downloadFile', {"date":this.date});
            this.submitting = false;
            if (result.data > 0) {
                this.$message.success('对账文件下载请求成功');
            } else if (!commonUtils.isEmpty(result.errMsg)) {
                this.$message.error(result.errMsg);
            } else {
                this.$message.error('操作失败');
            }
        },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    if (item.fName != '查询') {
                        this.menus.push(item.fName);
                    }
                }
            });
        },
        reset() {
            this.query = {
                page: 1,
                pageSize: 15
            };
            this.getData();
        },
        ioFlagFormat(row) {
            if (row.fIoFlag == 7) {
                return '签约支付';
            }
            if (row.fIoFlag == 10) {
                return '履约金退款';
            }
            if (row.fIoFlag == 8) {
                return '运费支付';
            }
            if (row.fIoFlag == 9) {
                return '服务费支付';
            }
            if (row.fIoFlag == 11) {
                return '运费退款';
            }
            if (row.fIoFlag == 12) {
                return '服务费退款';
            }
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
        handleMarketCurrentChange(val) {
            let num = Math.ceil(this.marketTotalNumber / this.marketQuery.pageSize);
            if (val > num) {
            } else {
                this.marketQuery.page = val;
                this.queryMarketList();
            }
        },
        handleBankCurrentChange(val) {
            let num = Math.ceil(this.bankTotalNumber / this.bankQuery.pageSize);
            if (val > num) {
            } else {
                this.bankQuery.page = val;
                this.queryBankketList();
            }
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        toggleMarketSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleMarketTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleMarketTable.clearSelection();
            }
        },
        toggleBankSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleBankTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleBankTable.clearSelection();
            }
        },
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
            this.selectedRow = row;
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
            // 获取当前右键点击table下标
            this.tableData.forEach((item, index) => {
                if (item.name === row.name) {
                    this.currentRowIndex = index;
                    return false;
                }
            });
        },
        // 自定义菜单的点击事件
        infoClick(item,index) {
			this.btnClick(item,index);
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
<style lang="scss" scoped="">
.el-table--small td {
    padding: 2px 0;
}

.btn-prev:before {
    content: '上一页';
}

.btn-next:before {
    content: '下一页';
}

.el-icon-arrow-left,
.el-icon-arrow-right {
    display: none !important;
}

.el-table__body tr.current-row > td {
    background-color: #a4ccec;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #a4ccec;
}

.BaseTable {
    height: 100%;
    box-sizing: border-box;
    // overflow: scroll;

    .container {
        height: 92.5%;

        /* display: flex; */
        flex-direction: column;
        // overflow: scroll;
        .table1 {
            height: 150px !important;

            /deep/.el-table__body-wrapper {
                height: 100px !important;
            }
        }

        .hrad {
            height: 114px;
        }

        .from-head {
            height: 34px;
        }

        .box {
            flex: 1;
            // overflow: none;
            // overflow-x: scroll;
            // overflow-y: scroll;
        }

        .el-table__body-wrapper {
            // height: 100%;
            width: 100%;
            // overflow-x: none;
            position: relative;
        }

        // .el-table--scrollable-x .el-table__body-wrapper {
        //     overflow-x: auto;
        // }

        // .el-table table .el-table--fit .el-table--border .el-table--scrollable-x .el-table--enable-row-hover .el-table--enable-row-transition .el-table--small {
        //     overflow: hidden !important;
        // }

        .page {
            height: 32px;
            margin-top: 20px;
            padding-bottom: 10px;
            // position: fixed;
            //    bottom: 10px;
        }
    }
}

.head {
    width: 1110px;
    /* padding-bottom: 30px; */

    .head-one,
    .head-two,
    .head-three {
        display: flex;
        margin-bottom: 10px;

        .input1,
        .input2,
        .input3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 20px;
            width: 325px;

            .title {
                font-size: 14px;
                color: rgba($color: #000000, $alpha: 0.8);
                text-align: right;
                flex: 1;
            }
        }
    }

    .head-end {
        display: flex;
        text-align: center;
        justify-content: space-between;

        .input4 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 20px;
            width: 325px;

            .title {
                font-size: 14px;
                color: rgba($color: #000000, $alpha: 0.8);
                text-align: right;
                flex: 1;
            }
        }

        .but {
            margin-right: 96px;
        }
    }
}

.from-head {
    width: 100%;
    height: 40px !important;
    background: #fff;
    border-left: 1px solid rgb(235, 238, 245);
    border-top: 1px solid rgb(235, 238, 245);
    border-right: 1px solid rgb(235, 238, 245);
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .el-button {
        margin-left: 15px;
        background: #ebeef5;
        // border-radius: 5px;
        // box-shadow: 0 0 1px 1px #ccc;
        color: rgb(96, 98, 102);
    }
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.page {
    text-align: right;
}

.table {
    width: 100%;
    font-size: 14px;
}

a {
    color: #333;
}

.right-menu {
    position: fixed;
    background: #fff;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    z-index: 999;
    display: none;
}

.right-menu a {
    width: 75px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    color: #1a1a1a;
}

.right-menu a:hover {
    background: #eee;
    color: #fff;
}

.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
    border-radius: 1px;
}

a {
    text-decoration: none;
}

.right-menu a {
    padding: 2px;
}

.right-menu a:hover {
    background: #42b983;
}

path {
    fill: black;
}

#menu {
    overflow: hidden;
    /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
    position: absolute;
    display: none;
    background: #ffffff;
    z-index: 10;
}

.menu {
    font-size: 14px;

    height: 25px;
    line-height: 25px;

    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 8px;
}

.menu:hover {
    background: #42b983;
    color: #fff;
}
</style>