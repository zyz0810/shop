<template>
	<section>
		<div class="home_block">
			<el-row :gutter="20" class="color_block tc">
				<el-col :span="6">
					<a href="javascript:;" class="white01">
						<p class="f20">29</p>
						<p class="f16">待发货</p>
					</a>
				</el-col>
				<el-col :span="6">
					<a href="javascript:;" class="white01">
						<p class="f20">29</p>
						<p class="f16">待发货</p>
					</a>
				</el-col>
				<el-col :span="6">
					<a href="javascript:;" class="white01">
						<p class="f20">29</p>
						<p class="f16">待发货</p>
					</a>
				</el-col>
				<el-col :span="6">
					<a href="javascript:;" class="white01">
						<p class="f20">29</p>
						<p class="f16">待发货</p>
					</a>
				</el-col>
			</el-row>
		</div>
		<div class="home_block">
			<h2 class="title">实时概况</h2>

			<el-row :gutter="20" class="">
				<el-col :span="12" class=" block_left">
					<el-col :span="12">
						<p class="gray07">UV</p>
						<p class="f28 bold">2123<span class="added f12 normal">+1.8%<i class="el-icon-top green01"></i></span></p>
					</el-col>
					<el-col :span="12">
						<p class="gray07">PV</p>
						<p class="f28 bold">2<span class="added f12 normal">+1.8%<i class="el-icon-bottom red01"></i></span></p>
					</el-col>
					<el-col :span="12">
						<p class="gray07">平均停留时间<span class="f12">（分钟）</span></p>
						<p class="f28 bold">2<span class="added f12 normal">+1.8%<i class="el-icon-top green01"></i></span></p>
					</el-col>
					<el-col :span="12">
						<p class="gray07">新增会员<span class="f12">（个）</span></p>
						<p class="f28 bold">864<span class="added f12 normal">+16%<i class="el-icon-top green01"></i></span></p>
					</el-col>
				</el-col>
				<el-col :span="12">
					<el-col :span="12">
						<p class="gray07">余额<span class="f12">（元）</span></p>
						<p class="f28 bold">864.23</p>
					</el-col>
					<el-col :span="12">
						<p class="gray07">冻结金额<span class="f12">（元）</span></p>
						<p class="f28 bold">864.23</p>
					</el-col>
					<el-col :span="12">
						<p class="gray07">库存金额<span class="f12">（元）</span></p>
						<p class="f28 bold">864.23</p>
					</el-col>
				</el-col>
			</el-row>
		</div>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style lang="scss">
	@import '../../styles/color.scss';
	@import '../../styles/common.scss';

	.home_block{
		margin-bottom: 20px;
		padding:20px;
		background: $white01;
		.el-col{
			margin: 10px 0;
		}
	}
	.block_left{

		position: relative;
		&:after{
			@include border(right,$gray05,1)
		}
	}
	.added{
		margin-left: 10px;
	}
	.color_block{
		.el-col{
			a{
				display: block;
				border-radius: 10px;
				padding: 20px 0;


			}
	&:nth-child(1){
		 a{
			 background: #87C988;
		 }
	 }
	&:nth-child(2){
		 a{
			 background: #87B6C9;
		 }

	 }
	&:nth-child(3){
		 a{
			 background: #7B92C8;
		 }

	 }
	&:nth-child(4){
		 a{
			 background: #A07BC8;
		 }
	 }
		}
	}
</style>