<template>
	<el-row class="container">
		<!--<el-col :span="24" class="header">-->
			<!--<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">-->
				<!--&lt;!&ndash;{{collapsed?'':sysName}}&ndash;&gt;-->
				<!--<div v-if="collapsed">店</div>-->
				<!--<div v-if="!collapsed"><img src="http://dev.tiaohuo.com/resources/store/images/LOGO.png" /></div>-->
			<!--</el-col>-->
			<!--<el-col :span="6">-->
				<!--<div class="tools" @click.prevent="collapse">-->
					<!--<i class="fa fa-align-justify"></i>-->
				<!--</div>-->
			<!--</el-col>-->
			<!--&lt;!&ndash;<el-col :span="2" class="fr">&ndash;&gt;-->
				<!--&lt;!&ndash;<i class="iconfont iconyoujian1 f22 email"></i>&ndash;&gt;-->
				<!--&lt;!&ndash;<i class="iconfont iconling f24 notice"></i>&ndash;&gt;-->
			<!--&lt;!&ndash;</el-col>&ndash;&gt;-->
			<!--<el-col :span="8" class="userinfo fr">-->
				<!--<i class="iconfont iconyoujian1 f22 email"></i>-->
				<!--<i class="iconfont iconling f24 notice"></i>-->
				<!--<el-dropdown trigger="click">-->
					<!--<span class="el-dropdown-link userinfo-inner"><img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png" class="fl" /> 挑货网测试环境</span>-->
					<!--<el-dropdown-menu slot="dropdown">-->
						<!--<el-dropdown-item class="member_account gray02 tc">-->
							<!--<img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png" class="head"/>-->
							<!--<p class="f16 name">挑货网测试环境</p>-->
							<!--<p class="f12">18650002080</p>-->
						<!--</el-dropdown-item>-->
						<!--<el-dropdown-item class="money clearfix">-->
								<!--<el-col :span="8" class="fl tc">-->
									<!--<p>余额</p>-->
									<!--<p>465.26</p>-->
								<!--</el-col>-->
								<!--<el-col :span="8" class="fl tc">-->
									<!--<p>冻结金额</p>-->
									<!--<p>523.5</p>-->
								<!--</el-col>-->
								<!--<el-col :span="8" class="fl tc">-->
									<!--<p>库存余额</p>-->
									<!--<p>63322.11</p>-->
								<!--</el-col>-->
						<!--</el-dropdown-item>-->
						<!--<el-dropdown-item class="operation tc">-->

							<!--<el-col :span="24">-->
								<!--<el-button type="primary">充值</el-button>-->
								<!--<el-button type="primary">切换店铺</el-button>-->
								<!--<el-button type="primary">提现</el-button>-->
							<!--</el-col>-->
							<!--<el-col :span="24">-->
								<!--<el-button type="danger">入网签约</el-button>-->
								<!--<el-button type="danger">签约查询</el-button>-->
								<!--<el-button type="danger" @click.native="logout">退出登录</el-button>-->
							<!--</el-col>-->

						<!--</el-dropdown-item>-->
					<!--</el-dropdown-menu>-->
				<!--</el-dropdown>-->
			<!--</el-col>-->
		<!--</el-col>-->
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--<div class="member_info">-->
					<!--<div class="clearfix tc collapsed_member" v-if="collapsed">-->
						<!--<el-col :span="24" class="headImg"><img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png"></el-col>-->
					<!--</div>-->
					<!--<div class="clearfix p20" v-if="!collapsed">-->
						<!--<el-col :span="6" class="headImg"><img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png"></el-col>-->
						<!--<el-col :span="18">-->
							<!--<span class="gray02">好的</span>-->
							<!--<span class="f10">-->
								<!--<i class="iconfont iconxin red01"></i>-->
								<!--<i class="iconfont iconxin red01"></i>-->
								<!--<i class="iconfont iconxin red01"></i>-->
								<!--<i class="iconfont iconxin red01"></i>-->
								<!--<i class="iconfont iconxin gray01"></i>-->
							<!--</span>-->
						<!--</el-col>-->
					<!--</div>-->
				<!--</div>-->
				<!--导航菜单-->
				<!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo menu_zhankai" @open="handleopen" @close="handleclose" @select="handleselect"-->
					 <!--unique-opened router v-show="!collapsed" background-color="#545c64"-->
						 <!--text-color="#fff"-->
						 <!--active-text-color="#ffd04b">-->

					<!--<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">-->
						<!--<el-submenu :index="index+''" v-if="!item.leaf">-->
							<!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
							<!--<el-menu-item class="blue01" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i class="iconfont iconyuanquan f14 circle_nav"></i>{{child.name}}</el-menu-item>-->
						<!--</el-submenu>-->
						<!--<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>-->
					<!--</template>-->
				<!--</el-menu>-->
				<!--导航菜单-折叠后-->
				<!--<ul class="el-menu el-menu-vertical-demo collapsed" ref="menuCollapsed">-->
					<!--<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">-->
						<!--<template v-if="!item.leaf">-->
							<!--<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>-->
							<!--<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">-->
								<!--<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>-->
							<!--</ul>-->
						<!--</template>-->
						<!--<template v-else>-->
							<!--<li class="el-submenu">-->
								<!--<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>-->
							<!--</li>-->
						<!--</template>-->
					<!--</li>-->
				<!--</ul>-->

				<ul class="el-menu el-menu-vertical-demo collapsed fl" ref="menuOne">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" :class="navIndex == index?'navOne':''" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i>{{item.name}}</div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" :data-index="index">
                                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index)">{{child.name}}</li>
                            </ul>
						</template>

						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>

				<div class="erjinav fl" ref="menuCollapsed">
					<div v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" :class="navIndex == index ? 'block':'none'">
						<template v-if="!item.leaf">
							<ul class="el-menu submenu" :class="['submenu-hook-'+index, navIndex == index ? 'block':'none']" :data-index="index">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index)">{{child.name}}</li>
							</ul>
						</template>
					</div>
				</div>

			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:true,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
                navIndex:2,
                isShow:''
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
			    var that = this
				// console.log(that.navIndex)
                that.$refs.menuOne.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
				// if(that.navIndex == i){
                 //    this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display='block';
				// }else{
                 //    that.$refs.menuOne.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
				// }

			},
			myclick(path,e,index){
                // $router.push(child.path)
                this.$router.push({
                    path,
                    query: {
                        t: +new Date(), //保证每次点击路由的 query 项都是不一样的，确保会重新刷新 view
						index: + index
                    }
                })
                console.log(e)
				this.navIndex = e.currentTarget.parentElement.getAttribute("data-index")
                console.log('点击：'+e.currentTarget.parentElement.getAttribute("data-index"))

                // e.currentTarget.parentElement.style.display='block'
                console.log('点击：'+e.currentTarget.parentElement.getAttribute("data-index"))

			}

            },
		mounted() {
            // this.isShow = this.$route.name
			console.log(this.$route.query.index)
            if(this.$route.query.index){
                this.navIndex = this.$route.query.index;
            }else{
                this.navIndex = 0;
            }
			var user = sessionStorage.getItem('user');
            // this.navIndex = this.$refs.menuCollapsed.getElementsByClassName('block').prototype("data-index")

			// console.log(this.$refs.menuCollapsed.getElementsByClassName('block'))
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	@import '../styles/color.scss';

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $baseColor;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				/*float: right;*/
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 5px 10px 10px;
						/*float: right;*/
					}
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 110px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				position: relative;
				.el-menu{
					height: 100%;
                    background: #20292D;
				}
				.collapsed{
					width:110px;
					.item{
						/*position: relative;*/
					}
					.submenu{
						position:absolute;
						top:0px;
						left:110px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 260px;
				width: 260px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
	.menu_zhankai{
		width: 100% !important;
	}
	.member_info{
        /*padding: 20px;*/
		background:#20292D;
        span{
            display: block;
        }
	}
	.headImg img{
		width: 80%;
		border-radius: 50%;
	}
    .el-submenu .el-menu{
        background: $white01 !important;
    }
	.el-submenu__title{
		color: #b8c7ce !important;
	}
	.el-menu-item{
		color: $block02 !important;
	}
	.collapsed_member{
		margin: 20px 0;
	}
	.email{
		margin-right: 20px;
	}
	.notice{
		margin-right: 20px;
	}
	.head{
		width: 80px;
		height: 80px;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
	}
	.member_account{
		line-height: 1;
		background: $baseColor;
		padding: 20px;
	}
	.el-dropdown-menu__item:not(.is-disabled):hover{
		color: $gray02;
		background: $baseColor;
	}
	.el-dropdown-menu__item p{
		margin: 0;
		&.name{
			margin: 10px 0;
		 }
	}
	.el-dropdown-menu{
		padding: 0;
		width: 300px;
	}
	.money{
		width: 100%;
		padding: 15px 0;
		line-height: 1.5;
	}
	.money:hover{
		color: $black01 !important;
		background: $white01 !important;
	}

	.operation{
		padding: 0;
		&>div{
			 background: $gray03;
			padding: 0 0 10px;
			&:first-child{
				padding-top: 10px;
			 }
		 }
	}
	.circle_nav{
		margin-right: 5px;
	}
	.is-active{
		background: #f2f2f2;
	}
	.el-submenu.is-active .el-submenu__title{
		border: 2px solid red !important;
		background: yellow !important;
	}
	.container .main aside .collapsed .submenu{
		position: absolute;
		left: 110px;
		top: 0;
		height: 100%;
		background: red;
		color: #fff;
	}
	.erjinav{
		width: 140px;
		height: 100%;
		background: #fff;
		border-right: 10px solid #f2f2f2;
	}
	.erjinav .el-submenu{
		/*width: 100%;*/
		height: 100%;
		z-index: 999;
	}
	.navOne{
		color: $white01 !important;
		background: $baseColor !important;
	}
	.block{
		display: block !important;
	}
	.none{
		display: none !important;
	}
	.el-submenu .el-menu-item{
		width: 140px !important;
		min-width: 0 !important;
	}
	.el-submenu .el-menu-item:hover
	{
		color: $baseColor!important;
		background: #fff !important;
	}
</style>