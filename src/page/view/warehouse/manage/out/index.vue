<template>
	<div class="warehouse">
		<div class="out_btn">
			<el-button type="primary" :size="size" @click="onCreate">新建出库单</el-button>
		</div>
		<el-form :inline="true" :model="condition" class="demo-form-inline" label-width="100px">
			<el-form-item label="商品名称">
				<el-input v-model="condition.product" :size="size" placeholder="请输入商品名称"></el-input>
			</el-form-item>
			<el-form-item label="出库单号">
				<el-input v-model="condition.num" :size="size" placeholder="请输入出库单号"></el-input>
			</el-form-item>
			<el-form-item label="门店/仓库">
				<el-select v-model="condition.warehouse" :size="size" placeholder="请选择门店/仓库">
					<el-option label="国际花都天香园1号" value="shanghai"></el-option>
					<el-option label="国际花都天香园1号" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出库类型">
				<el-select v-model="condition.category" :size="size" placeholder="商品分类">
					<el-option label="分类1" value="shanghai"></el-option>
					<el-option label="分类2" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="操作人">
				<el-select v-model="condition.person" :size="size" placeholder="请选择操作人">
					<el-option label="分店店主1" value="shanghai"></el-option>
					<el-option label="分店店主1" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :size="size" @click="onSubmit">筛选</el-button>
			</el-form-item>
			<el-button type="text" @click="clearCondition" style="padding-top: 15px;">清空筛选条件</el-button>
		</el-form>

		<!--列表-->
		<el-table stripe :data="outList" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top: 20px;" :header-row-class-name="headClass" :cell-class-name="cellStyle" :height="tableHeight">
			<!--<el-table-column type="selection" fixed width="55"></el-table-column>-->
			<el-table-column prop="name0" label="单据编号"></el-table-column>
			<el-table-column prop="name1" label="制单时间" ></el-table-column>
			<el-table-column prop="name2" label="单据类型"></el-table-column>
			<el-table-column prop="name3" label="仓库/门店"></el-table-column>
			<el-table-column prop="name4" label="操作人"></el-table-column>
			<el-table-column label="备注">
				<template slot-scope="scope">
					<span>{{ scope.row.name5?scope.row.name5:'--' }}</span>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button :size="size" type="text" @click="goView">详情</el-button>
					<el-button :size="size" type="text" @click="">配送</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
    import util from '../../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../../api/api';
    export default {
        data() {
            return {
                categoryProduct:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                }],
                dialogProduct:false,
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
                outList: [{
                    name0:'OB002190507000002',
					name1:'2019-5-16 15:25:09',
                    name2:'出库-门店销售',
                    name3:'国际花都3期仓库',
                    name4:'1店店长',
                    name5:'国际花都3期仓库采购错了',
				},{
                    name0:'OB002190507000002',
                    name1:'2019-5-16 15:25:09',
                    name2:'出库-门店销售',
                    name3:'国际花都3期仓库',
                    name4:'1店店长',
                    name5:'',
                },{
                    name0:'OB002190507000002',
                    name1:'2019-5-16 15:25:09',
                    name2:'出库-门店销售',
                    name3:'国际花都3期仓库',
                    name4:'1店店长',
                    name5:'国际花都3期仓库采购错了',
                },{
                    name0:'OB002190507000002',
                    name1:'2019-5-16 15:25:09',
                    name2:'出库-门店销售',
                    name3:'国际花都3期仓库',
                    name4:'1店店长',
                    name5:'国际花都3期仓库采购错了',
                },{
                    name0:'OB002190507000002',
                    name1:'2019-5-16 15:25:09',
                    name2:'出库-门店销售',
                    name3:'国际花都3期仓库',
                    name4:'1店店长',
                    name5:'',
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
            //新建出库单
            onCreate(){
                this.$router.push({
                    path:'/warehouse/out/add',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
                });
			},
            goView(){
                this.$router.push({
                    path:'/warehouse/out/view',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
                });
			},
            //设置单元格字体颜色
            cellStyle({row, column, rowIndex, columnIndex}){
                if(columnIndex === 0){//指定列号
                    return 'baseColor'
                }else{
                    return ''
                }
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