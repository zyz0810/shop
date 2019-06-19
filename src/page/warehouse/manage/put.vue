<template>
	<div class="warehouse">
		<div v-if="pageType == 'index'">
			<div class="out_btn">
				<el-button type="primary" :size="size" @click="onCreate">新建入库单</el-button>
			</div>

			<el-form :inline="true" :model="condition" class="demo-form-inline" label-width="100px">
				<!--<el-form-item label="商品名称">-->
					<!--<el-input v-model="condition.product" :size="size" placeholder="请输入商品名称"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item label="入库单号">
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
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-if="pageType == 'view'" class="view">
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

			<div class="bottom">
				<el-button :size="size" @click="goBack()">返回</el-button>
			</div>

		</div>
		<div v-if="pageType == 'create'">
			<p>基本信息</p>
			<el-form :inline="true" :model="create" class="demo-form-inline" label-width="100px" hideRequiredSterisk="true">
				<el-form-item label="门店/仓库">
					<el-select v-model="create.warehouse" :size="size" placeholder="请选择仓库">
						<el-option label="分店1" value="shanghai"></el-option>
						<el-option label="分店1" value="beijing"></el-option>
					</el-select>
					<span class="baseColor f12 bold">新建</span>
				</el-form-item>
				<el-form-item label="出库原因">
					<el-select v-model="create.reason" :size="size" placeholder="请选择出库原因">
						<el-option label="分店1" value="shanghai"></el-option>
						<el-option label="分店1" value="beijing"></el-option>
					</el-select>
					<span class="baseColor f12 bold">新建</span>
				</el-form-item>
				<el-form-item label="出库时间">
					<el-date-picker v-model="create.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
				</el-form-item>
				<el-form-item label="操作人">
					<el-input v-model="create.person" :size="size" :disabled="true"></el-input>
				</el-form-item>

			</el-form>
			<el-form :inline="true" :model="create" class="demo-form-inline" label-width="100px" hideRequiredSterisk="true">
				<el-form-item label="备注">
					<el-input v-model="create.desc" :size="size" type="textarea"></el-input>
				</el-form-item>
			</el-form>

			<div class="m18">
				<el-button type="primary" @click="dialogProduct = true">选择商品</el-button>
				<el-button :size="size" type="text" @click="goAddProduct">新建商品</el-button>
			</div>


			<!--列表-->
			<el-table stripe :data="productSet" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%; margin-top: 20px;" :height="tableHeight">
				<el-table-column label="商品名称" width="350">
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
				<!--<el-table-column  type="index"></el-table-column>-->
				<el-table-column label="数量">
					<template slot-scope="scope">
						<el-input :size="size" v-model="scope.row.name4" placeholder="请输入数量"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name5" label="库存数量"></el-table-column>
				<el-table-column label="销售价">
					<template slot-scope="scope">
						<span>{{ scope.row.name66 | money}}</span>
					</template>
				</el-table-column>
				<el-table-column label="成本价">
					<template slot-scope="scope">
						<span>{{ scope.row.name7 | money}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button :size="size" type="text" class="red01" @click="delProduct(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<!--选择商品-->
		<el-dialog title="选择商品" :visible.sync="dialogProduct" width="900px" class="category">
            <span class=" clearfix">
                <el-tree :data="category" :props="defaultProps" @node-click="handleNodeClick" class="fl"></el-tree>
                <div class="categoryProduct fr">
                    <p class="baseColor goAddProduct">新建商品</p>
					<!--列表-->
                    <el-table stripe :data="categoryProduct" :header-row-class-name="headClass" @selection-change="checkedProduct" :size="size" ref="productTable" highlight-current-row v-loading="listLoading" style="width: 100%;" height="500">
                         <el-table-column type="selection" @selection-change="checkedProduct" width="55"></el-table-column>
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
                        <el-table-column prop="name4" label="规格"></el-table-column>
                    </el-table>
                </div>
            </span>
			<span slot="footer" class="dialog-footer">
                <span>已选商品：{{selectedProduct.length}}</span>
                <el-button type="primary" @click="goPrime">确定</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';
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
                category: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                productSet:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'10.00',
                    name66:'2019.00',
					name7:'545.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'15.00',
                    name66:'2019.00',
                    name7:'545.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'20.00',
                    name66:'2019.00',
                    name7:'545.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'5.00',
                    name66:'2019.00',
                    name7:'545.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'10.00',
                    name66:'2019.00',
                    name7:'545.00'
                },],
                selectedProduct:[],
                create: {
                    warehouse:'',
                    person:'操作人1',
                    time:'',
                    desc:'',
                    reason:''
                },
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
            goView(){
                this.pageType = 'view'
			},
            handleNodeClick(data) {
                console.log(data);
            },
            handleClose(done) {
                this.dialogVisible = false
                this.dialogProduct = false
            },
            goPrime(){
                this.dialogVisible = false
				this.pageType = 'index'
                // this.$router.push({
                //     path: '/warehouse/out',
                //     query: {
                //         index: 4,leaf:0
                //     }
                // })

            },
            //新建商品
            goAddProduct(){
                this.$router.push({  //核心语句
                    path:'/product/add',   //跳转的路径
                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                        index:3,
                        leaf:0
                    }
                })
            },

            //删除商品
            delProduct(index){
                this.$confirm('确定删除此商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.productSet.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //选择商品
            checkedProduct(val){
                this.selectedProduct = val;
                console.log(this.selectedProduct)
            },
            onCreate(){
                this.pageType = 'create'
			},
            goBack(){
                this.pageType = 'index'
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