<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					    <div class="title">运营商编号/简称：</div>
					    <el-input v-model="query.memberCodeName" maxlength="32"  style="width:170px"></el-input>
					</div>
					<!-- <div class="input1">
					    <div class="title">机构编号/简称：</div>
					    <el-input v-model="query.orgCodeName" maxlength="32" style="width:170px"></el-input>
					</div>
					<div class="input1">
					    <div class="title">经纪人编号/简称：</div>
					    <el-input v-model="query.traderCodeName" maxlength="32" style="width:170px"></el-input>
					</div> -->
					<div class="input1">
					    <div class="title">客户账号/简称：</div>
					    <el-input v-model="query.accountOrName" maxlength="32" style="width:170px"></el-input>
					</div>
					
                </div>
				
				<div class="head-two">
					<div class="input2">
					    <div class="title">企业名称：</div>
					    <el-input v-model="query.companyName"  style="width:170px"></el-input>
					</div>
					<div class="input2">
					    <div class="title">客户状态：</div>
					    <el-select
					        v-model="query.fTraderStatus"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="-1" label="全部" value="-1"></el-option>
							<el-option key="6" label="已登记" value="6"></el-option>
					        <el-option key="1" label="已开户" value="1"></el-option>
					        <!-- <el-option key="2" label="待签约" value="2"></el-option> -->
							<el-option key="3" label="正常" value="3"></el-option>
							<!-- <el-option key="4" label="申请注销" value="4"></el-option> -->
							<el-option key="5" label="已注销" value="5"></el-option>
					    </el-select>
					</div>
				</div>
                <div class="head-three">
					<div class="input2">
					    <div class="title">账号状态：</div>
					    <el-select
					        v-model="query.traderAccountStatus"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="-1" label="全部" value="-1"></el-option>
					        <el-option key="1" label="启用" value="1"></el-option>
					        <el-option key="2" label="禁用" value="2"></el-option>
					    </el-select>
					</div>
					<div class="input2">
					    <div class="title">客户类型：</div>
					    <el-select
					        v-model="query.traderTypeChild"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="-1" label="全部" value="-1"></el-option>
					        <el-option key="1" label="个人客户" value="1"></el-option>
					        <el-option key="2" label="企业客户" value="2"></el-option>
					    </el-select>
					</div>
                    <div class="but">
                        <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
                        <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
                    </div>
                </div>
            </div>

            <div class="from-head">
                <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item)"
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
                
            >
				<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="memberCodeName" label="运营商编号/简称" width="180" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="orgCodeName" label="机构编号/简称" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="traderCodeName" label="经纪人编号/简称" width="180" align="center"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="客户账号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fName" label="客户简称" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fFullName" label="企业名称" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="客户状态" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAccountStatus" :formatter="accountStatusFormat" label="账号状态" width="100" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTraderTypeChild" :formatter="traderTypeChildFormat" label="客户类型" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCertifyStatus" :formatter="certifyFormat" label="是否实名认证" width="120" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="fDealerCertifyStatus" :formatter="comCertifyFormat" label="是否企业认证" width="120" align="center"></el-table-column> -->
				<el-table-column :show-overflow-tooltip="true" prop="fBusnessReward" :formatter="rewardFormat" label="税率" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="开户时间" width="160" align="center"></el-table-column
				<el-table-column :show-overflow-tooltip="true" prop="fCancelTime" label="注销时间" width="160" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fDescn" label="描述" align="center"></el-table-column>
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

        <!-- 编辑弹出框 -->

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
		<popup ref="popup"></popup>
		<transformBelongPop ref="transformBelongPop"></transformBelongPop>
		<askAuthPop ref="askAuthPop"></askAuthPop>
		<detailPopup ref="detailPopup"></detailPopup>
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
import popup from './popup/customerPop.vue';
import transformBelongPop from './popup/transformBelongPop.vue';
import askAuthPop from './popup/askAuthPop.vue';
import detailPopup from './popup/detailPop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
			selectedRow:'',
            tableData: [],
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
            butId: 101008001,
            menu: '',
            loading: true,
			querying:false,
        };
    },
    created() {
		this.query.fTraderStatus="-1";
		this.query.traderAccountStatus="-1";
		this.query.traderTypeChild="-1";
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
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   let list = await request('/account/customer/list', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item){
			if(item=='新增'){
				this.$store.commit('setPopup1', {"showType":'add'});
				this.$refs.popup.receipt();
				return;
			}
			if(item=='详情'||item=='修改'||item=='变更归属'||item=='客户转移'
				||item=='申请实名认证'||item=='申请企业认证'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fTraderId>0)){
					this.$message.error("请选择数据");
					return;
				}
				let obj = JSON.parse(JSON.stringify(this.selectedRow));
				obj.fFullName='';
				if(item=='申请实名认证'){
					if(this.selectedRow.fStatus==6){
						this.$message.error("当前状态是[已登记]，不允许操作");
						return;
					}
					// if(obj.fTraderTypeChild==2){
					// 	this.$message.error("企业客户只能申请企业认证不能申请实名认证");
					// 	return;
					// }
					let res = await request('/account/certify/checkWaitAuth', 
						{"fTableId":this.selectedRow.fTraderId,"fTableType":2});
					if(res.errMsg){
						this.$message.error(res.errMsg);
						return false;
					}else{
						this.$store.commit('setPopup1', obj);
						this.$refs.askAuthPop.receipt();
					}
					return;
				}
				// if(item=='申请企业认证'){
				// 	if(this.selectedRow.fStatus==6){
				// 		this.$message.error("当前状态是[已登记]，不允许操作");
				// 		return;
				// 	}
				// 	if(obj.fTraderTypeChild==1&&obj.fCertifyStatus!=2){
				// 		this.$message.error("请先进行实名认证");
				// 		return;
				// 	}
				// 	let res = await request('/account/certify/checkWaitAuth', 
				// 		{"fTableId":this.selectedRow.fTraderId,"fTableType":2,"fType":2});
				// 	if(res.errMsg){
				// 		this.$message.error(res.errMsg);
				// 		return false;
				// 	}else{
				// 		this.$store.commit('setPopup1', obj);
				// 		this.$refs.askCompanyAuthPop.receipt();
				// 	}
				// 	return;
				// }
				if(item=='变更归属'||item=='客户转移'){
					this.$store.commit('setPopup1', obj);
					this.$refs.transformBelongPop.receipt();
					return;
				}
				if(item=='修改'){
					obj.showType='update';
					this.$store.commit('setPopup1', obj);
					this.$refs.popup.receipt();
				}else if(item=='详情'){
					let bean = await request('/account/customer/detail', {"fTraderId":this.selectedRow.fTraderId});
					if(!commonUtils.isEmpty(bean.data.fImageCert1)){
						bean.data.fImageCert1FullUrl = commonUtils.imgBaseUrl()+bean.data.fImageCert1;
					}
					if(!commonUtils.isEmpty(bean.data.fImageIdcardN)){
						bean.data.fImageIdcardNFullUrl = commonUtils.imgBaseUrl()+bean.data.fImageIdcardN;
					}
					if(!commonUtils.isEmpty(bean.data.fImageIdcardF)){
						bean.data.fImageIdcardFFullUrl = commonUtils.imgBaseUrl()+bean.data.fImageIdcardF;
					}
					this.$store.commit('setPopup1', bean.data);
					this.$refs.detailPopup.receipt();
				}
				return;
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
					if(item.fName!='查询'&&item.fName!='申请企业认证'){
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
			this.query.fTraderStatus="-1";
			this.query.traderAccountStatus="-1";
			this.query.traderTypeChild="-1";
		    this.getData();  
		},
		accountStatusFormat(row) {
            if (row.fAccountStatus == 1) {
                return '启用';
            }
            if (row.fAccountStatus == 2) {
                return '禁用';
            }
		},
		certifyFormat(row){
			if(row.fTraderTypeChild==1){
				return this.doCertifyFormat(row.fCertifyStatus);
			}else if(row.fTraderTypeChild==2){
				return this.doCertifyFormat(row.fDealerCertifyStatus);
			}
		},
		comCertifyFormat(row){
			return this.doCertifyFormat(row.fDealerCertifyStatus);
		},
		doCertifyFormat(status){
			if(status==1){
				return "未认证"
			}
			if(status==2){
				return "已认证"
			}
		},
		statusFormat(row){
			if(row.fStatus==1){
				return "已开户"
			}
			if(row.fStatus==2){
				return "待签约"
			}
			if(row.fStatus==3){
				return "正常"
			}
			if(row.fStatus==4){
				return "申请注销"
			}
			if(row.fStatus==5){
				return "已注销"
			}
			if(row.fStatus==6){
				return "已登记"
			}
		},
		traderTypeChildFormat(row){
			if(row.fTraderTypeChild==1){
				return "个人客户"
			}
			if(row.fTraderTypeChild==2){
				return "企业客户"
			}
		},
		rewardFormat(row){
			if(typeof (row.fBusnessReward) == 'number'){
				return (row.fBusnessReward * 100).toFixed(2) + '%';
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
	    popup,
		transformBelongPop,
		askAuthPop,
		detailPopup
	}
};
</script>