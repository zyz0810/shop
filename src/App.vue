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
								<div class="el-submenu__title" :class="navIndex == index?'navOne':''" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" @click="clickMenu(index,$event,'0')"><i :class="item.iconCls"></i>{{item.name}}</div>
								<ul class="el-menu submenu childenMenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" :data-index="index" style="display: none;">

									<div class="el-submenu__title erji_title">{{item.name}}</div>
									<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" class="el-menu-item" style="padding-left: 20px;">
										<div class="three_title">{{child.name}}</div>
										<ul class="threeMenu" v-if="!child.leaf" :data-index="index">
											<li v-for="three in child.children" :key="three.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==three.path?'is-active':''" @click="myclick(three.path,$event,index,'0','')">{{three.name}}</li>
										</ul>
									</li>
									<li v-for="child in item.children" v-if="!child.hidden && child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :class="$route.path==child.path?'is-active':''" @click="myclick(child.path,$event,index,'0','')">{{child.name}}</li>

								</ul>
							</template>

							<template v-else>
								<li class="el-submenu" :data-index="index">
						<!--<div class="el-submenu__title" :data-index="index" style="padding-left: 10px;" :class="navIndex == index?'navOne':''" @click="myclick(item.children[0].path,$event,index)"><i :class="item.iconCls"></i>{{item.children[0].name}}</div>-->
									<div class="el-submenu__title" :data-index="index" style="padding-left: 10px;" :class="navIndex == index?'navOne':''" :data-leaf="item.leaf" @click="myclick(item.path,$event,index,item.leaf,'')"><i :class="item.iconCls"></i>{{item.name}}</div>
								</li>
							</template>
						</li>
					</ul>
				</div>
				<div class="erjinav fl" ref="menuCollapsed" v-if="navLeaf != 1">

					<div v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :data-value="index" class="el-submenu item" :class="navIndex == index ? 'block':'none'">
						<template v-if="!item.leaf">
							<ul class="el-menu submenu childenMenu" :class="['submenu-hook-'+index, navIndex == index ? 'block':'none']" :data-index="index">
								<li class="el-submenu__title erji_title" @click="showHide(index)">{{item.name}}</li>
								<li v-for="child in item.children" v-if="!child.hidden && !child.leaf" :key="child.path" class="el-menu-item" style="padding-left: 20px;">
									<div class="three_title" @click="show(index,)">{{child.name}}<i class="el-icon-arrow-down"></i></div>
									<ul class="threeMenu" :data-index="index">
										<!--<li v-for="three in child.children" :key="three.path" v-if="!three.leaf && !three.hidden" class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==three.path || pageActive==child.path ? 'is-active':''" @click="myclick(three.path,$event,index,'0','')">{{three.name}}</li>-->
										<li v-for="three in child.children" :key="three.path" v-if="!three.leaf && !three.hidden" class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==three.path || pageActive==child.path ? 'is-active':''">
											<router-link :to="{path:three.path, query:{index:index,leaf:'0'}}">{{three.name}}</router-link>
										</li>
									</ul>
								</li>
								<li class="el-menu-item" v-for="(child,childIndex) in item.children" v-if="!child.hidden && child.leaf" :key="child.path">
									<router-link :to="{path:child.path, query:{index:index,leaf:'0'}}">{{child.name}}</router-link>
								</li>
								<!--<ul v-for="(child,childIndex) in item.children" v-if="!child.hidden && child.leaf" :key="child.path" :data-index="index">-->
									<!--<li class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==child.path || childIndex == cIndex ? 'is-active':''" @click="myclick(child.path,$event,index,'0',childIndex)">{{child.name}}</li>-->
									<!--<li class="el-menu-item" v-for="(child,childIndex) in item.children" v-if="!child.hidden && child.leaf" :key="child.path"><router-link :to='child.path':to="{path:'child.path', query:{index:index,leaf:'0'}}">{{child.name}}</router-link></li>-->
								<!--</ul>-->
								<!--<li v-for="child in item.children" v-if="!child.hidden && child.leaf && !child.children" :key="child.path" class="el-menu-item" style="padding-left: 20px;" :data-id="pageActive" :class="$route.path==child.path || pageActive==child.path  ? 'is-active':''" @click="myclick(child.path,$event,index,'0')">{{child.name}}78</li>-->
							</ul>
						</template>
					</div>
				</div>
			</el-aside>
			<el-container>
				<el-main>
					<div class="grid-content">
						<el-row>
							<el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20" @scroll="handleScroll" ref="content">
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
								<!--<el-col :span="24" class="content-wrapper" ref="table" :style="contentStyleObj">-->
									<el-col :span="24" class="content-wrapper" ref="table" :style="contentStyleObj">
									<transition name="fade" mode="out-in">
										<!--<router-view></router-view>-->
										<router-view :scrollTop="scrollTop" @viewScroll="viewScroll" ref="scrollTo"></router-view>
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
	</div>
</template>

<script>
    export default {
        name:'app',
        data() {
            return {
                cIndex:'',
                routerSelected:false,
                routerChilden:[],
                sysUserName: '',
                sysUserAvatar: '',
                navIndex:0,
                // leaf:1,
                fullHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                contentStyleObj:{
                    height:''
                },
                navLeaf:0,
				pageActive:'',
                scrollTop:''
            }
        },
        watch: {
            $route: {
                handler: function(val, oldVal){
                    if ( this.routerChilden.indexOf(val.path) !== -1) {
                        this.routerSelected = true
					}
                },
                // 深度观察监听
                deep: true
            },
            // 监听屏幕高度改变表格高度
            fullHeight(val) {
                // 初始化表格高度
                this.contentStyleObj.height = window.innerHeight - this.$refs.table.$el.offsetTop - 60 + 'px';
                // console.log('content高度：'+this.contentStyleObj.height)
            }
        },
        methods: {
            handleScroll (el) {
                this.scrollTop = this.$refs.content.scrollTop
            },
            viewScroll (val, index) {
                this.clickIndex = index
                this.scrollIt(val, 500, 'linear')
            },


            onSubmit() {

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
            },
            clickMenu(index,$event,leaf){
                this.navIndex = index;
                this.navLeaf = leaf;
			},
            myclick(path,e,index,leaf,childIndex){
                // $router.push(child.path)
				this.cIndex = childIndex
                this.$router.push({
                    path,
                    query: {
                        // t: +new Date(), //保证每次点击路由的 query 项都是不一样的，确保会重新刷新 view
                        index: + index,
                        leaf: + leaf
                    }
                });

                this.navIndex = e.currentTarget.parentElement.getAttribute("data-index");
				this.navLeaf = leaf;

				//获取子路由
                var routes = {
                    children: this.$router.options.routes
                };
                var route = this.$route.matched;
                for(var i=0; i<route.length-1; i++){
                    routes = routes.children.find((e) => (e.name == route[i].name));
                }
				for(let j=0;j<routes.children.length;j++){
                    this.routerChilden.push(routes.children[j].path)
				}
                return routes.children

            }

        },
        mounted() {
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
                    window.fullHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.fullHeight = window.fullHeight;
                    // console.log('屏幕高度：'+ window.fullHeight)
                })();
            };
        }
    }

</script>