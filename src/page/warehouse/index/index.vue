<template>
	<div class="warehouse">
		<div v-if="pageType == 'couponList'">

			<el-form :inline="true" :model="condition" class="demo-form-inline">
				<el-form-item label="门店/仓库">
					<el-select v-model="condition.warehouse" :size="size" placeholder="请选择门店/仓库">
						<el-option label="国际花都天香园1号" value="shanghai"></el-option>
						<el-option label="国际花都天香园1号" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="condition.category" :size="size" placeholder="商品分类">
						<el-option label="分类1" value="shanghai"></el-option>
						<el-option label="分类2" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品筛选">
					<el-input v-model="condition.product" :size="size" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :size="size" @click="onSubmit">筛选</el-button>
				</el-form-item>
				<el-button type="text" @click="clearCondition" style="padding-top: 17px; padding-bottom: 0">清空筛选条件</el-button>
			</el-form>

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
						<el-button :size="size">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
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
                condition: {
                    warehouse:'',
                    category: '',
                    product: ''
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
                pageType:'couponList',
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60;
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
                });
            },

            clearCondition(){
                this.condition.warehouse=''
				this.condition.category=''
				this.condition.product=''
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

</style>