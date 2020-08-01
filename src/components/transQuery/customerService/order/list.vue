<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
                <el-form label-suffix=":"  ref="query" :model="query" label-width="100px">
                    <div style="width:800px;">
                            <el-form-item prop="memberCode"  style="width:280px;display:inline-block;margin-right:20px;" label="运营商">
                               <el-input v-model="query.memberCode" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            <el-form-item prop="mobileOrCode"  style="width:280px;display:inline-block;margin-right:20px;" label="客服">
                               <el-input v-model="query.mobileOrCode" placeholder="请输入内容"></el-input>
                            </el-form-item>
                    </div>
                     <div style="width:800px;">
                            
                            <el-form-item prop="fOrderCode"  style="width:280px;display:inline-block;margin-right:20px;" label="订单编号">
                               <el-input v-model="query.fOrderCode" placeholder="请输入内容"></el-input>
                            </el-form-item>
                            <el-form-item prop="fOrderStatus"  style="width:280px;display:inline-block;margin-right:20px;" label="订单状态">
                               
                                <el-select v-model="query.fOrderStatus"  :clearable="true">
                                        <el-option
                                        v-for="item in this.orderAllStatus"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                    </div>
                    <div style="width:850px;">
                            <el-form-item label="创建日期" style="width:280px;display:inline-block;margin-right:20px;" prop="fCreateDate">
                                
                                <el-date-picker type="date" placeholder="选择日期" v-model="query.fCreateDate" style="width: 100%;"></el-date-picker>
                                
                            </el-form-item>

                            <el-form-item style="width:300px;display:inline-block;">
    
                                <el-button type="primary" style="width:90px;"  @click="query.page=1;submitForm('query')">查询</el-button>
            
                                <el-button type="primary" style="width:90px;" @click="resetForm('query')">重置</el-button>

                            </el-form-item>
                    </div>
                </el-form>
                <div class="from-head">
                    <el-button style="height:26px; line-height: 26px;padding:0 8px;" v-for="(item, index) in menus" :key="index" @click="buttonClick(item)">{{ item }}</el-button>
                </div>
    
                <el-table :data="tableData"  border class="table" ref="multipleTable" 
                header-cell-class-name="table-header" highlight-current-row 
                @row-click="clickTableRow" @current-change="selectChage" 
                @row-contextmenu="rightClick">
    
                    <el-table-column :show-overflow-tooltip="true"  prop="memberCode" :formatter="formatmemberCode" label="运营商编号/简称" width="180" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="mobileOrCode" :formatter="formatmobileOrCode" label="客服账号/简称" width="180" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fOrderCode"  label="订单编号" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fOrderStatus" :formatter="fMoneyOrderAllStatus"  label="订单状态" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fSendAddr"  label="起运地" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fReceiveAddr"  label="目的地" width="150" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fGoodsName"  label="货物名称" width="180" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fFreightExpect"  label="期望运费(元)" width="180" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fCreateTime"  label="创建时间" width="180" align="center"> </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total,  prev, pager, next, jumper" :total="totalNumber" @contextmenu.prevent="rightClick"></el-pagination>
                </div>
            </div>
            <div id="menu">
                <div class="menu" v-for="(item, index) in menus" :key="index" @click.stop="infoClick(index)">{{ item }}</div>
            </div>
    
        </div>
</template>

<script>
import request from '../../../../assets/Public/request.js';
import tool from '../../../../assets/Public/tool.js';
import '../../../../assets/css/form/forn.css';
import '../../../../assets/css/popup/popup.css';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                memberCode:"",
                mobileOrCode:"",
                dealerName:"",
                fOrderCode:"",
                fOrderStatus:"",
                fCreateDate:"",
                page: 1,
                pagesize: 15
            },
            orderAllStatus:[],
            data: [],
            tableData: [],
            sum:[],
            channel: [],
            calculatelType: [],
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
            butId1: '',
            menu: '',
            loading: true,
            querying:false,
            rowData: {}
        };
    },
    created() {
        this.init();
        this.getBut();
    },
	activated(){
		this.getData();
	},
    methods: {
        
        // 获取表格数据
        async init() {
            this.orderAllStatus = (await request('/enum/ioOrderAllStatus/api', this.query)).data;
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = (await request('/report/customerService/order/list', this.query)).data;
			this.querying = false;
            if(jsonData != null){
                this.totalNumber = jsonData.total;
                this.tableData = jsonData.data;
                this.sum = jsonData.sum;
            }
            
        },
        selectChage() {
            this.rowData = {};
        },
        reset() {
            //this.type = '';
            this.query.type = '';
            this.getData();
        },
        //按钮点击事件
        buttonClick(item) {
            if (item == '发布') {
                  
                    let popup1 = {
                        title: item+"公告"
                    };
                    this.$store.commit('setPopup1', popup1);
                    this.$refs.add.receipt();
                    
                }else{
                    let str = JSON.stringify(this.rowData);
                    
                    if (str == '{}') {
                        this.$message.error('请选择行');
                    }else{
                        if (item == '审核') {
                        
                            let popup1 = {
                                title: item ,
                                fId: this.rowData.fId
                            };
                            this.$store.commit('setPopup1', popup1);
                            this.$refs.audit.receipt();
                        }
                    }
                        
                }
        },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fId == this.butId1 ) {
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
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
            this.rowData = row;
            //this.menu.style.display = 'none';
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
            //console.log(row, column);
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
            this.buttonClick(this.menus[index]);
            
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
        onMouseDown(event) {
            if (event.button == 0) {
                this.menu.style.display = 'none';
            }
        },
        formatmemberCode(row) {
            return row.memberCode+"/"+row.memberName;
        },
        formatmobileOrCode(row) {
            return row.mobileOrCode+"/"+row.fName;
        },
        fMoneyOrderAllStatus(row) {
            return tool.getEnumValue(this.orderAllStatus, row.fOrderStatus);
        },
        //点击弹窗事件
        receipt(index, row) {
            this.editVisible = true;
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine() {
            this.editVisible = false;
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData();
          } 
        });
      }
        //清楚表单
        ,
        resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getData(); 
      }
      
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
    components: {
  
    }
};
//  固定底部滚动条
//  $(".el-table__body-wrapper").css("height","70%");
//  $(".el-table__body-wrapper").css("overflow-y","auto");
</script>
