<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
                <el-form label-suffix=":"  ref="query" :model="query" label-width="90px">
                    <div style="width:800px;">
                            <el-form-item prop="fName" style="width:230px;display:inline-block;margin-right:20px;" label="活动主题">
                            <el-input v-model="query.fName"></el-input>
                            </el-form-item>
                            <el-form-item prop="fType"  style="width:230px;display:inline-block;margin-right:20px;" label="活动类型">
                            <el-select v-model="query.fType" >
								<el-option label="全部" value="-1"> </el-option>
                                    <el-option
                                    v-for="item in this.type"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                                    </el-option>
                            </el-select>
                            </el-form-item>
            
                            <el-form-item prop="fStatus"  style="width:230px;display:inline-block;margin-right:20px;" label="活动状态">
                            <el-select v-model="query.fStatus" >
								<el-option label="全部" value="-1"> </el-option>
                                    <el-option
                                    v-for="item in this.status"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                                    </el-option>
                            </el-select>
                            </el-form-item>
                    </div>
                    <div style="width:800px;">
                            <el-form-item prop="fStartData"  style="width:230px;display:inline-block;margin-right:20px;" label="开始日期">
                            <el-date-picker type="date" v-model="query.fStartData" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item prop="fEndData" style="width:230px;display:inline-block;margin-right:20px;" label="结束日期">
                            <el-date-picker type="date" v-model="query.fEndData" style="width: 100%;"></el-date-picker>
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
                    <el-table-column :show-overflow-tooltip="true" prop="fName" label="主标题" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fContent" label="副标题" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfType" prop="fType" label="活动类型" width="120" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="formatfStatus" prop="fStatus" label="活动状态" width="120" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fImage" label="图片地址" width="140" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fUrl" label="推广链接" width="160" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fStartDate" label="推广开始日期" width="120" align="center"> </el-table-column>
                    <el-table-column :show-overflow-tooltip="true"  prop="fEndDate" label="推广结束日期" width="120" align="center"> </el-table-column>
                    
                </el-table>
    
                <div class="page">
    
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total,  prev, pager, next, jumper" :total="totalNumber" @contextmenu.prevent="rightClick"></el-pagination>
    
                </div>
    
            </div>
            <add ref="add"></add>
            <update ref="update"></update>
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
import add from './add.vue';
import update from './update.vue';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                fName:"",
                fType:"-1",
                fStatus:"-1",
                fStartData:"",
                fEndData:"",
                page: 1,
                pagesize: 15
            },
            status: [],
            type: [],
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
            butId: 801017001,
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
            this.type = (await request('/enum/promotionType/api', '')).data;
            this.status = (await request('/enum/promotionStatus/api', '')).data;
            this.modelEx = tool.getEnumValue(this.models, this.data.model);
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = await request('/businessManagement/planningPromotion/list', this.query);
			this.querying = false;
            this.data = jsonData.data.data;
            this.totalNumber = jsonData.data.total;
            this.tableData = jsonData.data.data;
            this.modelEx = tool.getEnumValue(this.models, this.data.model);


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
                        if (item == '修改') {
                        
                            let popup1 = {
                                title: item + '推广',
                                fPromotionId: this.rowData.fPromotionId
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
		this.query.page = 1;
      },
      formatfType(row){
        return tool.getEnumValue(this.type,row.fType);
      },
      formatfStatuts(){
        return tool.getEnumValue(this.status,row.fStatus);
      }
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
    components: {
        add,
        update
    }
};
//  固定底部滚动条
//  $(".el-table__body-wrapper").css("height","70%");
//  $(".el-table__body-wrapper").css("overflow-y","auto");
</script>
