<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">运营商编号/简称：</div>
                        <el-input v-model="query.dealerCodeName"  style="width:170px"></el-input>
                    </div>
					<div class="input1">
					    <div class="title">交易员账号/简称：</div>
					    <el-input v-model="query.traderAccountName"  style="width:170px"></el-input>
					</div>
                    <div class="input1">
                        <div class="title">交易员类型：</div>
                        <el-select
                            v-model="query.fTraderType"
                            class="handle-select"
                            style="width:170px"
							@change="$forceUpdate()"
                        >
                            <el-option key="-1" label="全部" value="-1"></el-option>
                            <el-option key="1" label="客户" value="1"></el-option>
                        	<el-option key="2" label="司机" value="2"></el-option>
							<el-option key="3" label="调度员" value="3"></el-option>
							<el-option key="4" label="客服" value="4"></el-option>
							<el-option key="5" label="经纪人" value="5"></el-option>
                        </el-select>
                    </div>
                </div>
				
				<div class="head-two">
				    <div class="input2">
				        <div class="title">支付流水号：</div>
				        <el-input v-model="query.fCode"  style="width:170px"></el-input>
				    </div>
					<div class="input2">
					    <div class="title">关联运单号：</div>
					    <el-input v-model="query.fWaybillCode"  style="width:170px"></el-input>
					</div>
				    <div class="input2">
				        <div class="title">业务类型：</div>
				        <el-select
				            v-model="query.fIoFlag"
				            class="handle-select"
				            style="width:170px"
							@change="$forceUpdate()"
				        >
				            <el-option key="-1" label="全部" value="-1"></el-option>
							<el-option key="6" label="司机运费支付" value="6"></el-option>
				            <el-option key="8" label="运费" value="8"></el-option>
				        	<el-option key="9" label="服务费" value="9"></el-option>
				        </el-select>
				    </div>
				</div>
				<div class="head-two">
				    <div class="input2">
				        <div class="title">支付状态：</div>
				        <el-select
				            v-model="query.fStatus"
				            class="handle-select"
				            style="width:170px"
							@change="$forceUpdate()"
				        >
				            <el-option key="-1" label="全部" value="-1"></el-option>
				            <el-option key="1" label="处理中" value="1"></el-option>
				        	<el-option key="2" label="处理成功" value="2"></el-option>
							<el-option key="3" label="处理失败" value="3"></el-option>
							<el-option key="7" label="超时未支付" value="7"></el-option>
				        </el-select>
				    </div>
					<span style="color: rgba(0, 0, 0, 0.8);font-size: 14px;line-height:31px;padding-left: 112px;">日期：</span>
					<div class="input2">
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
				<!-- <div class="head-end">
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
				</div> -->
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
                <el-table-column :show-overflow-tooltip="true" prop="fDealerCode" :formatter="codeNameFormat" label="运营商编号/简称" width="200" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fMobile" :formatter="accountNameFormat" label="交易员账号/简称" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTraderType" :formatter="traderTypeFormat" label="交易员类型" width="100" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="reciverInfo" :formatter="reciverNameFormat" label="收款人/银行账号" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fReceiveType" :formatter="reciverTypeFormat" label="收款人类型" width="100" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCode" label="支付流水号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fWaybillCode" label="关联运单号" width="130" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAmount" label="支付金额" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCharge" label="银行服务费" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fIoFlag" :formatter="ioFlagFormat" label="业务类型" width="110" align="center"></el-table-column>				
				<el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="支付状态" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChannel" :formatter="channelFormat" label="支付渠道" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="发起时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCompleteTime" label="完成时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="refundAmount" :formatter="refundAmountFormat" label="退款金额" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="refundCompleteTime" label="退款时间" width="160" align="center"></el-table-column>
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
            butId: -2,
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
		this.query.fIoFlag="-1";
		this.query.fStatus="-1";
		this.query.fTraderType="-1";
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
		   let list = await request('/fund/payment/trader/detailList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
			this.sumData = list.data.columnSummary;
        },
		async btnClick(item,index){
			
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
			this.query.fIoFlag="-1";
			this.query.fStatus="-1";
			this.query.fTraderType="-1";
			this.rangeDate=null;
		    this.getData();  
		},
		refundAmountFormat(row){
			if(row.refundAmount==0&&!row.refundCompleteTime){
				return '';
			}
			return row.refundAmount;
		},
		reciverNameFormat(row){
			
			if (row.fAccountName == "" || row.fAccountName == null || row.fAccountName == undefined || row.fBankAccount == "" || row.fBankAccount == null || row.fBankAccount == undefined)
				return row.fAccountName + row.fBankAccount
			else
				return row.fAccountName +"/" + row.fBankAccount
		},
		reciverTypeFormat(row){
				return this.doTypeFormat(row.fReceiveType);
			
		},
		accountNameFormat(row){
			return row.fMobile+'-'+row.fName;
		},
		codeNameFormat(row){
			return row.fDealerCode+'-'+row.fDealerName;
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
			return this.doTypeFormat(row.fTraderType);
		},
		doTypeFormat(type){
			if(type==1){
				return '客户'
			}
			if(type==2){
				return '司机'
			}
			if(type==3){
				return '调度员'
			}
			if(type==4){
				return '客服'
			}
			if(type==5){
				return '经纪人'
			}
			if(type==-1){
				return '交易中心'
			}
			if(type==-2){
				return '运营中心'
			}
			if(type==-3){
				return '运营商'
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
        operation1() {
            console.log(this.multipleSelection);
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
