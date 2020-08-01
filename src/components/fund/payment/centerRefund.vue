<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					    <div class="title">运营中心编号/简称：</div>
					    <el-input v-model="query.dealerCodeName"  style="width:170px"></el-input>
					</div>
					<div class="input1">
					    <div class="title">支付流水号：</div>
					    <el-input v-model="query.fCode"  style="width:170px"></el-input>
					</div>
					<div class="input1">
					    <div class="title">关联运单号：</div>
					    <el-input v-model="query.fWaybillCode"  style="width:170px"></el-input>
					</div>
                    <!-- <div class="input1">
                        <div class="title">运营商编号：</div>
                        <el-input v-model="query.fDealerCode"  style="width:170px"></el-input>
                    </div>
					<div class="input1">
					    <div class="title">运营商简称：</div>
					    <el-input v-model="query.fName"  style="width:170px"></el-input>
					</div> -->
                    <!-- <div class="input1">
                        <div class="title">交易商类型：</div>
                        <el-select
                            v-model="query.fDealercateId"
                            class="handle-select"
                            style="width:170px"
                        >
                            <el-option key="" label="全部" value=""></el-option>
                        	<el-option key="2" label="运营中心" value="2"></el-option>
							<el-option key="3" label="运营商" value="3"></el-option>
							<el-option key="6" label="企业客户" value="6"></el-option>
                        </el-select>
                    </div> -->
					<!-- <div class="input1">
					    <div class="title">业务类型：</div>
					    <el-select
					        v-model="query.fIoFlag"
					        class="handle-select"
					        style="width:170px"
					    >
					        <el-option key="" label="全部" value=""></el-option>
							<el-option key="6" label="司机运费支付" value="6"></el-option>
					        <el-option key="8" label="运费" value="8"></el-option>
					    	<el-option key="9" label="服务费" value="9"></el-option>
					    </el-select>
					</div> -->
                </div>
				
				<div class="head-two">
					<div class="input2">
					    <div class="title">银行流水号：</div>
					    <el-input v-model="query.fBankFlowId"  style="width:170px"></el-input>
					</div>
					<div class="input2">
					    <div class="title">运单状态：</div>
					    <el-select
					        v-model="query.fWaybillStatus"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
					        <el-option key="-1" label="全部" value="-1"></el-option>
					        <el-option key="4" label="运输中" value="4"></el-option>
					    	<el-option key="6" label="待关闭" value="6"></el-option>
							<el-option key="7" label="已关闭" value="7"></el-option>
					    </el-select>
					</div>
					<div class="input2">
					    <div class="title">业务类型：</div>
					    <el-select
					        v-model="query.fIoFlag"
					        class="handle-select"
					        style="width:170px"
					    >
					        <el-option key="-1" label="全部" value="-1"></el-option>
							<el-option key="6" label="司机运费支付" value="6"></el-option>
					        <el-option key="8" label="运费" value="8"></el-option>
					    	<!-- <el-option key="9" label="服务费" value="9"></el-option> -->
					    </el-select>
					</div>
				</div>
				<div class="head-three">
					<span style="color: rgba(0, 0, 0, 0.8);font-size: 14px;line-height:31px;padding-left: 112px;">日期：</span>
					<div class="input1">
					    <el-date-picker type="daterange" v-model="rangeDate" ref="rangeDate"
					    	  align="right"
					          unlink-panels
					          range-separator="至"
					          start-placeholder="开始日期"
					          end-placeholder="结束日期"
					    	  :picker-options="pickerOptions"
					    	  >
					    </el-date-picker>
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
                <el-table-column :show-overflow-tooltip="true" prop="memberCode" :formatter="codeNameFormat" label="运营中心编号/简称" width="200" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="fDealercateId" :formatter="dealerTypeFormat" label="交易商类型" width="100" align="center"></el-table-column> -->
				<el-table-column :show-overflow-tooltip="true" prop="fCode" label="支付流水号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankFlowId" label="银行流水号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fWaybillCode" label="关联运单号" width="130" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fWaybillStatus" :formatter="waybillStatusFormat" label="运单状态" width="130" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAmount" label="支付金额" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fIoFlag" :formatter="ioFlagFormat" label="业务类型" width="110" align="center"></el-table-column>				
				<el-table-column :show-overflow-tooltip="true" prop="fChannel" :formatter="channelFormat" label="支付渠道" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCompleteTime" label="完成时间" width="160" align="center"></el-table-column>
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

		<el-dialog
		  title="退款提示"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :close-on-click-modal="false"
		  >
		  <span  style="font-size: 15px; padding-left: 10px;">退款金额{{money}}元，确定退款吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="doRefund" :disabled="submitting">确 定</el-button>
		  </span>
		</el-dialog>
		
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
            delList: [],
            editVisible: false,
			dialogVisible:false,
			money:'',
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 301004016,
            menu: '',
            submitting: false,
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
		this.query.fWaybillStatus="-1";
		this.query.fIoFlag="-1";
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
		   if(this.rangeDate&&this.rangeDate.length==2){
			   startDate = this.rangeDate[0];
			   endDate = this.rangeDate[1];
			   if(startDate>endDate){
				   this.$message.error("开始时间不能大于结束时间");
				   return false;
			   }
		   }
		   this.query.startDate = startDate;
		   this.query.endDate = endDate;
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   this.submitting=false;
		   let list = await request('/fund/payment/center/refundList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
			this.sumData = list.data.columnSummary;
        },
		async btnClick(item,index){
			if(item=='退款'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fId>0)){
					this.$message.error("请选择数据");
					return;
				}
				this.money = this.selectedRow.fAmount;
				this.dialogVisible=true;
			}
		},
		async doRefund(){
			if(!this.selectedRow){
				this.$message.error("请选择数据");
				return;
			}
			let obj = {"fId":this.selectedRow.fId}
			this.submitting=true;
			let result = await request('/fund/payment/refund/refund', obj);
			this.submitting=false;
			this.dialogVisible=false;
			if(result.data==1){
				this.$message.success("退款成功");
				this.getData();
			}else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
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
			this.query.fWaybillStatus="-1";
			this.query.fIoFlag="-1";
			this.rangeDate=null;
		    this.getData();  
		},
		dealerTypeFormat(row){
			if(row.fDealercateId==2){
				return "运营中心";
			}
			if(row.fDealercateId==3){
				return "运营商";
			}
			if(row.fDealercateId==6){
				return "企业客户";
			}
		},
		waybillStatusFormat(row){
			let status = row.fWaybillStatus;
			if(status==2){
				return '待签约';
			}
			if(status==4){
				return '待收货';
			}
			if(status==6){
				return '待关闭';
			}
			if(status==7){
				return '已完成';
			}
			if(status==8){
				return '已撤单';
			}
			if(status==9){
				return '违约待审核';
			}
			if(status==10){
				return '已违约';
			}
		},
		accountNameFormat(row){
			return row.fMobile+'-'+row.fName;
		},
		codeNameFormat(row){
			return row.fDealerCode+'-'+row.fName;
		},
		channelFormat(row){
			if(row.fChannel==2){
				return '微信支付'
			}
			if(row.fChannel==3){
				return '支付宝支付'
			}
			if(row.fChannel==4){
				return '农行支付'
			}
			if(row.fChannel==5){
				return '银联支付'
			}
		},
		ioFlagFormat(row){
			if(row.fIoFlag==6){
				return '司机运费支付'
			}
			if(row.fIoFlag==8){
				return '运费'
			}
			if(row.fIoFlag==9){
				return '服务费'
			}
		},
		traderTypeFormat(row){
			if(row.fTraderType==1){
				return '客户'
			}
			if(row.fTraderType==2){
				return '司机'
			}
			if(row.fTraderType==3){
				return '调度员'
			}
			if(row.fTraderType==4){
				return '客服'
			}
			if(row.fTraderType==5){
				return '经纪人'
			}
		},
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '处理中';
            }
            if (row.fStatus == 2) {
                return '处理成功';
            }
		    if (row.fStatus == 3) {
                return '处理失败';
            }
            if (row.fStatus == 7) {
                return '超时未支付';
            }
			
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
				var p = column.property;
				if(p=='fAmount'||p=='fCharge'||p=='refundAmount'){
					sums[index] = this.sumData[p];
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
	   
	}
};
</script>
