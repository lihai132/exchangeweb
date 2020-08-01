<template>
    <div class="BaseTable" @click="onMouseDown">
    
        <div class="container">
                <el-form label-suffix=":"  ref="query" :model="query" label-width="90px">
                    <div style="width:800px;">
                            <el-form-item prop="fName" style="width:230px;display:inline-block;margin-right:20px;" label="交易员名称">
                                <el-input v-model="query.fName"></el-input>
                            </el-form-item>
                            <el-form-item prop="fMobile" style="width:230px;display:inline-block;margin-right:20px;" label="交易员账号">
                                <el-input v-model="query.fMobile"></el-input>
                            </el-form-item>
                            
            
                            <el-form-item prop="fStatus"  style="width:230px;display:inline-block;margin-right:20px;" label="状态">
                            <el-select v-model="query.fStatus" >
								<el-option label="全部" value="-1"> </el-option>
                                    <el-option
                                    v-for="item in this.pointConsumeStatus"
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
                    <el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fName" label="交易员名称" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="交易员账号" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfStatus" prop="fStatus" label="状态" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fConsumeId" label="积分流水号" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fAmount" label="消费积分" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fDescript" label="说明" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="创建时间" width="160" align="center"> </el-table-column>
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
                fName:"",
                fMobile:"",
                fStatus:"-1",
                fStartDate:"",
                fEndDate:"",
                page: 1,
                pageSize: 15
            },
            sum:'',
            pointConsumeStatus:[],
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
        indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
        // 获取表格数据
        async init() {
            this.pointConsumeStatus = (await request('/enum/pointConsumeStatus/api', '')).data;
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var result = (await request('/businessManagement/driverPromotion/sum/list', this.query));
			this.querying = false;
            var jsonData = result.data;
            this.sum = result.data.columnSummary;
            
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
            if (item == '新增') {
                  
                    let popup1 = {
                        title: item + '推广'
                    };
                    this.$store.commit('setPopup1', popup1);
                    this.$refs.add.receipt();
                    
                }else{
                    let str = JSON.stringify(this.rowData);
                    
                    if (str == '{}') {
                        this.$message.error('请选择行');
                    }else{
                        if (item == '回复') {
                        
                            let popup1 = {
                                title: item + '推广',
                                fId: this.rowData.fId
                            };
                            this.$store.commit('setPopup1', popup1);
                            this.$refs.update.receipt();
                        }
                    }
                        
                }
        },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fId == this.butId1) {
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
        formatfStatus(row) {
            return tool.getEnumValue(this.pointConsumeStatus, row.fStatus);
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
