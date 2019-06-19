<template>
	<div class="warehouse">
		<div v-if="pageType == 'manage'">
			<div class="out_btn">
				<el-button type="primary" :size="size" @click="onCreate">新建仓库</el-button>
			</div>
			<!--列表-->
			<el-table stripe :data="warehouseList" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;"  :header-row-class-name="headClass" :height="tableHeight">
				<!--<el-table-column type="selection" fixed width="55"></el-table-column>-->
				<el-table-column prop="name0" label="仓库编号"></el-table-column>
				<el-table-column prop="name1" label="仓库名称" ></el-table-column>
				<el-table-column prop="name2" label="联系人"></el-table-column>
				<el-table-column prop="name3" label="联系方式"></el-table-column>
				<el-table-column prop="name4" width="360" label="仓库地址"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span v-if="scope.row.name5 == true">启用</span>
						<span class="red01" v-else>已禁用</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button :size="size" type="text" @click="onCreate">编辑</el-button>
						<el-button v-if="scope.row.name5 == true" :size="size" type="text" class="red01" @click="handleProhibit($event,scope.$index)">禁用</el-button>
						<el-button v-else :size="size" type="text" @click="start($event,scope.$index)">启用</el-button>
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

		<el-dialog title="仓库创建成功" :visible.sync="dialogVisible" width="30%">
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
                warehouseList: [{
                    name0:'CK001',
					name1:'国际花都3期仓库',
                    name2:'1店店长',
                    name3:'18019952019',
                    name4:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
                    name5:true
				},{
                    name0:'CK001',
                    name1:'国际花都3期仓库',
                    name2:'1店店长',
                    name3:'18019952019',
                    name4:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
                    name5:true
                },{
                    name0:'CK001',
                    name1:'国际花都3期仓库',
                    name2:'1店店长',
                    name3:'18019952019',
                    name4:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
                    name5:true
                },{
                    name0:'CK001',
                    name1:'国际花都3期仓库',
                    name2:'1店店长',
                    name3:'18019952019',
                    name4:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
                    name5:false
                },{
                    name0:'CK001',
                    name1:'国际花都3期仓库',
                    name2:'1店店长',
                    name3:'18019952019',
                    name4:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
                    name5:true
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
            start(val,index){
                const h = this.$createElement;
                this.$msgbox({
                    title: '仓库创建成功',
                    message: h('p', null, [
                        h('span', null, '确定启用'),
                        h('span', {style: 'color: #409EFF' }, ' 南二环 '),
                        h('span', null, '仓库？'),
                    ]),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            this.warehouseList[index].name5 = true
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {

                });







                // this.$confirm('确定启用'+ '南二环' +'吗?', '仓库创建成功', {
                //     type: 'warning'
                // }).then(() => {
                //     // this.listLoading = true;
                //     this.warehouseList[index].name5 = false
                //     //NProgress.start();
                //     // let para = { id: row.id };
                //     // removeUser(para).then((res) => {
                //     //     this.listLoading = false;
                //     //     //NProgress.done();
                //     //     this.$message({
                //     //         message: '删除成功',
                //     //         type: 'success'
                //     //     });
                //     //     // this.getUsers();
                //     // });
                // }).catch(() => {
                //
                // });

			},
            //删除
            handleProhibit: function (val,index) {
                // this.$confirm('确定禁用'+ '南二环' +'吗?', '仓库创建成功', {
                //     type: 'warning'
                // }).then(() => {
                //     // this.listLoading = true;
					// this.warehouseList[index].name5 = false
                //     NProgress.start();
                //     let para = { id: row.id };
                //     removeUser(para).then((res) => {
                //         this.listLoading = false;
                //         //NProgress.done();
                //         this.$message({
                //             message: '删除成功',
                //             type: 'success'
                //         });
                //         // this.getUsers();
                //     });
                // }).catch(() => {
                //
                // });

                const h = this.$createElement;
                this.$msgbox({
                    title: '仓库创建成功',
                    message: h('p', null, [
                        h('span', null, '确定禁用'),
                        h('span', {style: 'color: #409EFF' }, ' 南二环 '),
                        h('span', null, '仓库？'),
                    ]),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            this.warehouseList[index].name5 = false
                            done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {

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
			this.headClass()
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