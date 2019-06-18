<template>
	<div class="warehouse">
		<div v-if="pageType == 'manage'">
			<div class="out_btn">
				<el-button type="primary" :size="size" @click="onCreate">新建仓库</el-button>
			</div>
			<!--列表-->
			<el-table stripe :data="users" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
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
						<el-button :size="size" type="text">编辑</el-button>
						<el-button :size="size" type="text" class="red01" @click="handleProhibit">禁用</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-else>
			<p>基本信息</p>
			<el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="150px" class=""
					 @submit.prevent="onSubmit" style="min-width:600px;">
				<el-form-item required label="仓库名称">
					<el-input :size="size" v-model="form.name" v-validate="'required'" data-vv-as="仓库名称" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" clearable class="inputOne" placeholder="请输入仓库名称"></el-input>
					<span class="help is-danger">{{ errors.first('name') }}</span>
				</el-form-item>
				<el-form-item label="仓库编码">
					<el-input :size="size" v-model="form.num" type="text" placeholder="请输入仓库编码" clearable class="inputOne"></el-input>
					<!--<span class="help is-danger">{{ errors.first('email') }}</span>-->
				</el-form-item>
				<el-form-item required label="所属区域">
					<city></city>
				</el-form-item>
				<el-form-item required label="详细地址">
					<el-input :size="size" v-model="form.address" v-validate="'required'" data-vv-as="详细地址" name="address" :class="{'input': true, 'is-danger': errors.has('address') }" placeholder="请输入详细地址" class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('address') }}</span>
				</el-form-item>

				<el-form-item required label="联系人">
					<el-input :size="size" v-model="form.person" class="inputOne" v-validate="'required'" data-vv-as="联系人" name="person" :class="{'input': true, 'is-danger': errors.has('person') }" placeholder="请输入联系人"></el-input>
					<span class="help is-danger">{{ errors.first('person') }}</span>

				</el-form-item>

				<el-form-item required label="联系电话">
					<el-input :size="size" v-model="form.phone" name="phone" placeholder="请输入联系电话" v-validate="'required|phone'" :class="{'input': true, 'is-danger': errors.has('phone') }" class="inputOne"></el-input>
					<span class="help is-danger">{{ errors.first('phone') }}</span>
				</el-form-item>

				<el-form-item label="备注">
					<el-input :size="size" type="textarea" maxlength="200" show-word-limit v-model="form.desc" :autosize="autosize" class="inputOne"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :size="size" type="primary" @click="onSubmit()">立即创建</el-button>
					<el-button :size="size" @click.native.prevent @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-dialog
				title="仓库创建成功"
				:visible.sync="dialogVisible"
				width="30%"
				:before-close="handleClose">
			<span>已成功创建<span class="baseColor">南二环是谁的热</span>，现在就去甚至期初库存吗？</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">暂时放弃</el-button>
    <el-button type="primary" @click="goPrime">去设置</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';
    import city from './../../../components/city.vue';
    export default {
        data() {
            return {
                autosize:{
                    minRows: 2, maxRows: 6
				},
                form:{
                    name:'',
					num:'',
					area:'',
					address:'',
					person:'',
                    phone:'',
					desc:''
				},
                size:this.GLOBAL.size,
                condition: {
                    warehouse:'',
                    category: '',
                    product: '',
                    person:'',
					num:''
                },
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
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
                pageType:'manage',
                dialogVisible:false
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60;
            }
        },
        components:{
            city,
        },
        methods: {
            onCreate(){
                console.log('455')
                this.pageType = 'create'
			},
            onSubmit() {
                this.$validator.validateAll().then((result) => {
					this.dialogVisible = true
                });
            },
            goPrime(){
                this.dialogVisible = false
                this.$router.push({
					path: '/warehouse/prime',
					query: {
					    index: 4,leaf:0
					}
                })

			},
            onCancle(){
                this.pageType = 'manage'
			},

            clearCondition(){
                this.condition.warehouse=''
				this.condition.category=''
				this.condition.product=''
				this.condition.person=''
                this.condition.num=''
			},

            handleCurrentChange(val) {
                this.page = val;
                // this.getUsers();
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
            handleProhibit: function () {
                this.$confirm('确定禁用'+ '南二环' +'吗?', '仓库创建成功', {
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
                        // this.getUsers();
                    });
                }).catch(() => {

                });
            },
        },
        watch: {
            // 监听屏幕高度改变表格高度

            screenHeight(val) {
                console.log('监听')
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
                console.log('表格高度：'+this.tableHeight)
            }
        },
        mounted() {
            // this.getUsers();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
            console.log(this.$refs.table.$el.offsetTop)
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                    // console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>

<style lang="scss" type="text/scss">
	@import '../../../styles/color.scss';
	@import '../../../styles/common.scss';
	.warehouse{
		padding: 10px;
		background: $white01;
		.out_btn{
			padding: 10px;
		}
		.demo-form-inline{
			padding: 10px;
			background: $gray06;
			.el-form-item{
				margin-bottom: 0;
			}
		}
	}
</style>