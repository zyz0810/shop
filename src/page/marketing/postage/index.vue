<template>
	<div class="postage">
		<div v-if="pageType == 'index'" class="tc">

			<div v-if="form.money">
				<p>活动正在进行中</p>
				<p class="f28">消费满<span>{{form.money}}</span>元包邮</p>
			</div>
			<div v-else>
				<p class="f28">暂无活动</p>
			</div>
			<el-divider></el-divider>
			<p>包邮只对自营商品生效，分销商品只能由供应商设置。</p>
			<el-divider></el-divider>
			<p>
				<el-button :size="size" @click="edit">修 改</el-button>
				<el-button :size="size" type="danger" @click="del">删 除</el-button>
				<el-button :size="size" type="primary">分 享</el-button>
			</p>
		</div>

		<div v-if="pageType == 'edit'">
			<el-form ref="form" :model="form" label-width="150px">
				<el-form-item label="消费满">
					<el-input v-model="form.money" :size="size" class="inputOne" placeholder="请输入内容"></el-input>
					<p class="f20">满包邮活动规则</p>
					<ul class="f14 rule">
						<li>买家消费满足你设置的金额，则订单包邮</li>
						<li>如果你同时设置了一下活动，买家购买时可以同时享受优惠，包括：店铺优惠券，限时折扣。</li>
					</ul>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :size="size" @click="submit">确 定</el-button>
				</el-form-item>
			</el-form>
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
                form: {
                    money:'1',
                },
                pageType:'index',

            }
        },


        methods: {
            edit(){
                this.pageType = 'edit'
			},
			del(){


                this.$confirm('确定删除此活动?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.form.money = ''
                }).catch(() => {

                });

			},
            submit(){
                this.pageType = 'index'
				// this.form = 'edit'
			},
        },
        mounted() {

        }
    }

</script>