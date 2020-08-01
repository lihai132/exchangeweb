<template>
    <div class="BaseTable1" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					<div class="title">运营商：</div>
						<el-select
						    v-model="fDealerId"
						    class="handle-select"
						    style="width:180px"
							placeholder="请搜索/选择运营商"
							filterable
							ref="fDealerId"
							@change="dealerChange"
						>
							<el-option
							      v-for="item in members"
							      :key="item.fDealerId"
							      :label="item.dealerCodeName"
							      :value="item.fDealerId">
							    </el-option>
						</el-select>
					</div>
					<div class="input1">
					<div class="title">机构：</div>
						<el-select
						    v-model="query.fOrgId"
						    class="handle-select"
						    style="width:180px"
							placeholder="请搜索/选择机构"
							filterable
							ref="fOrgId"
							@change="change()"
						>
							<el-option
							      v-for="item in orgs"
							      :key="item.fDealerId"
							      :label="item.dealerCodeName"
							      :value="item.fDealerId">
							    </el-option>
						</el-select>
					</div>
                </div>
                 <div class="head-two">
					 <div v-if="false" class="input1" style="width: 161px;padding-left: 85px;">
					     <div class="title">统计周期：</div>
					 	<el-select
					 	    v-model="query.statType"
					 	    class="handle-select"
					 	    style="width:90px"
					 		@change="statTypeChange()"
					 	>
					 		<el-option key="1" label="日" value="1"></el-option>
					 	    <el-option key="2" label="周" value="2"></el-option>
					 	    <el-option key="3" label="月" value="3"></el-option>
					 		<el-option key="4" label="年" value="4"></el-option>
					 	</el-select>
					 </div>
					 <span style="color: rgba(0, 0, 0, 0.8);font-size: 14px;line-height:31px;padding-left: 102px;">月份：</span>
					 <div v-if="query.statType!=2&&query.statType!=4" class="input1" style="width:180px;">
					 	<el-date-picker :type="rangeDateType" v-model="rangeDate" ref="rangeDate"
					 		  align="right"
					 	      unlink-panels
					 	      range-separator="至"
					 	      :start-placeholder="startPlaceholder"
					 	      :end-placeholder="endPlaceholder"
					 		  :placeholder="rangeDatePlaceholder"
					 		  :picker-options="pickerOptions"
							  @change="change()"
					 		  >
					 	</el-date-picker>
					 </div>
					 <div v-if="query.statType==2||query.statType==4" class="input1" style="width: 150px;">
					 	<el-date-picker :type="dateType" :format="dateFormat" v-model="startDate" ref="startDate" :placeholder="startDatePlaceholder" @change="change()">
					 	</el-date-picker>
					 </div>
					 <span v-if="query.statType==2||query.statType==4" style="line-height:31px;">至</span>
					 <div v-if="query.statType==2||query.statType==4" class="input1" style="width: 150px;padding-left: 15px;">
					 	<el-date-picker :type="dateType" :format="dateFormat" v-model="endDate" ref="endDate" :placeholder="endDatePlaceholder" @change="change()">
					 	</el-date-picker>
					 </div>
					 <div class="but">
					     <el-button type="primary" @click="query.page=1;getData()" :disabled="submitting" style="width:100px">查询</el-button>
					     <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					 </div>
				 </div>
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
				:summary-method="getSummaries"
				show-summary
            >
				<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="statTime" label="统计时间" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fName" label="调度名称" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="调度电话" align="center"></el-table-column> -->			
                <el-table-column :show-overflow-tooltip="true" prop="fNewWaybillCount" label="新增运单数量" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fNewWaybillCharge" label="新增服务费金额" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fRefundWaybillCount" label="撤单运单数量" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fRefundWaybillCharge" label="撤单服务费金额" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="finalWaybillCount" label="有效运单数量" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="finalWaybillCharge" label="有效服务费金额" align="center"></el-table-column>	
				<el-table-column :show-overflow-tooltip="true" prop="fBusnessReward" label="佣金比例" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="rewardAmount" label="佣金额" align="center"></el-table-column>
            </el-table>
			<div class="page">
			    <el-pagination
			        @size-change="handleSizeChange"
			        @current-change="handleCurrentChange"
			        :current-page="currentPage"
			        :page-size="query.pageSize"
			        layout="total,  prev, pager, next, jumper"
			        :total="totalNumber"
			        @contextmenu.prevent="rightClick"
			    ></el-pagination>
			</div>
			<div>
				<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
			</div>
        </div>

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
			axisSite: { right: ['fNewWaybillCharge','fRefundWaybillCharge','finalWaybillCharge','rewardAmount'] },
			yAxisName: ['运单量', '收益额'],
			labelMap: {
			  fNewWaybillCount: '新增运单数量',
			  fRefundWaybillCount: '撤单运单数量',
			  fNewWaybillCharge: '新增服务费金额',
			  fRefundWaybillCharge: '撤单服务费金额',
			  finalWaybillCount: '有效运单数量',
              finalWaybillCharge:'有效服务费金额',
              rewardAmount:'佣金额'
			},
            showLine: ['fNewWaybillCharge','fRefundWaybillCharge','finalWaybillCharge','rewardAmount']
		}
        return {
            query: {
                page: 1,
                pageSize: 5
            },
			chartData: {
			  columns: ['statTime', 'fNewWaybillCount', 'fNewWaybillCharge', 'fRefundWaybillCount',
			  'fRefundWaybillCharge','finalWaybillCount','finalWaybillCharge','rewardAmount'],
			  rows: []
			},
			fDealerId:'',
            members:[],
			orgs:[],
			dateType:'',
			dateTypes:["","date","week","month","year"],
			rangeDateType:'',
			rangeDateTypes:["","daterange","week","monthrange","year"],
			dateFormat:'',
			dateFormats:["","yyyy-MM-dd","yyyy 第 WW 周","yyyy-MM","yyyy"],
			selectedRow:"",
            tableData: [],
            show: false,
            editVisible: false,
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
            Total1: '',
            Total2: '',
			startDate:'',
			endDate:'',
			submitting:false,
			rangeDate:'',
			startPlaceholder:'',
			endPlaceholder:'',
			rangeDatePlaceholder:'',
			startDatePlaceholder:'',
			endDatePlaceholder:'',
			
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
    created() {
		this.query.statType = "3";
		var now = new Date();
		this.startDate = now;
		this.endDate = now;
		this.rangeDate = [now,now];
		this.statTypeChange();
        this.init();
        this.getBut();
    },
    methods: {
        async init(){
            this.members = (await request('/statistics/users/member/listAllMembers', {})).data;
            if(this.members.length>0){
            	this.fDealerId = this.members[0].fDealerId;
            	this.dealerChange(true);
            }
        },
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
		change(){
			this.$forceUpdate();
			this.getData();
		},
        // 获取表格数据
       async getData() {
		   if(!(this.fDealerId>0)){
			   this.$refs.fDealerId.$el.children[0].children[0].focus();
			   return false;
		   }
		   if(!(this.query.fOrgId>0)){
			   this.$refs.fOrgId.$el.children[0].children[0].focus();
			   return false;
		   }
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
		   this.resetData();
		   let res = await request('/statistics/kpi/trader/dispatcherKPI', this.query);
		   var datas = res.data;
		   this.sumData = datas.columnSummary;
		   this.tableData = datas.data;
		   this.totalNumber = datas.total;
		   this.chartData.rows = this.tableData;
        },
		async btnClick(item,index){
		},
		async dealerChange(isInit){
			var id = this.fDealerId;
			this.orgs = [];
			this.query.fOrgId = '';
			if(!(id>0)){
				return;
			}
			this.orgs = (await request('/statistics/trans/dealers/listAllOrgs', {'fDealerId':id})).data;
			if(this.orgs.length>0){
				this.query.fOrgId = this.orgs[0].fDealerId;
				if(isInit){
					this.getData();
				}
			}
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
		resetData(){
			this.sumData = null;
			this.tableData = [];
			this.totalNumber = 0;
			this.chartData.rows = this.tableData;
		},
		reset(){
			this.query = {
			    page: 1,
			    pageSize: 20
			}
			this.query.statType = "3";
			var now = new Date();
			this.startDate = now;
			this.endDate = now;
			this.rangeDate = [now,now];
			this.resetData();
			if(this.members.length>0){
				this.query.fOrgId = this.members[0].fDealerId;
				this.dealerChange(true);
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
	    [histogramCharts.name]:histogramCharts,
		[lineCharts.name]:lineCharts,
	}
};
</script>