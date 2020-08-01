<template>
	<div>
		<div class="container">
			<div class="formatLine">
				<div class="formatTittleleft"></div>
				<div class="formatTittle">- 系统其它参数</div>
				<div class="formatTittleright"></div>
			</div>
			<div class="form-box">
				<el-form ref="data" label-width="190px">
					<el-form-item label="新开账户是否强制修改密码:">
						<!-- <el-select v-model="data.forechange" placeholder="请选择">
                            <el-option key="1" label="强制" value="1"></el-option>
                            <el-option key="2" label="不强制" value="2"></el-option>
                        </el-select> -->
						<el-radio v-model="data.forechange" label="1" value="1">强制</el-radio>
						<el-radio v-model="data.forechange" label="2" value="2">不强制</el-radio>
					</el-form-item>
					<el-form-item label="连续密码错误次数锁定账号:">
						<!-- <el-input style="width:215px;" v-model.number="data.errortimes" @input="CHECK.onlyNumber($data.data,'errortimes',2)"></el-input>次 -->
						<el-input-number style="width: 215px;" v-model="data.errortimes" controls-position="right"  :min="0" :max="20"></el-input-number>次
					</el-form-item>
					<el-form-item label="下订单可提前天数:">
						<!-- <el-input style="width:215px;" @input="CHECK.onlyNumber($data.data,'days',3)" v-model.number="data.days"></el-input>天 -->
						<el-input-number style="width: 215px;" v-model="data.days" controls-position="right"  :min="0" :max="100"></el-input-number>天
					</el-form-item>
					<el-form-item label="服务费输入值范围:">
						<div style="width:500px;">
							<el-col style="display:inline-block;width:215px;height:40px;">
								<el-form-item>
									<el-input style="width:215px;" @input="CHECK.onlyNumber($data.data,'min',CHECK.maxlenthCharge)" v-model="data.min"></el-input>
								</el-form-item>
							</el-col style="display:inline-block;width:35px;height:40px;">
							<el-col class="line" :span="2">-</el-col>
							<el-col style="display:inline-block;width:235px;height:40px;">
								<el-form-item>
									<el-form-item>
										<el-input style="width:215px;" @input="CHECK.onlyNumber($data.data,'max',CHECK.maxlenthCharge)" v-model="data.max"></el-input>元
									</el-form-item>
								</el-form-item>
							</el-col>
						</div>
					</el-form-item>
					<el-form-item label="游客单日可下单数量:">
						<!-- <el-input style="width:215px;" v-model="data.count" @input="CHECK.onlyNumber($data.data,'count',3)"></el-input>笔 -->
						<el-input-number style="width: 215px;" v-model="data.count" controls-position="right"  :min="0" :max="100"></el-input-number>笔
					</el-form-item>
					<el-form-item label="司机推广提成:">
						<el-select v-model="data.driverPromotionType" @change="driverPromotionTypeChange"
						placeholder="请选择" style="display: inline-block;width: 100px;margin-right: 0.625rem;">
							<el-option  label="固定值" value="1">
							</el-option>
							<el-option  label="比例" value="2">
							</el-option>
						</el-select>
						<el-input style="width:215px;" v-model.number="data.driverPromotion" @input="CHECK.onlyNumber($data.data,'driverPromotion',7)"></el-input>
						{{data.driverprecent}}
					</el-form-item>
					<el-form-item label="客户推广提成:">
						<el-select v-model="data.customerPromotionType" @change="customerPromotionTypeChange" 
						placeholder="请选择" style="display: inline-block;width: 100px;margin-right: 0.625rem;">
							<el-option  label="固定值" value="1">
							</el-option>
							<el-option  label="比例" value="2">
							</el-option>
					    </el-select>
						<el-input style="width:215px;" v-model.number="data.customerPromotion" @input="CHECK.onlyNumber($data.data,'driverPromotion',7)"></el-input>
						{{data.customerprecent}}
					</el-form-item>
					<el-form-item label="最小福币提现:">
						<el-input style="width:215px;" v-model="data.poingMinWithdrawal" @input="CHECK.onlyNumber($data.data,'poingMinWithdrawal',7)"></el-input>
					</el-form-item>
					<el-form-item label="补签消耗福币:">
						<el-input style="width:215px;" v-model="data.poingSigninConsume" @input="CHECK.onlyNumber($data.data,'poingSigninConsume',7)"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '@/assets/Public/request.js';
	import '@/assets/css/popup/popup.css';
	import check from '@/assets/Public/check.js';
	export default {
		data() {
			return {
				data: {
					forechange: '1',
					errortimes: '',
					min: '',
					max: '',
					count: '',
					customerPromotion: '',
					customerPromotionType: '',
					driverPromotion: '',
					driverPromotionType: '',
					poingMinWithdrawal: '',
					poingSigninConsume: '',
					customerprecent: '',
					driverprecent: ''
				},
				result: "",
			};
		},
		created() {
			this.getData();
		},
		methods: {
			async getData() {
				this.data = (await request('/parameter/other/param/list', this.query)).data;
				this.data.forechange = this.data.forechange + '';
				this.driverPromotionTypeChange();
				this.customerPromotionTypeChange();
			},
			driverPromotionTypeChange() {
				this.data.driverprecent = " ";
				if (this.data.driverPromotionType == 2) {
					this.data.driverprecent = "%";
				} else {
					this.data.driverprecent = "元";
				}
			},
			customerPromotionTypeChange() {
				this.data.customerprecent = " ";
				if (this.data.customerPromotionType == 2) {
					this.data.customerprecent = "%";
				} else {
					this.data.customerprecent = "元";
				}
			},
			async submitForm() {
				if (!check.notNulWarn(this, this.data.errortimes, "连续密码错误次数锁定账号")) {
					return false;
				}
				if (!check.notNulWarn(this, this.data.days, "下订单可提前天数")) {
					return false;
				}
				if (!check.notNulWarn(this, this.data.min, "服务费范围")) {
					return false;
				}
				if (!check.notNulWarn(this, this.data.max, "服务费范围")) {
					return false;
				}
				if (this.data.min > this.data.max) {
					this.$message.error('服务费范围有误');
					return false;
				}
				if (!check.notNulWarn(this, this.data.count, "游客单日可下单数量")) {
					return false;
				}
				if (!check.notNulWarn(this, this.data.poingMinWithdrawal, "最小福币提现")) {
					return false;
				}
				if (!check.notNulWarn(this, this.data.poingSigninConsume, "补签消耗福币")) {
					return false;
				}
				console.log(this.data);
				let result = await request('/parameter/other/param/update', this.data);
				console.log(result);
				if (result.errCode == 0) {
					this.$message.success('修改成功！');
				}else{
					this.$message.error(result.errMsg);
				}
			},
			onlyNumber(value) {
				console.log(value)
				this.data.count = this.CHECK.onlyNumber(value, 3);
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		mounted() {}
	};
</script>
<style lang="scss" scoped>
	.el-form-item__label {
		width: 180px;
	}
</style>
