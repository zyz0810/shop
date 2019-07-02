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
				<el-table-column prop="name3" label="库存单位"></el-table-column>
				<!--<el-table-column  type="index"></el-table-column>-->
				<el-table-column prop="name4" label="库存数"></el-table-column>
				<el-table-column label="期初成本（元）">
					<template slot-scope="scope">
						<span>{{ scope.row.name5 | money}}</span>
						<!--<el-input :size="size" type="number" v-model="scope.row.name5"></el-input>-->
					</template>
				</el-table-column>
				<el-table-column label="总成本（元）">
					<template slot-scope="scope">
						<span>{{ scope.row.name6 | money}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200">
					<template slot-scope="scope">
						<el-button :size="size" type="text" @click="dialogDistribute = true">库存分布</el-button>
						<el-button :size="size" type="text" @click="turnover(scope.$index)">库存流水</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--库存分布-->
		<el-dialog title="库存分布" :visible.sync="dialogDistribute">
			<el-row class="dialogProduct mb20">
				<el-col :span="10">
					<div class="productImg fl"><img src="http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg"></div>
					<div class="productTxt fl">
						<p class="f14">黄山奇石</p>
						<p class="f12 gray11">002</p>
					</div>
				</el-col>
				<el-col :span="7">单位：袋</el-col>
				<el-col :span="7"><el-checkbox v-model="checked" @change="distribute">仅显示有库存</el-checkbox></el-col>
			</el-row>
			<el-table :data="distributeData" :header-row-class-name="headClass">
				<el-table-column property="name" label="仓库/门店名称"></el-table-column>
				<el-table-column property="stock1" label="实物库存"></el-table-column>
				<el-table-column property="stock2" label="占用库存"></el-table-column>
				<el-table-column property="stock3" label="可售库存"></el-table-column>
				<el-table-column property="stock4" label="在途库存"></el-table-column>
				<el-table-column property="cost" label="平均成本（元）"></el-table-column>
				<el-table-column property="costSum" label="总成本（元）"></el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :total="6" class="tr mt20"></el-pagination>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogDistribute = false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../api/api';
    export default {
        data() {
            return {
                checked:false,
                dialogDistribute:false,
                size:this.GLOBAL.size,
                condition: {
                    warehouse:'',
                    category: '',
                    product: ''
                },
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                productSet:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'55',
                    name5:'10.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'5656',
                    name5:'15.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'547',
                    name5:'20.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'87',
                    name5:'5.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'56',
                    name5:'10.00',
                    name6:'2019.00'
                },],
                total: 0,
                page: 1,
                listLoading: false,
                pageType:'couponList',
                distributeData:[{
                    name:'测试仓库1',
					stock1:'190',
                    stock2:'0',
                    stock3:'190',
                    stock4:'0',
					cost:'382',
					costSum:'72580'
				},{
                    name:'测试仓库2',
                    stock1:'0',
                    stock2:'0',
                    stock3:'0',
                    stock4:'0',
                    cost:'382',
                    costSum:'3820'
				}],
                distributeAllData:[{
                    name:'测试仓库1',
                    stock1:'190',
                    stock2:'0',
                    stock3:'190',
                    stock4:'0',
                    cost:'382',
                    costSum:'72580'
                },{
                    name:'测试仓库2',
                    stock1:'0',
                    stock2:'0',
                    stock3:'0',
                    stock4:'0',
                    cost:'382',
                    costSum:'3820'
                }]
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
            // 库存分布
            distribute(val){
                var that = this
				if(val == true){
                    let newArr = [];
                    that.distributeData.forEach(function (value,key,arr) {
                        if(value.stock1 != '0' || value.stock2 != '0' || value.stock3 != '0' || value.stock4 != '0'){
                            newArr.push(value)
                        }
                    });
                    that.distributeData = newArr;
				}else{
                    that.distributeData = that.distributeAllData;
				}
			},
            //库存流水
            turnover(){
                this.$router.push({
                    path:'/warehouse/index/turnover',
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