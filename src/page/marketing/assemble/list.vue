<template>
	<div class="coupon">
		<div v-if="pageType == 'couponList'">
			<div class="operation">
				<el-button type="primary" :size="size" @click="add">添加</el-button>
				<el-button type="danger" :size="size" @click="handleDel">删除</el-button>
				<el-button :size="size">刷新</el-button>
				<el-button :size="size">导出</el-button>
				<el-select v-model="value" :size="size" clearable placeholder="活动状态">
					<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</div>



			<!--列表-->
			<el-table stripe :data="users" ref="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top: 20px;" :height="tableHeight">
				<el-table-column type="selection" fixed width="55"></el-table-column>
				<el-table-column prop="name0" label="活动名称"></el-table-column>
				<el-table-column prop="name1" label="活动范围" ></el-table-column>
				<el-table-column prop="name2" label="参与角色"></el-table-column>
				<el-table-column prop="name3" label="开始时间"></el-table-column>
				<el-table-column prop="name4" label="结束时间"></el-table-column>
				<el-table-column prop="name5" label="活动状态"></el-table-column>
				<el-table-column prop="name6" label="排名模板"></el-table-column>
				<el-table-column prop="name7" label="销售额"></el-table-column>
				<el-table-column prop="name8" label="支出佣金"></el-table-column>
				<el-table-column prop="name9" label="奖池"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button :size="size">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-if="pageType == 'couponAdd'">
			<el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="80px" class="tenantInput"
					 @submit.prevent="onSubmit" style="min-width:600px;">
				<el-form-item required label="券的面额">
					<el-input v-model="form.name" clearable class="inputOne" :size="size"></el-input>
				</el-form-item>
				<el-form-item required label="最低消费">
					<el-input :class="{'input': true, 'is-danger': errors.has('email') }" :size="size" v-model="form.person" v-validate="'required|email'" name="email" type="text" clearable class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('email') }}</span>
				</el-form-item>
				<el-form-item required label="券的库存">
					<el-input v-validate="'required|phone'" :size="size" name="phone" type="number" placeholder="Mobile" v-model="form.phone" :class="{'input': true, 'is-danger': errors.has('phone') }" class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('phone') }}</span>
				</el-form-item>
				<el-form-item label="领券限制">
					<el-input v-model="form.qq" :size="size" class="inputOne"></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-input v-model="form.url" class="inputOne" :size="size" v-validate="{url: {require_protocol: true }}" data-vv-as="field" name="url_field"></el-input>
				</el-form-item>

				<el-form-item required label="结束时间">
					<el-input v-model="form.address" :size="size" class="inputOne"></el-input>
				</el-form-item>


				<el-form-item label="分享文案">
					<el-input type="textarea" :size="size" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :size="size" type="primary" @click="onSubmit()">立即创建</el-button>
					<el-button :size="size" @click.native.prevent @click="onCancle()">取消</el-button>
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
                size:this.GLOBAL.size,
                options: [{
                    value: '选项1',
                    label: '未开始'
                }, {
                    value: '选项2',
                    label: '进行中'
                }, {
                    value: '选项3',
                    label: '已结束'
                }],
                value: '',
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                filters: {
                    name: ''
                },
                users: [{
                    name0:'2019第一周',
					name1:'中国',
                    name2:'或加店主',
                    name3:'2019-9-8',
                    name4:'2019-9-8',
                    name5:'已结束',
                    name6:'52054第一周u',
                    name7:'￥89',
                    name8:'￥878',
                    name9:'￥855',
				},{
                    name0:'2019第一周',
                    name1:'中国',
                    name2:'或加店主',
                    name3:'2019-9-8',
                    name4:'2019-9-8',
                    name5:'已结束',
                    name6:'52054第一周u',
                    name7:'￥89',
                    name8:'￥878',
                    name9:'￥855',
                },{
                    name0:'2019第一周',
                    name1:'中国',
                    name2:'或加店主',
                    name3:'2019-9-8',
                    name4:'2019-9-8',
                    name5:'已结束',
                    name6:'52054第一周u',
                    name7:'￥89',
                    name8:'￥878',
                    name9:'￥855',
                },{
                    name0:'2019第一周',
                    name1:'中国',
                    name2:'或加店主',
                    name3:'2019-9-8',
                    name4:'2019-9-8',
                    name5:'已结束',
                    name6:'52054第一周u',
                    name7:'￥89',
                    name8:'￥878',
                    name9:'￥855',
                },{
                    name0:'2019第一周',
                    name1:'中国',
                    name2:'或加店主',
                    name3:'2019-9-8',
                    name4:'2019-9-8',
                    name5:'已结束',
                    name6:'52054第一周u',
                    name7:'￥89',
                    name8:'￥878',
                    name9:'￥855',
                }],
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
            // getUsers() {
            //     let para = {
            //         page: this.page,
            //         name: this.filters.name
            //     };
            //     this.listLoading = true;
            //     //NProgress.start();
            //     getUserListPage(para).then((res) => {
            //         this.total = res.data.total;
            //         this.users = res.data.users;
            //         this.listLoading = false;
            //         //NProgress.done();
            //     });
            // },
            //删除
            handleDel: function () {
                this.$confirm('确定删除?', '提示', {
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