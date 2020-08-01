<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
                <el-form label-suffix=":"  ref="query" :model="query" label-width="90px">
                    <div style="width:800px;">
                            <el-form-item prop="fName" style="width:230px;display:inline-block;margin-right:20px;" label="投诉人">
                            <el-input v-model="query.fName"></el-input>
                            </el-form-item>
            
                            <el-form-item prop="fType"  style="width:230px;display:inline-block;margin-right:20px;" label="投诉类型">
                            <el-select v-model="query.fType" >
								<el-option
								    label="全部"
								    value="-1">
								</el-option>
                                    <el-option
                                    v-for="item in this.feedbackType"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                                    </el-option>
                            </el-select>
                            </el-form-item>
            
                            <el-form-item prop="fStatus"  style="width:230px;display:inline-block;margin-right:20px;" label="投诉状态">
                            <el-select v-model="query.fStatus" >
                                    <el-option
                                        label="全部"
                                        value="-1">
                                    </el-option>
                                    <el-option
                                    v-for="item in this.feebackStatus"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                                    </el-option>
                            </el-select>
                            </el-form-item>
                    </div>
                    <div style="width:800px;">
                            <el-form-item prop="fStartDate"  style="width:230px;display:inline-block;margin-right:20px;" label="开始日期">
                            <el-date-picker type="date" v-model="query.fStartDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item prop="fEndDate" style="width:230px;display:inline-block;margin-right:20px;" label="结束日期">
                            <el-date-picker type="date" v-model="query.fEndDate" style="width: 100%;"></el-date-picker>
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
    
                <el-table :data="tableData"  border class="table" ref="multipleTable" header-cell-class-name="table-header" highlight-current-row @row-click="clickTableRow" @current-change="selectChage" @row-contextmenu="rightClick" :summary-method="getSummaries" show-summary>
					<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfType" prop="fType" label="投诉类型" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfTraderType" prop="fTraderType" label="投诉人类型" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fName" label="投诉人简称" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="投诉人电话" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fContent" label="投诉内容" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="投诉时间" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfStatus" prop="fStatus" label="处理状态" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fReplyContent" label="处理结果" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fUpdateTime" label="处理时间" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fOperateName" label="处理人" width="160" align="center"> </el-table-column>
                    
    
                </el-table>
    
                <div class="page">
    
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total,  prev, pager, next, jumper" :total="totalNumber" @contextmenu.prevent="rightClick"></el-pagination>
    
                </div>
    
            </div>
            
            <update ref="update"></update>
            <detail ref="detail"></detail>
            <!-- 编辑弹出框 -->
    
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

import update from './update.vue';
import detail from './detail.vue';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                fName:"",
                fType:"-1",
                fStatus:"-1",
                fStartDate:"",
                fEndDate:"",
                page: 1,
                pagesize: 15
            },
            loginSource: [],
            feedbackType: [],
            feebackStatus: [],
            traderType: [],
            data: [],
            modelEx: '',
            tableData: [],
            channel: [],
            calculatelType: [],
            show: false,
            delList: [],
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
            butId: 801017002,
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
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pagesize;
		},
        // 获取表格数据
        async init() {
            this.loginSource = (await request('/enum/loginSource/api', '')).data;
            this.feedbackType = (await request('/enum/feedbackType/api', '')).data;
            this.feebackStatus = (await request('/enum/feebackStatus/api', '')).data;
            this.traderType = (await request('/enum/traderType/api', '')).data;
            //this.modelEx = tool.getEnumValue(this.models, this.data.model);
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = (await request('/businessManagement/feedback/list', this.query)).data;
			this.querying = false;
            this.totalNumber = jsonData.total;
            this.tableData = jsonData.data;
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
           let str = JSON.stringify(this.rowData);
           
           if (str == '{}') {
               this.$message.error('请选择行');
           }else{
               if (item == '回复') {
                  if(this.rowData.fReplyContent){
					  this.$message.error('该投诉已回复，请不要重复回复');
					  return false;
				  }
                   let popup1 = {
                       title: item + '推广',
                       fId: this.rowData.fId
                   };
                   this.$store.commit('setPopup1', popup1);
                   this.$refs.update.receipt();
               }
			   if (item == '详情') {
			   
			       let popup1 = {
			           title: item + '详情',
			           fId: this.rowData.fId
			       };
			       this.$store.commit('setPopup1', popup1);
			       this.$refs.detail.receipt();
			   }
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
            
            return sums;
        },
        onMouseDown(event) {
            if (event.button == 0) {
                this.menu.style.display = 'none';
            }
        },
        formatfStatus(row) {
            return tool.getEnumValue(this.status, row.fStatus);
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
      },
      formatfType(row){
        return tool.getEnumValue(this.feedbackType,row.fType);
      },
      formatfStatus(row){
        return tool.getEnumValue(this.feebackStatus,row.fStatus);
      
      },
      formatfTraderType(row){
        return tool.getEnumValue(this.traderType,row.fTraderType);
      }
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
    components: {
        update,detail
    }
};
//  固定底部滚动条
//  $(".el-table__body-wrapper").css("height","70%");
//  $(".el-table__body-wrapper").css("overflow-y","auto");
</script>
