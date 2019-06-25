<template>
	<el-container>
		<el-aside class="menu clearfix" :class="[navIndex==0?'width90':'21',collapsed?'menu-collapsed':'menu-expanded']">
			<div class="leftNav fl">
				<el-dropdown trigger="hover">
					<div class="el-dropdown-link tenantLogo tc"><img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png"/></div>
					<el-dropdown-menu slot="dropdown" class="operation">
						<el-dropdown-item class="member_account weui-cell weui-cell_access">
							<div class="weui-cell__bd">
								<p>来一架</p>
								<p>+86-15650002080</p>
							</div>
							<div class="weui-cell__ft"></div>
						</el-dropdown-item>
						<el-dropdown-item class="member_account weui-cell weui-cell_access">
							<div class="weui-cell__bd">切换店铺</div>
							<div class="weui-cell__ft"></div>
						</el-dropdown-item>
						<el-dropdown-item class="member_account singOut weui-cell">
							<div class="weui-cell__bd">退出登录</div>
							<div class="weui-cell__ft"><i class="iconfont icontuichu f26"></i></div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<ul class="el-menu el-menu-vertical-demo collapsed oneMenu fl" ref="menuOne">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" :class="navIndex == index?'navOne':''" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i>{{item.name}}</div>
							<ul class="el-menu submenu childenMenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" :data-index="index" style="display: none;">

								<div class="el-submenu__title erji_title">{{item.name}}</div>
								<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;">
									<div class="three_title">{{child.name}}</div>
									<ul class="threeMenu" v-if="!child.leaf" :data-index="index">
										<li v-for="three in child.children" :key="three.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==three.path?'is-active':''" @click="myclick(three.path,$event,index)">{{three.name}}</li>
									</ul>
								</li>
								<li v-for="child in item.children" v-if="!child.hidden && child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index)">{{child.name}}</li>

							</ul>
						</template>

						<template v-else>
							<li class="el-submenu" :data-index="index">
								<div class="el-submenu__title" :data-index="index" style="padding-left: 10px;" :class="navIndex == index?'navOne':''" @click="myclick(item.children[0].path,$event,index)"><i :class="item.iconCls"></i>{{item.children[0].name}}</div>
							</li>
						</template>
					</li>
				</ul>
			</div>
			<div class="erjinav fl" ref="menuCollapsed" v-if="navIndex!=0">
				<div v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :data-value="index" class="el-submenu item" :class="navIndex == index ? 'block':'none'">
					<template v-if="!item.leaf">
						<ul class="el-menu submenu childenMenu" :class="['submenu-hook-'+index, navIndex == index ? 'block':'none']" :data-index="index">
							<!--一级导航-->
							<li class="el-submenu__title erji_title">{{item.name}}</li>
							<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;">
								<!--二级导航-->
								<div class="three_title">{{child.name}}<i class="el-icon-arrow-down"></i></div>
								<!--三级导航-->
								<ul class="threeMenu" v-if="!child.leaf" :data-index="index">
									<li v-for="three in child.children" :data-id="three.path" :key="three.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==three.path?'is-active':''" @click="myclick(three.path,$event,index)">{{three.name}}</li>
								</ul>
							</li>
							<li v-for="child in item.children" v-if="!child.hidden && child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index)">{{child.name}}</li>
						</ul>
					</template>
				</div>
			</div>
		</el-aside>
		<el-container>
			<el-main>
				<div class="grid-content">
					<el-row>
						<el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
							<el-col :span="24" class="breadcrumb-container">
								<el-col :span="24" class="home_tit clearfix" v-if="navIndex == 0">
									<strong class="title fl">测试环境</strong>
									<el-dropdown trigger="hover" class="fr user_information">
										<div class="el-dropdown-link tenantLogo weui-cell weui-cell_access">
											<div class="weui-cell__hd"><img src="http://cdn.tiaohuo.com/upload/image/201801/2e1e6d4a-2cb5-496d-97c2-bd55baac84e1.png"/></div>
											<div class="weui-cell__bd">+86-15650002080</div>
											<div class="weui-cell__ft"></div>
										</div>
										<el-dropdown-menu slot="dropdown" class="operation">
											<el-dropdown-item class="member_account weui-cell weui-cell_access">
												<div class="weui-cell__bd">
													<p>来一架</p>
													<p>+86-15650002080</p>
												</div>
												<div class="weui-cell__ft"></div>
											</el-dropdown-item>
											<el-dropdown-item class="member_account weui-cell weui-cell_access">
												<div class="weui-cell__bd">切换店铺</div>
												<div class="weui-cell__ft"></div>
											</el-dropdown-item>
											<el-dropdown-item class="member_account singOut weui-cell">
												<div class="weui-cell__bd">退出登录</div>
												<div class="weui-cell__ft"><i class="iconfont icontuichu f26"></i></div>
											</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</el-col>
								<strong class="title" v-else>{{$route.name}}</strong>
								<!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
								<!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
								<!--{{ item.name }}-->
								<!--</el-breadcrumb-item>-->
								<!--</el-breadcrumb>-->
							</el-col>
							<el-col :span="24" class="content-wrapper" ref="table" :style="contentStyleObj">
								<transition name="fade" mode="out-in">
									<router-view></router-view>
								</transition>
							</el-col>
						</el-col>
						<el-col :lg="4" :xl="4" class="technology hidden-md-and-down">
							<div class="weui-cell weui-cell_access">
								<div class="weui-cell__bd">技术支持</div>
								<div class="weui-cell__ft"></div>
							</div>
							<div class="technology_cont">帮助中心</div>
						</el-col>
					</el-row>
				</div>
				<el-footer class="gray11 tc"><img src="/static/include/technical_support.png"/></el-footer>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
    export default {
        data() {
            return {
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
                isShow:'',
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                contentStyleObj:{
                    height:''
                }
            }
        },
        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.contentStyleObj.height = window.innerHeight - this.$refs.table.$el.offsetTop+'px';
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
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
                that.$refs.menuOne.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
                console.log('鼠标指向：'+i)
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
                console.log('点击：'+e.currentTarget.parentElement.getAttribute("data-index"))

            }

        },
        mounted() {
            // this.isShow = this.$route.name
            console.log(this.$route.query.index)
            if(this.$route.query.index){
                this.navIndex = this.$route.query.index;
            }else{
                this.navIndex = 2;
            }
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

            this.contentStyleObj.height = window.innerHeight - this.$refs.table.$el.offsetTop - 60 + 'px';
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                    console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>
