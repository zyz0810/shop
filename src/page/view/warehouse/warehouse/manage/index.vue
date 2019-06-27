<template>
	<div class="warehouse">

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
						<el-button :size="size" type="text" @click="onEdit($event,scope.$index)">编辑</el-button>
						<el-button v-if="scope.row.name5 == true" :size="size" type="text" class="red01" @click="handleProhibit($event,scope.$index)">禁用</el-button>
						<el-button v-else :size="size" type="text" @click="start($event,scope.$index)">启用</el-button>
					</template>
				</el-table-column>
			</el-table>



	</div>
</template>

<script>
    import util from '../../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../../api/api';
    import city from './../../../../../components/city.vue';
    export default {
        data() {
            return {


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
                this.$router.push({
                    path:'/warehouse/warehouse/add',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
                });
			},
            onEdit(val,index){
                console.log(val)
				console.log(index)
                this.$router.push({
                    path:'/warehouse/warehouse/edit',
                    query:{
                        index:'4',
                        leaf:'0',
						id:index
                    }
                });
			},
			//启用
            start(val,index) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '仓库创建成功',
                    message: h('p', null, [
                        h('span', null, '确定启用'),
                        h('span', {style: 'color: #409EFF'}, ' 南二环 '),
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
            },
            //禁用
            handleProhibit: function (val,index) {
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