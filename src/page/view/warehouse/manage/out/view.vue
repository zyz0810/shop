<template>
	<div class="warehouse">

		<div class="view">
			<p>基本信息</p>
			<el-form ref="form" label-width="160px" :inline="true" :size="size">
				<el-form-item label="单据编号">
					<span>QYW201906032356</span>
				</el-form-item>
				<el-form-item label="仓库">
					<span>QYW201906032356</span>
				</el-form-item>
				<el-form-item label="操作人">
					<span>沙宝亮</span>
				</el-form-item>
				<el-form-item label="制单时间">
					<span>2019-05-07 12:58:56</span>
				</el-form-item>
				<el-form-item label="入库时间">
					<span>2019-05-07 12:58:56</span>
				</el-form-item>
				<el-form-item label="备注">
					<span>--</span>
				</el-form-item>
				<el-divider></el-divider>
			</el-form>
			<b class="sub">合计：8989.00元</b>
			<!--列表-->
			<el-table stripe :data="product" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
				<el-table-column label="商品名称" width="300">
					<template slot-scope="scope">
						<div class="product">
							<div class="img fl"><img :src="scope.row.name0"></div>
							<div class="fl">
								<p>{{scope.row.name1}}</p>
								<p class="gray10">{{scope.row.name2}}</p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name3" label="单位" ></el-table-column>
				<el-table-column prop="name4" label="数量"></el-table-column>
				<el-table-column prop="name5" label="销售价"></el-table-column>
				<el-table-column fixed="right" prop="name6" label="小计（元）" width="100"></el-table-column>
			</el-table>


		</div>

	</div>
</template>

<script>
    import util from '../../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../../api/api';
    export default {
        data() {
            return {
                size:this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                product: [{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                }],
                total: 0,
                page: 1,
                listLoading: false,
                pageType:'index',
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
            this.headClass()
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