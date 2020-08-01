<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog  v-bind:title="title"   :visible.sync="editVisible" width="800px" height="1000px" :close-on-click-modal="false">
            <el-container>
                <el-form label-suffix=":"  ref="query" :model="query" label-width="90px">
                    <div style="width:800px;margin-top:20px;">
                            <el-form-item prop="date"  style="width:230px;display:inline-block;margin-right:20px;" label="交易日期">
                               <el-date-picker
                                v-model="query.date"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item style="width:280px;display:inline-block;margin-right:20px;">
                                <el-button type="primary" style="width:90px;"  @click="query.page=1;submitForm('query')">查询</el-button>
                                <el-button type="primary" style="width:90px;" @click="resetForm('query')">重置</el-button>
                            </el-form-item>
                    </div>
                </el-form>
                <div class="from-head">
                    <el-button style="height:26px; line-height: 26px;padding:0 8px;" v-for="(item, index) in menus" :key="index" @click="buttonClick(item)">{{ item }}</el-button>
                </div>
    
                <el-table :data="tableData"  border class="table" ref="multipleTable" style="overflow:scroll;"
                      header-cell-class-name="table-header" highlight-current-row   :summary-method="getSummaries" 
                show-summary>
					<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
                   <el-table-column :show-overflow-tooltip="true" :formatter="dateForma"  prop="fTradeDate"  label="交易日期" width="150" align="center"> </el-table-column>
                   <el-table-column :show-overflow-tooltip="true"  prop="fPrevBalance"  label="期初余额" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fFareIn"  label="今日收入运费" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fRfFareIn"  label="今日退款运费" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fAmountOut"  label="今日提现" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fBalance"  label="期末余额" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fPayCharge"  label="今日支付服务费" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fBackCharge"  label="今日服务费返还" width="150" align="center"> </el-table-column>
                </el-table>
    
                <div class="page">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total,  prev, pager, next, jumper" :total="totalNumber" @contextmenu.prevent="rightClick"></el-pagination>
                </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine('dataForm')">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import commonUtils from '../../../../utils/commonUtils.js';
import request from '../../../../assets/Public/request.js';
import requestExport from '../../../../assets/Public/requestExport.js';
import '../../../../assets/css/popup/popup.css';
import check from '../../../../assets/Public/check.js';

export default {
    // props:["show"],
    data() {
        return {
            query: {
				tableTitle:[],
				export:0,
				fileName:"司机历史资金查询",
                date:"",
                fFundId:"",
                page: 1,
                pagesize: 15
            },
            editVisible: false,
            totalNumber:"",
            totalNumber: 0,
            data:{
                fTypes:[],
                fId:"",
                fSenderAccount:"",
                fAuthor:"",
                fTitle:"",
                fContent:"",
                fEndTime:"",
                fDealercateId:"",
                fReceive:""
            },
            sum:"",
            tableData:"",
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            title:"",
            loading: true,
            Total1: '',
            Total2: '',
            butId1: '601002001004',
            rowData: {}
        };
    },
    created() {
        this.init();
        this.getBut();
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pagesize;
		},
        changeReceive(obj){
            console.log(obj);
        }
        ,
        // 获取表格数据
        async init() {
       
            
        },
        async getData() {
			let temp = (await request('/report/driver/moneyHis/list', this.query)).data;
            if(temp != null){
                this.tableData = temp.tableData.data;
                this.totalNumber = temp.tableData.total;
                this.sum = temp.sum;
            }
        }
        ,
		buttonClick(item) {
				    if(item == '导出'){
				        var list = [];
				        var arr = this.$refs.multipleTable.columns;
				        for(var i = 0; i< arr.length;i++){
				            var map = {};
				            map[arr[i].property] = arr[i].label;
				            list.push(map);
				        }
				        this.query.tableTitle =list;
				        this.query.export = 1;
				        //request('/report/customer/money/list', this.query);
				        //this.query.tableTitle = [];
				        //this.query.export = 0;
				         requestExport('/report/driver/moneyHis/list', this.query).then(response => { 
				         if(response.errCode != "0"){
				            this.query.tableTitle = [];
				            this.query.export = 0;
				             return;
				         }else{
				            this.query.tableTitle = [];
				            this.query.export = 0;
				         }
				     });
				    }
				},
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.query.fFundId = popup1.fFundId;
            this.title = popup1.title;
            this.getData();
            
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine(formName) {
            // if (!this.commitData()) {
            //     return;
            // }
            // this.editVisible = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
               console.log(this.data.fReceive);
              let obj = this;
              //this.commitData();
             request('/systemManager/notice/update', this.data).then(response => { 
                 if(response.errCode != "0"){
                    
                     this.$message.error(response.errMsg);
                     return;
                 }else{
                    obj.$parent.getData();
                    obj.editVisible = false;
                 }
             });
             return;
             
            
          } else {
            return false;
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
                for(var i in this.sum){
                    if(i == column.property.toString()){
                        sums[index]= this.sum[i];

                    }
                    
                }
            return this.sum[column.property];
            
          });
                
        
            return sums;
        },
        // 分页导航
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            let num = Math.ceil(this.totalNumber / this.query.pageSize);
            if (val > num) {} else {
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
                //console.log(rows);
                this.$refs.multipleTable.clearSelection();
            }
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData();
          } 
        });
      },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getData(); 
      },
      getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fId == this.butId1 || item.fId == this.butId2 ) {
                    this.menus.push(item.fName);
                }
            });
        },
        dateForma(row){

        var date = row.fTradeDate;

        if(date == undefined){return ''};
        return date.slice(0,10);

    },
    handleCurrentChange(val) {
            let num = Math.ceil(this.totalNumber / this.query.pageSize);
            if (val > num) {} else {
                this.query.page = val;
                this.getData();
            }
        },
    },
        components: {
            
        }
    
}
</script>
