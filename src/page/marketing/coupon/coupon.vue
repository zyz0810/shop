<template>
	<div class="coupon">
		<div v-if="pageType == 'couponList'">
			<el-form :inline="true" :model="filters" class="demo-form-inline" style="">
				<el-form-item style="margin-bottom: 10px;">
					<el-button type="primary" @click="add">添加</el-button>
				</el-form-item>
			</el-form>

			<div class="couponTab">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="可领用" name="first">
						<!--工具条-->
						<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
							<el-form :inline="true" :model="filters" class="demo-form-inline">
								<el-form-item>
									<el-button>刷新</el-button>
								</el-form-item>
								<el-form-item>
									<el-date-picker v-model="selectedData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
								</el-form-item>
							</el-form>
						</el-col>
						<!--列表-->
						<el-table stripe :data="users" ref="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :height="tableHeight">
							<el-table-column type="selection" fixed width="55"></el-table-column>
							<el-table-column type="index" label="编号" width="80"></el-table-column>
							<el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
							<el-table-column prop="sex" label="图片" width="100" :formatter="formatSex" sortable></el-table-column>
							<el-table-column prop="age" label="商品分类" width="100" sortable></el-table-column>
							<el-table-column prop="birth" label="销售价" width="120" sortable></el-table-column>
							<el-table-column prop="addr" label="库存" min-width="180" sortable></el-table-column>
							<el-table-column fixed="right" label="操作" width="220">
								<template slot-scope="scope">
									<el-button size="small">分享</el-button>
									<el-button size="small">统计</el-button>
									<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>


						<!--工具条-->
						<el-col :span="24" class="toolbar mt20">
							<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
							<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
							</el-pagination>
						</el-col>
					</el-tab-pane>
					<el-tab-pane label="未开始" name="second">
						<div class="listNone tc">暂无信息</div>
					</el-tab-pane>
					<el-tab-pane label="已领完" name="third">
						<div class="listNone tc">暂无信息</div>
					</el-tab-pane>
					<el-tab-pane label="已过期" name="fourth">
						<div class="listNone tc">暂无信息</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<div v-if="pageType == 'couponAdd'">
			<el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="80px" class="tenantInput"
					 @submit.prevent="onSubmit" style="min-width:600px;">
				<el-form-item required label="券的面额">
					<el-input v-model="form.name" clearable class="inputOne"></el-input>
				</el-form-item>
				<el-form-item required label="最低消费">
					<el-input :class="{'input': true, 'is-danger': errors.has('email') }" v-model="form.person" v-validate="'required|email'" name="email" type="text" clearable class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('email') }}</span>
				</el-form-item>
				<el-form-item required label="券的库存">
					<el-input v-validate="'required|phone'" name="phone" type="number" placeholder="Mobile" v-model="form.phone" :class="{'input': true, 'is-danger': errors.has('phone') }" class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('phone') }}</span>
				</el-form-item>
				<el-form-item label="领券限制">
					<el-input v-model="form.qq" class="inputOne"></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-input v-model="form.url" class="inputOne" v-validate="{url: {require_protocol: true }}" data-vv-as="field" name="url_field"></el-input>
				</el-form-item>

				<el-form-item required label="结束时间">
					<el-input v-model="form.address" class="inputOne"></el-input>
				</el-form-item>


				<el-form-item label="分享文案">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit()">立即创建</el-button>
					<el-button @click.native.prevent @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>


	</div>
</template>

<script>
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';
    export default {
        data() {
            return {
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: true,//编辑界面是否显示
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
                },
                activeName: 'first',
                selectedData:'',
                pageType:'couponList',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    color2: null,
                    phone: ''
                },
                phoneFocus: false,
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 -200;
            }
        },
        methods: {
            onSubmit() {

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // // eslint-disable-next-line
                        // alert('Form Submitted!');
                        return;
                    }
                    // alert('Correct them errors!');
                });
            },
            onCancle(){
                this.pageType = 'couponList'
			},
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },

            add: function(){
                let that = this
				this.pageType = 'couponAdd'
                // this.$router.push({
                //     path: 'coupon/add',
                //     // name: '添加',
                //     // component:'',
                //     query: {
                //         pageActive: 'coupon',
					// 	index:that.$route.query.index,
                //         leaf:that.$route.query.leaf
                //     }
                // })
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
                this.$confirm('下架后商品无法被搜索到，确定下架?', '提示', {
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
            },

        },
        mounted() {
            this.getUsers();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 -200;
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                    console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>

<style lang="scss">
	@import '../../../styles/color.scss';
	@import '../../../styles/common.scss';
	.coupon{

		.is-active{
			background: transparent;
		}
		.el-tabs__header{
			margin: 0;
		}
		.toolbar{
			padding: 10px;
			background: #f2f2f2;
		}
		.couponTab{
			padding: 10px;
			background: $white01;
		}
	}
</style>