<template>
    <div class="wrapper">
        <div class="header">
            <!-- 折叠按钮 -->
            <div class="head-left">
                <div class="collapse-btn">
                    <img src="../../assets/img/footer-logo.png" alt />
                </div>
                <!-- <div class="line"></div> -->
                <div class="logo">交易中心管理系统</div>
            </div>

            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#20A0F4"
            >
                <!-- <div class="line"></div> -->
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item
                    :index="(num+2).toString()"
                    v-for="(item,num) in menuList"
                    :key="num"
                >{{item.title}}</el-menu-item>
            </el-menu>

            <div class="header-right">
                <div class="header-user-con">
					<el-tooltip class="item" effect="light" content="消息" placement="bottom">
                    <a href="javascript:;" class="goods" style="color:#fff;">
                        <div class="deliverGoods">
                            <i class="el-icon-bell"></i>
                            
                        </div>
                    </a>
					</el-tooltip>
					<el-tooltip class="item" effect="light" content="全屏" placement="bottom">
                    <a
                        href="javascript:;"
                        class="goods"
                        @click="handleFullScreen"
                        style="color:#fff;"
                    >
                        <div class="deliverGoods">
                            <i class="el-icon-rank"></i>
                            
                        </div>
                    </a>
					</el-tooltip>
                    <div class="line1"></div>
					<el-tooltip class="item" effect="light" content="修改密码" placement="bottom">
                    <a href="javascript:;" class="goods" @click="change" style="color:#fff;">
                        <div class="deliverGoods">
                            <i class="el-icon-unlock"></i>
                            
                        </div>
                    </a>
					</el-tooltip>
					<el-tooltip class="item" effect="light" content="退出" placement="bottom">
                    <a href="javascript:;" class="goods" @click="logout" style="color:#fff;">
                        <div class="deliverGoods">
                            <i class="el-icon-switch-button"></i>
                            
                        </div>
                    </a>
					</el-tooltip>
                    <!-- 全屏显示 -->
                    <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip
                            effect="dark"
                            :content="fullscreen?`取消全屏`:`全屏`"
                            placement="bottom"
                        >
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>-->
                    <!-- 消息中心 -->
                    <!-- <div class="btn-bell">
                        <el-tooltip
                            effect="dark"
                            :content="message?`有${message}条未读消息`:`消息中心`"
                            placement="bottom"
                        >
                            <router-link to="/tabs">
                                <i class="el-icon-bell"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" v-if="message"></span>
                    </div>-->
                    <!-- 用户头像 -->
                    <div class="user-avator">
                        <img :src="picUrl" />
                    </div>
                    <div class="user-name">{{username}}</div>
                    <!-- 用户名下拉菜单 -->
                    <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>-->
                </div>
            </div>
        </div>
        <div class="sidebar">
            <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#fff"
                active-text-color="#fff"
                unique-opened
                router
                @open="openMenu"
            >
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="(item.index).toString()" :key="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs">
                                <el-submenu
                                    v-if="subItem.subs"
                                    :index="(subItem.index).toString()"
                                    :key="subItem.index"
                                >
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                    >{{ threeItem.title }}</el-menu-item>
                                </el-submenu>
                                <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                                >{{ subItem.title }}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
        <changePassword ref="changePassword"></changePassword>
        <div class="foot">版权所有：广东中象集运科技有限公司</div>
    </div>
</template>

