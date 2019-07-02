<template>
	<div class="warehouse">
		<el-form :inline="true" :model="condition" class="demo-form-inline deliveryScreen" label-width="80px">
			<el-row>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="商品筛选">
						<el-select v-model="condition.productSelect" class="fl" :size="size" placeholder="商品筛选">
							<el-option label="商品名称" value="productName"></el-option>
							<el-option label="商品编码" value="productCode"></el-option>
						</el-select>
						<el-input v-model="condition.product" v-if="condition.productSelect == 'productName'" placeholder="请输入商品名称" class="fl" :size="size" style="width: 200px;margin-left: 20px;"></el-input>
						<el-input v-model="condition.product" v-if="condition.productSelect == 'productCode'" placeholder="请输入商品编码" class="fl" :size="size" style="width: 200px;margin-left: 20px;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="制单时间">
						<el-date-picker v-model="condition.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="10" :lg="7" :xl="7">
					<el-form-item label="单据编号">
						<el-input v-model="condition.num" class="fl" :size="size" placeholder="请输入单据编号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
					<el-form-item label="单据类型" class="mb20">
						<el-select v-model="condition.type" :size="size" placeholder="单据类型">
							<el-option label="门店补货" value="shanghai"></el-option>
							<el-option label="门店销售" value="beijing"></el-option>
							<el-option label="采购退货" value="shanghai"></el-option>
							<el-option label="门店调拨" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="7">
					<el-form-item label="操作人">
						<el-select v-model="condition.person" :size="size" placeholder="操作人">
							<el-option label="刘经理" value="shanghai"></el-option>
							<el-option label="小的" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="7">
					<el-form-item label="仓库/门店" class="mb20">
						<el-select v-model="condition.shop" :size="size" placeholder="请选择仓库/门店">
							<el-option label="国际花都天香园1号" value="shanghai"></el-option>
							<el-option label="国际花都天香园1号" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" :size="size" @click="onSubmit">筛选</el-button>
				<el-button :size="size">导出报表</el-button>
				<el-button :size="size">查看报表</el-button>
			</el-form-item>
			<el-button type="text" @click="clearCondition" style="padding-top: 17px; padding-bottom: 0">清空筛选条件</el-button>
		</el-form>
		<!--列表-->
		<el-table stripe :data="turnoverList" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%; margin-top: 20px;" :height="tableHeight">
			<el-table-column label="单据编号">
				<template slot-scope="scope">
					<span class="baseColor">{{scope.row.num}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="time" label="制单时间"></el-table-column>
			<el-table-column prop="type" label="单据类型">
				<template slot-scope="scope">
					<span v-if="scope.row.type=='put'">入库</span>
					<span v-if="scope.row.type=='out'">出库</span>
				</template>
			</el-table-column>
			<el-table-column label="商品名称">
				<template slot-scope="scope">
					<p>{{scope.row.productName}}</p>
					<p class="gray11">{{scope.row.productNum}}</p>
				</template>
			</el-table-column>
			<el-table-column label="出入库">
				<template slot-scope="scope">
					<p v-if="scope.row.type == 'out'" class="red01">{{scope.row.quantity}}</p>
					<p v-if="scope.row.type == 'put'" class="green01">{{scope.row.quantity}}</p>
				</template>
			</el-table-column>

			<el-table-column prop="surplus" label="剩余量"></el-table-column>
			<el-table-column label="平均成本（元）">
				<template slot-scope="scope">
					<span>{{scope.row.cost | money}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="person" label="操作人"></el-table-column>

		</el-table>
	</div>
</template>

<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../api/api';
    export default {
        data() {
            return {
                value1:'',
                size:this.GLOBAL.size,
                condition: {
                    reason:'',
                    out: '',
                    put: '',
                    state:'',
                    person:'',
                    time:'',
                    productSelect:'productName',
                    product:'',
                    num:''
                },
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                turnoverList:[{
                    num:'OB002190620000001',
                    time:'2019-06-20 15:45:35',
                    type:'out',
                    productName:'黄山奇石褐色版',
                    productNum:'002',
                    quantity:'-10',
                    surplus:'190',
					cost:'382.0000',
					person:'没有啥情况'
                },{
                    num:'OB002190620000001',
                    time:'2019-06-20 15:45:35',
                    type:'out',
                    productName:'黄山奇石褐色版',
                    productNum:'002',
                    quantity:'-10',
                    surplus:'190',
                    cost:'382.0000',
                    person:'没有啥情况'
                },{
                    num:'OB002190620000001',
                    time:'2019-06-20 15:45:35',
                    type:'out',
                    productName:'黄山奇石褐色版',
                    productNum:'002',
                    quantity:'-10',
                    surplus:'190',
                    cost:'382.0000',
                    person:'没有啥情况'
                },{
                    num:'OB002190620000001',
                    time:'2019-06-20 15:45:35',
                    type:'out',
                    productName:'黄山奇石褐色版',
                    productNum:'002',
                    quantity:'-10',
                    surplus:'190',
                    cost:'382.0000',
                    person:'没有啥情况'
                },{
                    num:'OB002190620000001',
                    time:'2019-06-20 15:45:35',
                    type:'put',
                    productName:'黄山奇石褐色版',
                    productNum:'002',
                    quantity:'-10',
                    surplus:'190',
                    cost:'382.0000',
                    person:'没有啥情况'
                },],
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
            watchHandle(){
                this.$router.push({
                    path:'/warehouse/delivery/watch',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
                });
            },
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