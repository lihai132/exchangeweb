<template>
	<div class="BaseTable" @click="onMouseDown">
		<div class="container">
			<div class="from-head">
				<el-button style="height:26px; line-height: 26px;padding:0 8px;" v-for="(item,index) in menus" :key="index" @click="buttonClick(item)">{{item}}</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 highlight-current-row @row-click="clickTableRow" @current-change="selectChage" @row-contextmenu="rightClick"
			 :summary-method="getSummaries" show-summary>

				<el-table-column :show-overflow-tooltip="true" label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fName" label="方案名称" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fDealerCateId" :formatter="stateFormat2" label="方案类型  " width="120" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fType" :formatter="stateFormat1" label="类型" width="100" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeOpenFloor" label="客服服务费下限" width="120" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeOpenCeil" label="客服服务费上限" width="120" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeOpenMarket" :formatter="formatfChargeOpenMarket" label="市场留存客服服务费" width="150" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeCloseFloor" label="调度服务费下限" width="120" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeCloseCeil" label="调度服务费上限" width="120" align="center">
				</el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fChargeCloseMarket" :formatter="formatfChargeCloseMarket" label="市场留存调度服务费" width="150"
				 align="center">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-size="15" layout="total,  prev, pager, next, jumper" :total="totalNumber" @contextmenu.prevent="rightClick"></el-pagination>
			</div>
		</div>

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

		<div id="menu">

			<div class="menu" v-for="(item,index) in menus" :key="index" @click.stop="infoClick(index)">{{item}}</div>

		</div>

	</div>
</template>

<script>
	import request from '../../../assets/Public/request.js';
	import "../../../assets/css/form/forn.css";
	import popup from '../serverCharge/update.vue';
	export default {
		name: 'basetable',
		data() {
			return {
				query: {
					type: '',
					page: 1,
					pagesize: 20
				},
				tableData: [],
				show: false,
				delList: [],
				editVisible: false,
				totalNumber: 0,
				form: {},
				idx: -1,
				id: -1,
				input1: '',
				input2: '',
				input3: '',
				input4: '',
				type: '',
				currentPage: 1,
				clickData: {},
				rightData: [],
				currentRowIndex: 0, // 获取当前右键点击的table行下标
				menus: [],
				butId: 201002001,
				menu: '',
				loading: true,
				querying:false,
				rowData: {},

			};
		},
		created() {
			this.getData();
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
			async getData() {
				if(this.querying){
							   return;
				}
				this.querying = true;
				let body = {
					"page": "1",
					"pagesize": this.query.pageSize,
					"type": this.type
				};
				var jsonData = (await request('/parameter/servercharge/default/list', this.query));
				this.querying = false;
				this.totalNumber = jsonData.data.total;
				this.tableData = jsonData.data.data;

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
				if (str == "{}") {
					this.$message.error('请选择行');
				} else {
					if (item == '修改') {
						let popup1 = {
							title: item + "默认服务费方案",
							fDealerCateId: this.rowData.fDealerCateId,
						};
						this.$store.commit('setPopup1', popup1);
						this.$refs.popup.receipt();
						console.log(this.$refs);
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
			operation1() {
				if (item == '修改') {
					let popup1 = {
						id: this.id,
						name: this.name,
						sid: this.sid
					};
					this.$store.commit('setPopup1', popup1);
					this.$refs.popup.receipt();
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
				const {
					columns
				} = param;

				const sums = [];
				/* columns.forEach((column, index) => {
				    if (index === 0) {
				        sums[index] = '总计';
				        return;
				    }
				    //this.closeList等等是后台返回的总的数据，然后取值到这里
				    switch (column.property) {
				        case 'marketNumber':
				            sums[index] = this.Total1;
				            break;
				        case 'waybillNumber':
				            sums[index] = this.Total2;
				            break;

				        default:
				            break;
				    }
				});
				*/
				return sums;
			},
			onMouseDown(event) {
				if (event.button == 0) {
					this.menu.style.display = 'none';
				}
			},
			stateFormat1(row) {
				if (row.fType == 1) {
					return '系统内置';
				}
				if (row.fType == 2) {
					return '用户创建';
				}
			},
			stateFormat2(row) {
				if (row.fDealerCateId == 3) {
					return "运营商方案";
				}


			},
			formatfChargeOpenMarket(row) {
				return (row.fChargeOpenMarket * 100).toFixed(2) + "%";

			},
			formatfChargeCloseMarket(row) {
				return (row.fChargeCloseMarket * 100).toFixed(2) + "%";

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
			}
		},
		mounted() {
			this.toggleSelection([this.tableData[0]]);
			this.menu = document.querySelector('#menu');
		},
		components: {
			popup
		}
	};
	//  固定底部滚动条
	//  $(".el-table__body-wrapper").css("height","70%");
	//  $(".el-table__body-wrapper").css("overflow-y","auto");
</script>
