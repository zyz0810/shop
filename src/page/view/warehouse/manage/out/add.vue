<template>
	<div class="warehouse">
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
		<div class="form_foot tc">
			<el-button type="primary" @click="onSubmit">确定出库</el-button>
			<el-button @click="$router.back(-1)">取消</el-button>
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
		<!--出库单详情-->
		<el-dialog title="出库单详情" :visible.sync="dialogViewVisible" width="1100px">
            <div id="printTest">
                <el-form :inline="true" class="outViewDialog">
                    <el-form-item label="门店名称">
                        <span class="baseColor">怡菲·小蚂蚁生活馆</span>
                    </el-form-item>
                    <el-form-item label="门店地址">
                        <span class="bold">合肥市政务区国际花都天香苑10栋603</span>
                    </el-form-item>
                    <el-form-item label="门店电话">
                        <span class="bold">18019952019</span>
                    </el-form-item>
                    <el-form-item label="操作人">
                        <span class="bold">熊经理</span>
                    </el-form-item>
                    <el-form-item label="补货时间">
                        <span class="bold">2019-6-14 16:39:44</span>
                    </el-form-item>
                    <el-form-item label="出库单号">
                        <span class="bold">2015986253235442</span>
                    </el-form-item>
                    <el-form-item label="出库状态">
                        <span class="bold">配送中，待签收</span>
                    </el-form-item>
                    <el-form-item label="签收人">
                        <span class="bold">——</span>
                    </el-form-item>
                    <el-form-item label="签收时间">
                        <span class="bold">——</span>
                    </el-form-item>
                    <el-form-item label="物流单号">
                        <span class="bold">340122198603142437</span>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <p class="bold">出库商品</p>
                <el-table :data="productOut" border width="100%">
                    <el-table-column property="name" label="商品名称" width="600" align="center"></el-table-column>
                    <el-table-column property="spec" label="规格/型号" align="center"></el-table-column>
                    <el-table-column label="补货数量" align="center">
                        <template slot-scope="scope">
                            <span class="red01">{{scope.row.num}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <p class="bold mt20">出库备注</p>
                <p class="gray10">一种是买家的留言；一种是卖家客服备注。 买家有时候可能通过留言的方式要求修改收货地址、收货人姓名、电话或者商品更换等信息，这种订单一般建议用户必须审核，通过人工方式对订单进行查看留言内容，以便修改订单。</p>
                <p class="bold mt20">签收备注</p>
                <p class="gray10">一种是买家的留言；一种是卖家客服备注。 买家有时候可能通过留，我有个一个眼神丢失了，下次给补回来。</p>
            </div>

			<div slot="footer" class="dialog-footer">
				<el-button v-print="'#printTest'">打印单据</el-button>
				<el-button @click="dialogViewVisible = false">返 回</el-button>
				<el-button type="primary" @click="outSubmit">生成出库单</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
    import util from '../../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../../api/api';
    export default {
        data() {
            return {
                dialogViewVisible:false,
                productOut:[{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
					spec:'红色/日用',
					num:'20'
				},{
                    name:'草本精华纯棉日用240mm*10片/盒纯天然艾草无添加剂温经暖宫抗菌去异味',
                    spec:'红色夜用',
                    num:'22'
                },{
                    name:'草本精华护垫155mm*15片/盒缓解痛经柔软舒适',
                    spec:'红色/日用',
                    num:'15'
                }],
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
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                total: 0,
                page: 1,
                listLoading: false,
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
            outSubmit(){
                this.dialogViewVisible = false
			},
            handleNodeClick(data) {
                console.log(data);
            },
            goPrime(){
                this.dialogVisible = false
				this.pageType = 'index'
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
			//确定出库
            onSubmit() {
                this.dialogViewVisible = true
            },
        },
        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
            }
        },
        mounted() {
            this.headClass();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                })();
            };
        }
    }

</script>