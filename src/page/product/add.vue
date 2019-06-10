<template>
	<div class="addProduct">
		<el-steps :active="active" class="stepProduct" simple>
			<el-step title="1.编辑商品分类信息"></el-step>
			<el-step title="2.编辑商品信息"></el-step>
			<el-step title="3.编辑商品详情"></el-step>
		</el-steps>

		<el-form ref="form" :model="form" label-width="150px" hideRequiredSterisk="true" l>
			<div class="product_tit">类目信息</div>
			<el-form-item required label="选择常用类目">
				<el-select v-model="value" placeholder="选择常用类目">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-select>
				<el-button type="danger">清空数据</el-button>
			</el-form-item>
			<el-form-item label="您当前选择的是">
				<el-input v-model="form.category" class="inputOne"></el-input>
				<el-button>加入常用类目</el-button>
			</el-form-item>
			<el-form-item label="选择类目">
				<el-row :gutter="10">
					<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
						<div>
							<el-autocomplete v-model="form.categoryOneSearch" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
							<el-button class="categorySearch">搜索</el-button>
						</div>
						<ul class="categoryUl">
							<!--<li @click="categoryOne">潮流女装</li>-->
							<!--<li @click="categoryOne">潮流女装</li>-->
							<!--<li @click="categoryOne">潮流女装</li>-->
							<!--<li @click="categoryOne">潮流女装</li>-->
							<!--<li @click="categoryOne">潮流女装</li>-->
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
						</ul>
					</el-col>
					<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
						<div>
							<el-autocomplete v-model="form.categoryTwoSearch" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
							<el-button class="categorySearch">搜索</el-button>
						</div>
						<ul class="categoryUl">
							<li>男装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
						</ul>
					</el-col>
					<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
						<div>
							<el-autocomplete v-model="form.categoryThreeSearch" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
							<el-button class="categorySearch">搜索</el-button>
						</div>
						<ul class="categoryUl">
							<li>男装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
							<li>潮流女装</li>
						</ul>
					</el-col>
				</el-row>
			</el-form-item>
			<div class="product_tit">基本信息</div>
			<el-form-item label="商品类目" class="intro">
				<p>潮流女装/女士内衣/保暖内衣</p>
				<p class="gray11">(商品上架后不可修改，请谨慎选择)</p>
			</el-form-item>
			<el-form-item label="条形码">
				<el-input v-model="form.code" class="inputOne"></el-input>
			</el-form-item>
			<el-form-item label="名称">
				<el-input v-model="form.name" class="inputOne"></el-input>
			</el-form-item>
			<el-form-item label="单位">
				<el-input v-model="form.unit" class="inputOne"></el-input>
				<span>计量单位，例：盒、件、箱、瓶。</span>
			</el-form-item>
			<div class="product_tit">分润信息</div>
			<el-form-item label="商品分润">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="使用分润模板" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="推广佣金率">
				<el-input v-model="form.unit" class="inputOne"></el-input>
				<span>%</span>
			</el-form-item>
			<el-form-item label="返利比例">
				<el-input v-model="form.unit" class="inputOne"></el-input>
				<span>%</span>
			</el-form-item>
			<el-form-item label="发展者佣金率">
				<el-input v-model="form.unit" class="inputOne"></el-input>
				<span>%</span>
			</el-form-item>
			<el-form-item label="换算规则">
				<span>1=</span>
				<el-input v-model="form.unit" class="" style="width: 50px"></el-input>
				<el-input v-model="form.unit" class="" style="width: 50px"></el-input>
				<el-button type="primary">清空</el-button>
			</el-form-item>
			<div class="product_tit">价格库存</div>
			<el-form-item label="商品规格">
				<el-radio-group v-model="form.resource">
					<el-radio label="统一规格"></el-radio>
					<el-radio label="多规格"></el-radio>
				</el-radio-group>
				<div class="Specifications">
					<el-button>添加规格项目</el-button>
					<el-form-item label="规格名">
						<el-input v-model="form.unit" class="" style="width: 50px"></el-input>
						<span>添加规格图片</span>
					</el-form-item>
				</div>

			</el-form-item>






			<el-form-item label="启用会员卡">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="启用会员卡" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="商品图片">
				<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>

			<!--<div class="setMore">-->
				<!--<p>更多设置</p>-->
				<!--<el-form-item label="好的的打">-->
					<!--<el-input v-model="form.unit" class="" style="width: 50px"></el-input>-->
				<!--</el-form-item>-->
			<!--</div>-->




			<el-collapse class="setMore bornone" v-model="activeNames" @change="handleChange">
				<el-collapse-item title="更多设置" name="1" class="baseColor">
					<el-form-item label="推广佣金率">
						<el-input v-model="form.unit" class="inputOne"></el-input>
						<span>%</span>
					</el-form-item>
					<el-form-item label="返利比例">
						<el-input v-model="form.unit" class="inputOne"></el-input>
						<span>%</span>
					</el-form-item>
				</el-collapse-item>
			</el-collapse>






			<el-form-item>
				<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
			</el-form-item>

		</el-form>
	</div>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
				form:{
                    category:'',
                    categoryOneSearch:'',
                    categoryTwoSearch:'',
                    categoryThreeSearch:''
				},
                restaurants: [],
                state: '',
                timeout:  null,
                active: 0,
                activeNames: ['1'],
                dialogImageUrl: '',
                dialogVisible: false
			}
		},
		methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(val) {
                console.log(val);
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                    { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                    { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                    { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                    { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                    { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                    { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                    { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                    { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                    { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                    { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                    { "value": "钱记", "address": "上海市长宁区天山西路" },
                    { "value": "壹杯加", "address": "上海市长宁区通协路" },
                    { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                    { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                    { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                    { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                    { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                    { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                    { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                    { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                    { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                    { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                    { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                    { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                    { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                    { "value": "浏阳蒸菜", "address": "天山西路430号" },
                    { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                    { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                    { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                    { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                    { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                    { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                    { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                    { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
		},
		mounted() {
            this.restaurants = this.loadAll();
		}
	}

</script>

<style lang="scss">
	@import '../../styles/color.scss';
	@import '../../styles/common.scss';
	.addProduct{
		padding: 10px;
		background: $white01;
	}

	.addProduct{
		.el-form{
			margin-top: 30px;
		}
	}
	.categoryUl{
		padding: 0 10px;
		margin: 10px auto;
		height: 200px;
		border: 1px solid #f2f2f2;
		line-height: 30px;
		li{
			cursor: pointer;
		}
	}
	.intro{
		.el-form-item__content{
			line-height: 1;
		}

	}
	.product_tit{
		padding: 10px;
		margin: 10px 0;
		background: $gray06;
	}
	.setMore {
		padding: 0 20px;
		.el-collapse-item__header{
			color: $baseColor;
		}
	}
	.stepProduct{}
</style>