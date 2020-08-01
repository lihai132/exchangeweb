<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					    <div class="title">银行名称：</div>
					    <el-select v-model="query.fBankCode">
					    	<el-option
					    	      v-for="item in bankList"
					    	      :key="item.fBankCode"
					    	      :label="item.fName"
					    	      :value="item.fBankCode">
					    	</el-option>
					    </el-select>
					</div>
					<div class="input1">
					    <div class="title">平台类型：</div>
					    <el-select
					        v-model="query.fAccountType"
					        class="handle-select"
					        style="width:170px"
					    >
					        <el-option key="" label="全部" value=""></el-option>
					        <el-option key="1" label="交易商" value="1"></el-option>
					        <el-option key="2" label="交易员" value="2"></el-option>
					    </el-select>
					</div>
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
                </div>
				
            </div>

            <div class="from-head" v-if="menus.length>0">
                <el-button 
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item,index)"
                >{{item}}</el-button>
            </div>
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
                
            >
				<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankName" label="银行名称" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAccountType" :formatter="typeFormat" label="平台账户类型" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fWeekDay" :formatter="weekdayFormat" label="星期" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="是否启用" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fStartTime" label="开始时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fEndTime" label="结束时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fUpdateTime" label="更新时间" width="160" align="center"></el-table-column>
            </el-table>
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
                @click.stop="infoClick(item,index)"
            >{{item}}</div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

import popup from './popup/timeSettingPop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
			selectedRow:"",
            tableData: [],
            show: false,
            bankList: [],
            editVisible: false,
			dialogVisible:false,
			balanceDialogVisible:false,
			balanceTip:'',
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 301014008,
            menu: '',
            submitting: false,
            querying:false,
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
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
		async init(){
			let ops = await request('/fund/banks/bank/listBanksOption', {});
			if(!ops.data){
				ops.data = [];
			}
			ops.data.unshift({"fBankCode":null,"fName":"全部"});
			this.bankList = ops.data;
		},
        // 获取表格数据
       async getData() {
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   this.submitting=false;
		   let list = await request('/fund/withdraw/setting/timeSetting', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item,index){
			if(item=='修改'){
				if(!(this.selectedRow)){
					this.$message.error("请选择数据");
					return;
				}
				
				this.$store.commit('setPopup1', this.selectedRow);
				this.$refs.popup.receipt();
				return;
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    if(item.fName!='查询'){
                    	this.menus.push(item.fName);
                    }
                }
            });
        },
		reset(){
			this.query = {
			    page: 1,
			    pageSize: 15
			}
		    this.getData();  
		},
		typeFormat(row){
			if(row.fAccountType==1){
				return '交易商'
			}
			if(row.fAccountType==2){
				return '交易员'
			}
		},
		statusFormat(row){
			if (row.fStatus == 2){
				return "禁用";
			}
			if (row.fStatus == 1){
				return "启用";
			}
		},
		weekdayFormat(item){
			if (item.fWeekDay == 1){
				return "星期一";
			}
			if (item.fWeekDay == 2){
				return "星期二";
			}
			if (item.fWeekDay == 3){
				return "星期三";
			}
			if (item.fWeekDay == 4){
				return "星期四";
			}
			if (item.fWeekDay == 5){
				return "星期五";
			}
			if (item.fWeekDay == 6){
				return "星期六";
			}
			if (item.fWeekDay == 7){
				return "星期日";
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
        handleCurrentChange(val) {
            let num = Math.ceil(this.totalNumber / this.query.pageSize);
            if (val > num) {
            } else {
				this.query.page = val;
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
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
			this.selectedRow=row;
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
        },
        
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
