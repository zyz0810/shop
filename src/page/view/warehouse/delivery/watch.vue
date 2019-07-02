<template>
	<div class="warehouse" id="printTest" ref="print">
		<div class="printView">
			<el-form :inline="true" class="outViewDialog">
				<el-form-item label="门店/仓库">
					<span class="baseColor bold">怡菲·小蚂蚁生活馆</span>
				</el-form-item>
				<el-form-item label="门店地址">
					<span class="bold">合肥市政务区国际花都天香苑10栋603</span>
				</el-form-item>
				<el-form-item label="门店电话">
					<span class="bold">18019952019</span>
				</el-form-item>
				<el-form-item label="出库类型">
					<span class="bold">门店补货</span>
				</el-form-item>
				<el-form-item label="单据状态">
					<span class="bold">已签收完成</span>
				</el-form-item>
				<el-form-item label="物流配送">
					<span class="bold">2015986253235442</span>
				</el-form-item>
				<el-form-item label="制单时间">
					<span class="bold">2019-6-14 16:39:44</span>
				</el-form-item>
				<el-form-item label="出库单号">
					<span class="bold">2015986253235442</span>
				</el-form-item>
				<el-form-item label="操作人">
					<span class="bold">熊经理</span>
				</el-form-item>
				<el-form-item label="签收人">
					<span class="bold">18019952019</span>
				</el-form-item>
				<el-form-item label="签收时间">
					<span class="bold">2019-6-14 16:39:44</span>
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
		<div class="tc m18 no-print">
			<!--<el-button type="primary" v-print="'#printTest'">打印单据</el-button>-->
			<el-button type="primary" @click="printCont()">打印单据</el-button>
			<el-button @click="$router.back(-1)">返 回</el-button>
		</div>
	</div>
</template>

<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../api/api';
    export default {
        data() {
            return {
                size:this.GLOBAL.size,
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
                total: 0,
                page: 1,
                listLoading: false,

            }
        },
        methods: {
			printCont(){
                this.$print(this.$refs.print)
			}
        },
        mounted() {

        }
    }

</script>