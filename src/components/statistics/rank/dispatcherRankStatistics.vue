<template>
    <div class="BaseTable1">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1" style="width: 161px;">
                        <div class="title">统计周期：</div>
						<el-select
						    v-model="query.statType"
						    class="handle-select"
						    style="width:90px"
							@change="statTypeChange()"
						>
							<!-- <el-option key="1" label="日" value="1"></el-option> -->
						    <el-option key="2" label="周" value="2"></el-option>
						    <el-option key="3" label="月" value="3"></el-option>
							<el-option key="4" label="年" value="4"></el-option>
						</el-select>
                    </div>
					<div class="input1" style="width: 150px;">
						<el-date-picker :type="dateType" :format="dateFormat" v-model="tradeDate" ref="tradeDate" :placeholder="tradeDatePlaceholder">
						</el-date-picker>
					</div>
					<div v-if="showRangeDate&&query.statType!=2&&query.statType!=4" class="input1" style="width:220px;">
						<el-date-picker :type="rangeDateType" v-model="rangeDate" ref="rangeDate"
							  align="right"
						      unlink-panels
						      range-separator="至"
						      :start-placeholder="startPlaceholder"
						      :end-placeholder="endPlaceholder"
							  :placeholder="rangeDatePlaceholder"
							  :picker-options="pickerOptions"
							  >
						</el-date-picker>
					</div>
					<div v-if="showRangeDate&&(query.statType==2||query.statType==4)" class="input1" style="width: 150px;">
						<el-date-picker :type="dateType" :format="dateFormat" v-model="startDate" ref="startDate" :placeholder="startDatePlaceholder">
						</el-date-picker>
					</div>
					<span v-if="showRangeDate&&(query.statType==2||query.statType==4)" style="line-height:31px;">至</span>
					<div v-if="showRangeDate&&(query.statType==2||query.statType==4)" class="input1" style="width: 150px;padding-left: 15px;">
						<el-date-picker :type="dateType" :format="dateFormat" v-model="endDate" ref="endDate" :placeholder="endDatePlaceholder">
						</el-date-picker>
					</div>
					<div class="but">
					    <el-button type="primary" @click="resetPage();getData()" :disabled="submitting" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
                </div>
            </div>

			<el-tabs v-model="activeTapName" @tab-click="tabClick">
				<el-tab-pane label="成交量" name="count">
					<el-table
					    :data="countTableData"
					    border
					    class="table1"
					    header-cell-class-name="table-header"
					    highlight-current-row
					>
						<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fCode" label="运营商编号" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fName" label="运营商简称" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fMobile" label="调度员账号" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fTraderName" label="调度员简称" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fRank" label="排名" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fAmount" label="成交运单量" align="center"></el-table-column>
					</el-table>
					<div class="page">
					    <el-pagination
					        @size-change="handleTableSizeChange"
					        @current-change="handleCurrentChange"
					        :current-page="currentPage"
					        :page-size="countQuery.pageSize"
					        layout="total,  prev, pager, next, jumper"
					        :total="countTotalNumber"
					    ></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="成交额" name="freight">
					<el-table
					    :data="freightTableData"
					    border
					    class="table1"
					    header-cell-class-name="table-header"
					    highlight-current-row
					>
						<el-table-column label="序号" type="index" width="80" :index='freightIndexMethod' align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fCode" label="运营商编号" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fName" label="运营商简称" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fMobile" label="调度员账号" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fTraderName" label="调度员简称" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fRank" label="排名" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fAmount" label="成交运费金额" align="center"></el-table-column>
					</el-table>
					<div class="page">
					    <el-pagination
					        @size-change="handleFreightTableSizeChange"
					        @current-change="handleFreightCurrentChange"
					        :current-page="freightCurrentPage"
					        :page-size="freightQuery.pageSize"
					        layout="total,  prev, pager, next, jumper"
					        :total="freightTotalNumber"
					    ></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="收入" name="charge">
					<el-table
					    :data="chargeTableData"
					    border
					    class="table1"
					    header-cell-class-name="table-header"
					    highlight-current-row
					>
						<el-table-column label="序号" type="index" width="80" :index='chargeIndexMethod' align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fCode" label="运营商编号" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fName" label="运营商简称" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fMobile" label="调度员账号" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fTraderName" label="调度员简称" align="center"></el-table-column>
					    <el-table-column :show-overflow-tooltip="true" prop="fRank" label="排名" align="center"></el-table-column>
						<el-table-column :show-overflow-tooltip="true" prop="fAmount" label="服务费收入" align="center"></el-table-column>
					</el-table>
					<div class="page">
					    <el-pagination
					        @size-change="handleChargeTableSizeChange"
					        @current-change="handleChargeCurrentChange"
					        :current-page="chargeCurrentPage"
					        :page-size="chargeQuery.pageSize"
					        layout="total,  prev, pager, next, jumper"
					        :total="chargeTotalNumber"
					    ></el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
            
			<div>
				<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
			</div>
        </div>

    </div>
