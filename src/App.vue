<template>
	<div id="app">
		<el-container>
			<el-aside class="menu clearfix" :class="navLeaf==1?'width90':''">
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
					<ul class="el-menu el-menu-vertical-demo oneMenu fl" ref="menuOne">
						<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
							<template v-if="!item.leaf">
								<div class="el-submenu__title" :class="navIndex == index?'navOne':''" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i>{{item.name}}</div>
								<ul class="el-menu submenu childenMenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" :data-index="index" style="display: none;">

									<div class="el-submenu__title erji_title">{{item.name}}</div>
									<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" class="el-menu-item" style="padding-left: 20px;">
										<div class="three_title">{{child.name}}</div>
										<ul class="threeMenu" v-if="!child.leaf" :data-index="index">
											<li v-for="three in child.children" :key="three.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==three.path?'is-active':''" @click="myclick(three.path,$event,index,'0')">{{three.name}}</li>
										</ul>
									</li>
									<li v-for="child in item.children" v-if="!child.hidden && child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index,'0')">{{child.name}}</li>

								</ul>
							</template>

							<template v-else>
								<li class="el-submenu" :data-index="index">
						<!--<div class="el-submenu__title" :data-index="index" style="padding-left: 10px;" :class="navIndex == index?'navOne':''" @click="myclick(item.children[0].path,$event,index)"><i :class="item.iconCls"></i>{{item.children[0].name}}</div>-->
									<div class="el-submenu__title" :data-index="index" style="padding-left: 10px;" :class="navIndex == index?'navOne':''" :data-leaf="item.leaf" @click="myclick(item.path,$event,index,item.leaf)"><i :class="item.iconCls"></i>{{item.name}}</div>
								</li>
							</template>
						</li>
					</ul>
				</div>
				<div class="erjinav fl" ref="menuCollapsed" v-if="navLeaf != 1">

					<div v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :data-value="index" class="el-submenu item" :class="navIndex == index ? 'block':'none'">
						<template v-if="!item.leaf">

							<ul class="el-menu submenu childenMenu" :class="['submenu-hook-'+index, navIndex == index ? 'block':'none']" :data-index="index">

								<li class="el-submenu__title erji_title" @click="showHide(index)">{{item.name}}</li>=
								<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;">
									<div class="three_title" @click="show(index,)">{{child.name}}<i class="el-icon-arrow-down"></i></div>
									<ul class="threeMenu" :data-index="index">
										<li v-for="three in child.children" :key="three.path" v-if="!three.leaf && !three.hidden" class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==three.path || pageActive==child.path ? 'is-active':''" @click="myclick(three.path,$event,index,'0')">{{three.name}}</li>
									</ul>
								</li>
								<!--<el-menu style="padding: 0;" default-openeds="['1',0']">-->
									<!--<el-submenu v-for="(child,idx) in item.children" :index="idx" v-if="!child.hidden && !child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;padding: 0;color: #323233 !important">-->
										<!--<template slot="title" class="three_title" style="padding: 0 !important;">{{child.name}}</template>-->
										<!--<template class="threeMenu" v-if="!child.leaf" :data-index="index">-->
											<!--<el-menu-item v-for="three in child.children" :key="three.path" class="el-menu-item" style="padding-left: 30px;" :class="$route.path==three.path?'is-active':''" @click="myclick(three.path,$event,index,'0')">{{three.name}}</el-menu-item>-->
										<!--</template>-->
									<!--</el-submenu>-->
								<!--</el-menu>-->


								<li v-for="child in item.children" v-if="!child.hidden && child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==child.path || pageActive==child.path ? 'is-active':''" @click="myclick(child.path,$event,index,'0')">{{child.name}}</li>
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
					<!--<el-footer class="gray11 tc"><img src="/static/include/technical_support.png"/></el-footer>-->
				</el-main>
			</el-container>
		</el-container>
		<!--<transition name="fade" mode="out-in">-->
			<!--<router-view></router-view>-->
		<!--</transition>-->
	</div>
</template>

<script>
    export default {
        name:'app',
        data() {
            return {
                sysUserName: '',
                sysUserAvatar: '',
                navIndex:0,
                // leaf:1,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                contentStyleObj:{
                    height:''
                },
                navLeaf:0,
				pageActive:''
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
            showHide(index){    //点击展开收起
                let contant = document.getElementsByClassName('contant')[index];    //这里我们通过参数index来让浏览器判断你点击的是哪一个列表
                let height = contant.getBoundingClientRect().height;    //获取页面元素的当前高度
                document.getElementsByTagName('i')[index].style.transform = !!height?'rotateX(0deg)':'rotateX(180deg)';
                if (!!height) {
                    contant.style.height = height + 'px';
                    let f = document.body.offsetHeight; //强制相应dom重绘，使最新的样式得到应用
                    contant.style.height = '0px';
                } else {
                    contant.style.height = 'auto';
                    height = contant.getBoundingClientRect().height;
                    contant.style.height = '0';
                    let f = document.body.offsetHeight;
                    contant.style.height = height + 'px';
                }
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
            showMenu(i,status){
                var that = this
                that.$refs.menuOne.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
                console.log('鼠标指向：'+i)
            },
            myclick(path,e,index,leaf){
                // $router.push(child.path)
                this.$router.push({
                    path,
                    query: {
                        // t: +new Date(), //保证每次点击路由的 query 项都是不一样的，确保会重新刷新 view
                        index: + index,
                        leaf: + leaf
                    }
                });
                console.log(leaf);
                this.navIndex = e.currentTarget.parentElement.getAttribute("data-index");
				this.navLeaf = leaf;
                console.log('点击：'+e.currentTarget.parentElement.getAttribute("data-index"))
            }

        },
        mounted() {
            console.log(this.$route.query.index)
            if(this.$route.query.index){
                this.navIndex = this.$route.query.index;
            }else{
                this.navIndex = 0;
            }
            if(this.$route.query.leaf){
                this.navLeaf = this.$route.query.leaf;
            }else{
                this.navLeaf = 1;
            }
            //获取page，选中相应的nav（编辑等页面需要）
            if(this.$route.query.pageActive){
                this.pageActive = this.$route.query.pageActive;
            }else{
                this.pageActive = '';
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
                    // console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}
.menu.width90{
	width: 90px !important;
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.el-submenu .el-menu{
	background: #28353A !important;
}


</style>