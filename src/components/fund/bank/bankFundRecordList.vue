<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<span style="color: rgba(0, 0, 0, 0.8);font-size: 14px;line-height:31px;">交易日期：</span>
                    <div class="input1">
                        <el-date-picker type="daterange" v-model="rangeDate" ref="rangeDate"
                        	  align="right"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                        	  :picker-options="pickerOptions"
                        	  @change="change()"
                        	  >
                        </el-date-picker>
                    </div>
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
                </div>
            </div>

            <!-- <div class="from-head">
                <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item,index)"
                >{{item}}</el-button>
            </div> -->
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
				<el-table-column :show-overflow-tooltip="true" prop="fTradeDate" :formatter="dateFormat" label="交易日期" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankName" label="银行名称" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankFundBalance" label="银行总资金"  align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fMaountInCount" label="当日支付次数"  align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAmountInSum" label="当日支付金额"  align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fRefundCount" label="当日退款次数"  align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fRefundSum" label="当日退款金额"  align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAmountOutCount" label="当日提现次数"  align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAmountOutSum" label="当日提现金额"  align="center"></el-table-column>
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
import  "../../../assets/css/form/forn.css";
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
			selectedRow:"",
            tableData: [],
			bankList:[],
            show: false,
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: -1,
            menu: '',
			rangeDate:'',
            pickerOptions: {
              shortcuts: [{
            	text: '最近一周',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            	  picker.$emit('pick', [start, end]);
            	}
              }, {
            	text: '最近一个月',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            	  picker.$emit('pick', [start, end]);
            	}
              }, {
            	text: '最近三个月',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            	  picker.$emit('pick', [start, end]);
            	}
              }]
            },
			querying:false,
        };
    },
    created() {
		var date = new Date();
		date.setTime(date.getTime() - 3600 * 1000 * 24);
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		this.rangeDate = [firstDay,date];
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
        // 获取表格数据
       async getData() {
		   var startDate,endDate;
		   if(!(this.rangeDate)||this.rangeDate.length!=2){
			   if(this.$refs.rangeDate){
				   this.$refs.rangeDate.$el.children[1].focus();
			   }
				return;
		   }
		   startDate = this.rangeDate[0];
		   endDate = this.rangeDate[1];
		   if(startDate>endDate){
			   this.$message.error("开始时间不能大于结束时间");
			   return false;
		   }
		   this.query.startDate = startDate;
		   this.query.endDate = endDate;
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   let res = await request('/fund/banks/bankFundRecordList', this.query);
		   this.querying = false;
		   var datas = res.data;
		   this.sumData = datas.columnSummary;
		   this.tableData = datas.data;
		   this.totalNumber = datas.total;
        },
		async btnClick(item,index){
			
		},
		dateFormat(row){
			var fTradeDate = row.fTradeDate;
			if(fTradeDate&&fTradeDate.length>10){
				return fTradeDate.substr(0,10);
			}
			return fTradeDate;
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
			var date = new Date();
			date.setTime(date.getTime() - 3600 * 1000 * 24);
			var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			this.rangeDate = [firstDay,date];
		    this.getData();  
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
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
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
			const sums = [];
			sums[0] = '总计';
			if(!this.sumData){
				return sums;
			}
            const { columns } = param;

            columns.forEach((column, index) => {
                if (index === 0) {
                    return;
                }
				sums[index] = this.sumData[column.property];
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
	    
	}
};
</script>