</template>

<script>
import histogramCharts from 'v-charts/lib/histogram.common'
import lineCharts from 'v-charts/lib/line.common'
import { fetchData } from '../../../api/index.js';
import  "../../../assets/css/form/loading.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

export default {
    name: 'basetable',
    data() {
		this.chartSettings = {
			yAxisName: ['成交量'],
			labelMap: {
			  fAmount: '成交量',
			},
		}
        return {
			query:{
				
			},
            countQuery: {
                page: 1,
                pageSize: 20
            },
			freightQuery: {
			    page: 1,
			    pageSize: 20
			},
			chargeQuery: {
			    page: 1,
			    pageSize: 20
			},
			chartData: {
			  columns: ['fTraderName', 'fAmount'],
			  rows: []
			},
			showRangeDate:false,
			dateType:'',
			dateTypes:["","date","week","month","year"],
			rangeDateType:'',
			rangeDateTypes:["","daterange","week","monthrange","year"],
			dateFormat:'',
			dateFormats:["","yyyy-MM-dd","yyyy 第 WW 周","yyyy-MM","yyyy"],
			selectedRow:"",
            countTableData: [],
			freightTableData: [],
			chargeTableData: [],
            countTotalNumber: 0,
			freightTotalNumber:0,
			chargeTotalNumber:0,
            currentPage: 1,
			freightCurrentPage: 1,
			chargeCurrentPage: 1,
            menus: [],
            butId: -1,
            menu: '',
			startDate:'',
			endDate:'',
			tradeDate:'',
			submitting:false,
			activeTapName: 'count',
			rangeDate:'',
			startPlaceholder:'',
			endPlaceholder:'',
			rangeDatePlaceholder:'',
			startDatePlaceholder:'',
			endDatePlaceholder:'',
			tradeDatePlaceholder:'',
			pickerOptions:'',
			datePickerOptions: {
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
			monthPickerOptions: {
			  shortcuts: [{
				text: '本月',
				onClick(picker) {
				  picker.$emit('pick', [new Date(), new Date()]);
				}
			  }, {
				text: '最近三个月',
				onClick(picker) {
				  const end = new Date();
				  const start = new Date();
				  start.setMonth(start.getMonth() - 3);
				  picker.$emit('pick', [start, end]);
				}
			  }, {
				text: '最近六个月',
				onClick(picker) {
				  const end = new Date();
				  const start = new Date();
				  start.setMonth(start.getMonth() - 6);
				  picker.$emit('pick', [start, end]);
				}
			  }, {
				text: '今年至今',
				onClick(picker) {
				  const end = new Date();
				  const start = new Date(new Date().getFullYear(), 0);
				  picker.$emit('pick', [start, end]);
				}
			  }]
			},
        };
    },
    async created() {
		this.query.statType = "2";
		this.query.busiType = "1";
		var now = new Date();
		this.startDate = now;
		this.endDate = now;
		this.tradeDate = now;
		this.rangeDate = [now,now];
		this.statTypeChange();
        this.getBut();
    },
	activated(){
		this.getData();
	},
    methods: {
		indexMethod(index){
			return index+1 + (this.countQuery.page-1)*this.countQuery.pageSize;
		},
		freightIndexMethod(index){
			return index+1 + (this.freightQuery.page-1)*this.freightQuery.pageSize;
		},
		chargeIndexMethod(index){
			return index+1 + (this.chargeQuery.page-1)*this.chargeQuery.pageSize;
		},
        // 获取表格数据
       async getData() {
		   if(this.showRangeDate){
			   var startDate,endDate,statType=this.query.statType;
			   if(statType==1||statType==3){
				   if(!(this.rangeDate)||this.rangeDate.length!=2){
					   if(this.$refs.rangeDate){
						   this.$refs.rangeDate.$el.children[1].focus();
					   }
						return;
				   }
				   startDate = this.rangeDate[0];
				   endDate = this.rangeDate[1];
			   }else{
				   if(!(this.startDate)){
					   if(this.$refs.startDate){
						   this.$refs.startDate.$el.children[0].focus();
					   }
					   return;
				   }
				   if(!(this.endDate)){
					   if(this.$refs.endDate){
						   this.$refs.endDate.$el.children[0].focus();
					   }
					   return;
				   }
				   startDate = this.startDate;
				   endDate = this.endDate;
			   }
			   if(startDate>endDate){
						   this.$message.error("开始时间不能大于结束时间");
						   return false;
			   }
			   this.query.startDate = startDate;
			   this.query.endDate = endDate;
		   }else{
			   if(!(this.tradeDate)){
				   if(this.$refs.tradeDate){
					   this.$refs.tradeDate.$el.children[0].focus();
				   }
				   return;
			   }
			   this.query.tradeDate = this.tradeDate;
		   }
		   this.query.page = this[this.activeTapName+'Query'].page;
		   this.query.pageSize = this[this.activeTapName+'Query'].pageSize;
		   let res = await request('/statistics/rank/trader/dispatcherRankList', this.query);
		   var datas = res.data;
           this[this.activeTapName+'TableData'] = datas.data;
		   this[this.activeTapName+'TotalNumber'] = datas.total;
		   this.chartData.rows = datas.data;
        },
		tabClick(tab, event) {
			var labelName = '';
			if(tab.name=='count'){
				labelName = '成交量';
				this.query.busiType = "1";
			}else if(tab.name=='freight'){
				labelName = '成交额';
				this.query.busiType = "2";
			}else if(tab.name=='charge'){
				labelName = '收入';
				this.query.busiType = "3";
			}
			this.chartSettings.yAxisName[0]=labelName;
			this.chartSettings.labelMap.fAmount=labelName;
			this.getData();
		},
		async btnClick(item,index){
		},
		statTypeChange(){
			var statType = this.query.statType;
			this.rangeDateType = this.rangeDateTypes[statType];
			this.dateType=this.dateTypes[statType];
			this.dateFormat=this.dateFormats[statType];
			if(statType=='1'){
				this.startPlaceholder='开始日期';
				this.endPlaceholder='结束日期';
				this.pickerOptions = this.datePickerOptions;
			}else if(statType==2){
				this.startDatePlaceholder='开始周';
				this.endDatePlaceholder='结束周';
			}else if(statType==3){
				this.startPlaceholder='开始月份';
				this.endPlaceholder='结束月份';
				this.pickerOptions = this.monthPickerOptions;
			}else if(statType==4){
				this.startDatePlaceholder='开始年份';
				this.endDatePlaceholder='结束年份';
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
			this[this.activeTapName+'Query'] = {
			    page: 1,
			    pageSize: 20,
			}
			this.query.statType = "2";
			var now = new Date();
			this.startDate = now;
			this.endDate = now;
			this.tradeDate = now;
			this.rangeDate = [now,now];
		    this.getData();  
		},
		resetPage(){
			this[this.activeTapName+'Query'].page = 1;
		},
        // 分页导航
        handleTableSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
		handleFreightTableSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		},
		handleChargeTableSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
		    let num = Math.ceil(this.countTotalNumber / this.countQuery.pageSize);
		    if (val > num) {
		    } else {
				this.countQuery.page = val;
		        this.getData();
		    }
		},
		handleFreightCurrentChange(val) {
		    let num = Math.ceil(this.freightTotalNumber / this.freightQuery.pageSize);
		    if (val > num) {
		    } else {
				this.freightQuery.page = val;
		        this.getData();
		    }
		},
		handleChargeCurrentChange(val) {
		    let num = Math.ceil(this.chargeTotalNumber / this.chargeQuery.pageSize);
		    if (val > num) {
		    } else {
				this.chargeQuery.page = val;
		        this.getData();
		    }
		},
    },
	components: { 
	    [histogramCharts.name]:histogramCharts,
		[lineCharts.name]:lineCharts,
	}
};
</script>