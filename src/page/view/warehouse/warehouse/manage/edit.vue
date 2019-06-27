<template>
	<div class="warehouse">
		<p>基本信息</p>
		<el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="150px"
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
				<el-button :size="size" @click.native.prevent @click="$router.back(-1)">取消</el-button>
			</el-form-item>
		</el-form>
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
    import util from '../../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../../api/api';
    import city from './../../../../../components/city.vue';
    export default {
        data() {
            return {
                autosize:{
                    minRows: 2, maxRows: 6
				},
                form:{
                    name:'国际花都3期仓库',
					num:'',
					area:'安徽省合肥市庐阳区',
					address:'安徽省合肥市庐阳区逍遥津街道新华巷合肥中心',
					person:'1店店长',
                    phone:'18019952019',
					desc:''
				},
                size:this.GLOBAL.size,
                dialogVisible:false
            }
        },
        components:{
            city,
        },
        methods: {
            onSubmit() {
                this.$validator.validateAll().then((result) => {
                    if(result == true){
                        this.dialogVisible = true
					}
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
        },
        mounted() {

        }
    }
</script>