<script>
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import reslist from '../../assets/js/json.js';
import changePassword from '../popup/changePassword.vue';
import store from "@/store/index.js";
export default {
    data() {
        return {
			picUrl: require('../../assets/img/dispatch-icon.png'),//头像图片路径
            tagsList: [],
            collapse: false,
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            activeIndex: '1',
            activeIndex2: '1',
            collapse: false,
            items: [
                {
                    index: 'dashboard',
                    title: '系统首页'
                },
            ],
            menuList: []
        };
    },
    components: {
        vSidebar,
        vTags,
        changePassword
    },
    created() {
        this.initMenu();
    },
    computed: {
        username() {
			// var account;
			// if(!(this.$store.state.Login.loginData)||!(this.$store.state.Login.loginData.data)
			// 	||!(account = this.$store.state.Login.loginData.data.account)){
			// 	this.$router.push('/login');
			// 	return;
			// 	// let username = localStorage.getItem('ms_username');
			// 	// return username ? username : this.name;
			// }
            // return account;
			if(store.state.Login.loginData&&store.state.Login.loginData.data){
				return store.state.Login.loginData.data.account;
			}
			this.$message.error({message: "会话已过期，请重新登录",duration:1500});
			var that = this;
			setTimeout(function()  {
				that.$router.push('/login');
			}, 1600);
        },
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
		//初始化菜单
		initMenu(){
			bus.$on('collapse-content', msg => {
			    this.collapse = msg;
			});
			
			// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
			bus.$on('tags', msg => {
			    let arr = [];
			    for (let i = 0, len = msg.length; i < len; i++) {
			        msg[i].name && arr.push(msg[i].name);
			    }
			    this.tagsList = arr;
			});
			
			bus.$on('collapse', msg => {
			    this.collapse = msg;
			    bus.$emit('collapse-content', msg);
			    split;
			});
			
			let menuList = this.$store.state.Login.menuList;
			let list = [];
			menuList.forEach((item, index1) => {
				if(!(item.list)||!(item.list.length>0)){
					return;
				}
				var idx = index1 + 2;
				var twoList = [];
				var found = false;
				for(var i=0;i<reslist.length;i++){
					var itm = reslist[i];
					if(item.fName==itm.title){
						found = true;
						if(itm.index>=0){
							idx = itm.index;
						}
						twoList = itm.list;
						break;
					}
				}
				if(!found){
					console.warn("一级菜单 "+item.fName+" 因与页面定义的标题名称不匹配而被隐藏");
					return;
				}
			    list.push({ index: idx, title: item.fName, list: [] });
			    item.list.forEach((ele, index2) => {
					var twoIdx = null;
					var thirdList = [];
					found = false;
			        if(twoList&&twoList.length>0){
						for(var i=0;i<twoList.length;i++){
							var itm = twoList[i];
							if(ele.fName==itm.title){
								found = true;
								twoIdx = itm.index;
								thirdList = itm.subs;
								break;
							}
						}
					}
					if(!found){
						console.warn("二级菜单 "+ele.fName+" 因与页面定义的标题名称不匹配而被隐藏");
						return;
					}
			        if (!(ele.list)||!(ele.list.length>0)) {
						var obj = {title: ele.fName};
						if(twoIdx!=null&&twoIdx!=undefined){
							obj.index = twoIdx;
						}else{
							let arr = ele.fUrl.split('/');
							let str1 = this.slice(arr[1]);
							let str2 = this.slice(arr[3]);
							obj.index = arr[2] + str2 + arr[3].substr(1) + '_id=' + index2;
						}
			            list[index1].list.push(obj);
			        } else {
						if(twoIdx==null||twoIdx==undefined){
							twoIdx = index2 + 1;
						}
			            list[index1].list.push({
			                index: twoIdx,
			                title: ele.fName,
			                subs: []
			            });
			            ele.list.forEach((e, index3) => {
							var thirdIdx = null;
							found = false;
							if(thirdList&&thirdList.length>0){
								for(var i=0;i<thirdList.length;i++){
									var itm = thirdList[i];
									if(e.fName==itm.title){
										found = true;
										thirdIdx = itm.index;
										break;
									}
								}
							}
							if(!found){
								console.warn("三级菜单 "+e.fName+" 因与页面定义的标题名称不匹配而被隐藏");
								return;
							}
							var obj = {title: e.fName,fUrl: e.fUrl}
							if(thirdIdx!=null&&thirdIdx!=undefined){
								obj.index = thirdIdx;
							}else{
								let arr = e.fUrl.split('/');
								let str1 = this.slice(arr[1]);
								let str2 = this.slice(arr[3]);
								obj.index = arr[2] + str2 + arr[3].substr(1) + '_id=' + index3;
							}
							if(!(list[index1].list[index2])){
								console.log(ele.fName+" , "+e.fName)
								return;
							}
			                list[index1].list[index2].subs.push(obj);
			            });
						var obj = list[index1];
						if(obj&&(obj=obj.list[index2])&&obj.subs){
							list[index1].list[index2].subs.sort(function(a, b){return a.index - b.index});
						}
			        }
			    });
				if(list[index1]&&list[index1].list){
					list[index1].list.sort(function(a, b){return a.index - b.index});
				}
			});
			list.sort(function(a, b){return a.index - b.index});
			//reslist.sort(function(a, b){return a.index - b.index});
			this.menuList = list;
			this.$store.commit('setList', this.menuList);
		},
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        handleSelect(key) {
            if (key == 1) {
                this.items = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                ];
            } else {
                this.items = this.menuList[key - 2].list;
            }
        },

        slice(str) {
            let arr = str.slice(0, 1);
            let arr1 = arr.toUpperCase();
            return arr1;
        },
        openMenu(index) {
           // console.log(index);
        },
        //修改密码
        change() {
            this.$refs.changePassword.receipt();
        },
        //退出登录
        logout() {
			this.$confirm('确定退出登录吗?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'info'
			        }).then(() => {
			          localStorage.removeItem('ms_username');
			          this.$router.push('/login');
			})
        }
    },
    mounted() {
        // if (document.body.clientWidth < 1500) {
        //     this.collapseChage(this.menuList[key].index);
        // }
    }
};
</script>
<style lang="scss" scoped>
.wrapper {
    // overflow: scroll !important;
}
/deep/.el-menu-item {
    margin-top: 7px !important;
    height: 50px !important;
}
.el-menu.el-menu--horizontal {
    border: none;
    background-color: #242f42 !important;
    .el-menu-item {
        background-color: #242f42 !important;
    }
}
.is-active {
    background: rgba($color: #2a2d2e, $alpha: 0.8) !important;
    color: #409eff !important;
}
.is-opened {
    background: rgba($color: #2a2d2e, $alpha: 0.8) !important;
    z-index: 10000;
}
</style>
<style lang="scss" scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    display: flex;
    .header-left {
        width: 400px;
    }
    .line {
        position: absolute;
        border-right: 5px solid #ffffff;
        left: 230px;
        top: 21.5px;
        height: 25px;
    }
    .el-menu {
        flex: 1;
    }
    .head-right {
        width: 300px;
    }
}
.el-tabs {
    float: left;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
    img {
        margin-top: 13.5px;
        width: 150px;
        height: 40px;
    }
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
    text-align: center;
    // margin-left: 20px;
}
.header-right {
    float: right;
    padding-right: 50px;
    .goods {
        display: block;
        padding: 5px;
        box-sizing: border-box;
        font-size: 16px;
        margin-right: 10px;
        .deliverGoods:hover {
            color: #409eff;
            font-size: 16px;
        }
    }

    .line1 {
        height: 30%;
        // margin-top: 21.5px;
        // border-right: 1px solid #ccc;
        width: 1px;
        margin-right: 10px;
        background: linear-gradient(#808080, #fff);
    }
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
    font-size: 16px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}

.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 230px;
}
.sidebar > ul {
    height: 100%;
}
</style>
<style >
.content-box {
	margin-bottom: 23px;
}
.foot{
	position: fixed;
	bottom: 0px;
	width: calc(100% - 251px);
	background: #f5f5f5;
	/* border-top: 1px solid #EEEEEE; */
	color: #AAAAAA;
	right: 0;
	font-size: 10px;
	letter-spacing: 1px;
	z-index: 10;
	height: 22px;
	line-height: 22px;
	text-align: center;
}
</style>

