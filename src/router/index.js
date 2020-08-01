import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    name: "dashboard",
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/icon',
                    name: "icon",
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/table',
                    name: "table",
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: {
                        title: '基础表格'
                    }
                },
                {
                    path: '/tabs',
                    name: "tabs",
                    component: () => import( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    name: "form",
                    component: () => import( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    name: "editor",
                    component: () => import( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    name: "markdown",
                    component: () => import( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    name: "upload",
                    component: () => import( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    name: "charts",
                    component: () => import( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: {
                        title: 'schart图表'
                    }
                },

                {
                    path: '/Popup',
                    component: () => import('../components/page/Popup.vue'),
                    meta: {
                        title: '弹窗'

                    }
                },

                {
                    path: '/404',
                    name: "404",
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    name: "403",
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
                {
                    path: '/Popup',
                    name: "Popup",
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/Popup.vue'),
                    meta: {
                        title: '弹窗'
                    }
                },
				{
				    path: '/centerList_r_id=0',
				    name: "managerCenter",
				    component: () => import('../components/manager/managerCenter.vue'),
				    meta: {
				        title: '运营中心维护'
				    }
				},
				{
				    path: '/operationsAuthentication_id=1',
				    name: "managerCenterCertification",
				    component: () => import('../components/manager/managerCenterCertification.vue'),
				    meta: {
				        title: '运营中心认证审核'
				    }
				},
				{
				    path: '/centerManager_id=6',
				    name: "centerAdmin",
				    component: () => import('../components/manager/centerAdmin.vue'),
				    meta: {
				        title: '运营中心管理员管理'
				    }
				},
				{
				    path: '/carrieroperatorManager_id=6',
				    name: "memberAdmin",
				    component: () => import('../components/manager/member/memberAdmin.vue'),
				    meta: {
				        title: '运营商管理员管理'
				    }
				},
				{
				    path: '/carrieroperatorFreeze_id=3',
				    name: "memberFreezeList",
				    component: () => import('../components/manager/member/memberFreezeList.vue'),
				    meta: {
				        title: '运营商冻结'
				    }
				},
				{
				    path: '/carrieroperatorUnfreeze_rescind_id=4',
				    name: "memberUnfreezeList",
				    component: () => import('../components/manager/member/memberUnfreezeList.vue'),
				    meta: {
				        title: '运营商解冻'
				    }
				},
				{
				    path: '/operationsEnd_id=5',
				    name: "managerTerminateCenter",
				    component: () => import('../components/manager/managerTerminateCenter.vue'),
				    meta: {
				        title: '运营中心终止'
				    }
				},
				{
				    path: '/carrieroperatorMaintenance_id=0',
				    name: "managerMember",
				    component: () => import('../components/manager/member/managerMember.vue'),
				    meta: {
				        title: '运营商维护'
				    }
				},
				{
				    path: '/carrieroperatorAuthentication_id=1',
				    name: "managerMemberCertification",
				    component: () => import('../components/manager/member/managerMemberCertification.vue'),
				    meta: {
				        title: '运营商认证审核'
				    }
				},
				{
				    path: '/customerDispatcher=0',
				    name: "managerCustomerDispatcher",
				    component: () => import('../components/manager/customerDispatcher/managerCustomerDispatcher.vue'),
				    meta: {
				        title: '客服调度管理'
				    }
				},
				{
				    path: '/customerBindDispatcher=0',
				    name: "customerBindCustomerService",
				    component: () => import('../components/manager/customer/customerBindCustomerService.vue'),
				    meta: {
				        title: '客户与客服绑定'
				    }
				},
				{
				    path: '/dealerOpenbills_id=11',
				    name: "managerCustomerBills",
				    component: () => import('../components/manager/customer/managerCustomerBills.vue'),
				    meta: {
				        title: '客户开票信息管理'
				    }
				},
				{
				    path: '/driverBindDispatcher=0',
				    name: "driverBindDispatcher",
				    component: () => import('../components/manager/driver/driverBindDispatcher.vue'),
				    meta: {
				        title: '司机与调度绑定'
				    }
				},
				{
				    path: '/mechanismMaintenance_id=0',
				    name: "managerOrg",
				    component: () => import('../components/manager/org/managerOrg.vue'),
				    meta: {
				        title: '机构维护'
				    }
				},
				{
				    path: '/orgManager_id=1',
				    name: "orgAdminList",
				    component: () => import('../components/manager/org/orgAdminList.vue'),
				    meta: {
				        title: '机构管理员管理'
				    }
				},
				{
				    path: '/agentMaintenance_id=0',
				    name: "managerBroker",
				    component: () => import('../components/manager/broker/managerBroker.vue'),
				    meta: {
				        title: '经纪人维护'
				    }
				},
				{
				    path: '/agentAuthentication_id=1',
				    name: "managerBrokerCertification",
				    component: () => import('../components/manager/broker/managerBrokerCertification.vue'),
				    meta: {
				        title: '经纪人认证审核'
				    }
				},
				{
				    path: '/customerMaintenance_id=0',
				    name: "managerCustomer",
				    component: () => import('../components/manager/customer/managerCustomer.vue'),
				    meta: {
				        title: '客户维护'
				    }
				},
				// {
				//     path: '/customerAuthentication_id=5',
				//     name: "customerCompanyCertification",
				//     component: () => import('../components/manager/customer/customerCompanyCertification.vue'),
				//     meta: {
				//         title: '客户企业认证审核'
				//     }
				// },
				{
				    path: '/dealerAuthentication_id=9',
				    name: "customerCertification",
				    component: () => import('../components/manager/customer/customerCertification.vue'),
				    meta: {
				        title: '客户认证审核'
				    }
				},
				{
				    path: '/carmanagerGroup_id=7',
				    name: "managerDriver",
				    component: () => import('../components/manager/driver/managerDriver.vue'),
				    meta: {
				        title: '司机维护'
				    }
				},
				{
				    path: '/carmanagerDriver_id=8',
				    name: "driverCertificationList",
				    component: () => import('../components/manager/driver/driverCertificationList.vue'),
				    meta: {
				        title: '司机认证审核'
				    }
				},
				{
				    path: '/banksBank_id=0',
				    name: "managerBanks",
				    component: () => import('../components/fund/bank/manageBanks.vue'),
				    meta: {
				        title: '银行管理'
				    }
				},
				{
				    path: '/banksReconciliation_id=1',
				    name: "settleResult",
				    component: () => import('../components/fund/bank/settleResult.vue'),
				    meta: {
				        title: '对账结果'
				    }
				},
				{
				    path: '/bankmanagerOperatorsSign_id=0',
				    name: "memberSign",
				    component: () => import('../components/fund/bankSign/memberSign.vue'),
				    meta: {
				        title: '运营商签约解约'
				    }
				},
				{
				    path: '/bankmanagerTraderSign_id=0',
				    name: "traderSign",
				    component: () => import('../components/fund/bankSign/traderSign.vue'),
				    meta: {
				        title: '交易员签约解约'
				    }
				},
				{
				    path: '/bankmanagerPlatSign_id=0',
				    name: "platSign",
				    component: () => import('../components/fund/bankSign/platSign.vue'),
				    meta: {
				        title: '交易所签约解约'
				    }
				},
				{
				    path: '/bankmanagerCenterSign_id=0',
				    name: "centerSign",
				    component: () => import('../components/fund/bankSign/centerSign.vue'),
				    meta: {
				        title: '运营中心签约解约'
				    }
				},
				{
				    path: '/payManagementTraderDetailed_id=3',
				    name: "traderPaymentDetail",
				    component: () => import('../components/fund/payment/traderPaymentDetail.vue'),
				    meta: {
				        title: '交易员支付明细查询'
				    }
				},{
				    path: '/payManagementCenterDetailed_id=0',
				    name: "traderPaymentDetail",
				    component: () => import('../components/fund/payment/centerPaymentDetail.vue'),
				    meta: {
				        title: '运营中心支付明细查询'
				    }
				},
				{
				    path: '/payManagementTraderRefund_id=4',
				    name: "traderRefund",
				    component: () => import('../components/fund/payment/traderRefund.vue'),
				    meta: {
				        title: '交易员支付退款'
				    }
				},
				{
				    path: '/payManagementCenterRefund_id=2',
				    name: "centerRefund",
				    component: () => import('../components/fund/payment/centerRefund.vue'),
				    meta: {
				        title: '运营中心退款'
				    }
				},
				{
				    path: '/outFundCheckSetting_id=6',
				    name: "withdrawCheckSetting",
				    component: () => import('../components/fund/withdraw/withdrawCheckSetting.vue'),
				    meta: {
				        title: '提现审核设置'
				    }
				},
				{
				    path: '/outFundCenterDetailed_id=0',
				    name: "centerWithdrawDetail",
				    component: () => import('../components/fund/withdraw/centerWithdrawDetail.vue'),
				    meta: {
				        title: '交易中心提现明细查询'
				    }
				},
				{
				    path: '/outFundMemberDetailed_id=2',
				    name: "memberWithdrawDetail",
				    component: () => import('../components/fund/withdraw/memberWithdrawDetail.vue'),
				    meta: {
				        title: '运营商提现明细查询'
				    }
				},
				{
				    path: '/outFundTraderDetailed_id=4',
				    name: "traderWithdrawDetail",
				    component: () => import('../components/fund/withdraw/traderWithdrawDetail.vue'),
				    meta: {
				        title: '交易员提现明细查询'
				    }
				},
				{
				    path: '/outFundTraderCheckWithdraw_id=5',
				    name: "traderWithdrawCheck",
				    component: () => import('../components/fund/withdraw/traderWithdrawCheck.vue'),
				    meta: {
				        title: '交易员提现审核'
				    }
				},
				{
				    path: '/outFundMemberCheckWithdraw_id=3',
				    name: "memberWithdrawCheck",
				    component: () => import('../components/fund/withdraw/memberWithdrawCheck.vue'),
				    meta: {
				        title: '运营商提现审核'
				    }
				},
				{
				    path: '/outFundCenterWithdraw_id=1',
				    name: "centerWithdrawList",
				    component: () => import('../components/fund/withdraw/centerWithdrawList.vue'),
				    meta: {
				        title: '交易中心提现'
				    }
				},
				{
				    path: '/outFundTimeSetting_id=7',
				    name: "withdrawTimeSetting",
				    component: () => import('../components/fund/withdraw/withdrawTimeSetting.vue'),
				    meta: {
				        title: '提现时间设置'
				    }
				},
				{
				    path: '/platUserStatistics',
				    name: "platUsersStatistics",
				    component: () => import('../components/statistics/users/platUsersStatistics.vue'),
				    meta: {
				        title: '交易所客户统计'
				    }
				},
				{
				    path: '/platDriverStatistics',
				    name: "platDriverStatistics",
				    component: () => import('../components/statistics/users/platDriverStatistics.vue'),
				    meta: {
				        title: '交易所司机统计'
				    }
				},
				{
				    path: '/memberUserStatistics',
				    name: "memberUsersStatistics",
				    component: () => import('../components/statistics/users/memberUsersStatistics.vue'),
				    meta: {
				        title: '运营商客户统计'
				    }
				},
				{
				    path: '/memberDriverStatistics',
				    name: "memberDriverStatistics",
				    component: () => import('../components/statistics/users/memberDriverStatistics.vue'),
				    meta: {
				        title: '运营商司机统计'
				    }
				},
				{
				    path: '/memberRankStatistics',
				    name: "memberRankStatistics",
				    component: () => import('../components/statistics/rank/memberRankStatistics.vue'),
				    meta: {
				        title: '运营商排名Top100'
				    }
				},
				{
				    path: '/customerServiceRankStatistics',
				    name: "customerServiceRankStatistics",
				    component: () => import('../components/statistics/rank/customerServiceRankStatistics.vue'),
				    meta: {
				        title: '客服排名Top100'
				    }
				},
				{
				    path: '/dispatchRankStatistics',
				    name: "dispatcherRankStatistics",
				    component: () => import('../components/statistics/rank/dispatcherRankStatistics.vue'),
				    meta: {
				        title: '调度员排名Top100'
				    }
				},
				{
				    path: '/customerRankStatistics',
				    name: "customerRankStatistics",
				    component: () => import('../components/statistics/rank/customerRankStatistics.vue'),
				    meta: {
				        title: '客户排名Top100'
				    }
				},
				{
				    path: '/driverRankStatistics',
				    name: "driverRankStatistics",
				    component: () => import('../components/statistics/rank/driverRankStatistics.vue'),
				    meta: {
				        title: '司机排名Top100'
				    }
				},
				{
				    path: '/provinceWeightTrafficStatistics',
				    name: "provinceWeightTrafficStatistics",
				    component: () => import('../components/statistics/others/provinceWeightTrafficRank.vue'),
				    meta: {
				        title: '省级货运量排名'
				    }
				},
				{
				    path: '/lineWeightTrafficStatistics',
				    name: "lineWeightTrafficStatistics",
				    component: () => import('../components/statistics/others/lineWeightTrafficRank.vue'),
				    meta: {
				        title: '线路货运量排名'
				    }
				},
				{
				    path: '/carUserRateStatistics',
				    name: "carUserRateStatistics",
				    component: () => import('../components/statistics/others/carUserRateRank.vue'),
				    meta: {
				        title: '车辆使用率排名'
				    }
				},
				{
				    path: '/customerServiceKPI',
				    name: "customerServiceKPI",
				    component: () => import('../components/statistics/kpi/customerServiceKPI.vue'),
				    meta: {
				        title: '客服绩效'
				    }
				},
				{
				    path: '/dispatcherKPI',
				    name: "dispatcherKPI",
				    component: () => import('../components/statistics/kpi/dispatcherKPI.vue'),
				    meta: {
				        title: '调度绩效'
				    }
				},
				{
				    path: '/customerServiceScoreStatistics',
				    name: "customerServiceScoreStatistics",
				    component: () => import('../components/statistics/score/customerServiceScoreList.vue'),
				    meta: {
				        title: '客服评分统计'
				    }
				},
				{
				    path: '/dispatchScoreStatistics',
				    name: "dispatchScoreStatistics",
				    component: () => import('../components/statistics/score/dispatchScoreList.vue'),
				    meta: {
				        title: '调度评分统计'
				    }
				},
				{
				    path: '/customerScoreStatistics',
				    name: "customerScoreStatistics",
				    component: () => import('../components/statistics/score/customerScoreList.vue'),
				    meta: {
				        title: '客户评分统计'
				    }
				},
				{
				    path: '/driverScoreStatistics',
				    name: "driverScoreStatistics",
				    component: () => import('../components/statistics/score/driverScoreList.vue'),
				    meta: {
				        title: '司机评分统计'
				    }
				},
				{
				    path: '/bankFundRecordList',
				    name: "bankFundRecordList",
				    component: () => import('../components/fund/bank/bankFundRecordList.vue'),
				    meta: {
				        title: '银行台账'
				    }
				},
                {
                    path: '/managerManager_id=0',
                    name: "managerManager",
                    component: () => import('../components/manager/managerManager.vue'),
                    meta: {
                        title: '管理员管理'
                    }
                },

                {
                    path: "/managerRole_id=1",
                    name: "managerRole",
                    component: () => import('../components/manager/managerRole.vue'),
                    meta: {
                        title: "角色管理"
                    }
                },

                {
                    path: "/serverchargeDefaultList",
                    name: "managerRole",
                    component: () => import('../components/argument/serverCharge/list.vue'),
                    meta: {
                        title: "默认服务费"
                    }
                },

                {
                    path: "/serverchargeCustomizeList",
                    name: "managerRole",
                    component: () => import('../components/argument/serverChargeCustomize/list.vue'),
                    meta: {
                        title: "运营商服务费"
                    }
                },


                {
                    path: "/parameterMemberParam",
                    name: "managerRole",
                    component: () => import('../components/argument/memberParam/list.vue'),
                    meta: {
                        title: "运营商参数设置"
                    }
                },
                {
                    path: "/parameterOtherParam",
                    name: "managerRole",
                    component: () => import('../components/argument/otherParam/update.vue'),
                    meta: {
                        title: "系统其它参数设置"
                    }
                },
                {
                    path: "/parameterBankCharge",
                    name: "managerRole",
                    component: () => import('../components/argument/bankCharge/list.vue'),
                    meta: {
                        title: "银行服务费设置"
                    }
                },
                {
                    path: "/parameterScoreLevel",
                    name: "parameterScoreLevel",
                    component: () => import('../components/argument/scoreLevel/list.vue'),
                    meta: {
                        title: "积分规则设置"
                    }
                },
                {
                    path: "/businessOpeningClosing",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/market/openingClosing/update.vue'),
                    meta: {
                        title: "开休市管理"
                    }
                },
                {
                    path: "/businessSetUp",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/market/settlement/update.vue'),
                    meta: {
                        title: "结算设置"
                    }
                },
                {
                    path: "/businessHandSettlement",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/market/manualSettlement/list.vue'),
                    meta: {
                        title: "手工结算"
                    }
                },
                {
                    path: "/businessPlanningPromotion",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/marketing/promotion/list.vue'),
                    meta: {
                        title: "推广管理"
                    }
                },
                {
                    path: "/businessFeedback",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/marketing/feedback/list.vue'),
                    meta: {
                        title: "投诉管理"
                    }
                },
                {
                    path: "/businessEvaluate",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/marketing/evaluate/list.vue'),
                    meta: {
                        title: "评价管理"
                    }
                },
                {
                    path: "/businessUserUnlock",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/other/userUnlock/list.vue'),
                    meta: {
                        title: "用户解锁"
                    }
                },
                {
                    path: "/businessMarketInfo",
                    name: "parameterScoreLevel",
                    component: () => import('../components/business/other/marketInfo/list.vue'),
                    meta: {
                        title: "市场行情管理"
                    }
                },
                 {
                     path: "/systemManagerNoticeList",
                     name: "parameterScoreLevel",
                     component: () => import('../components/system/notice/release/list.vue'),
                     meta: {
                        title: "发布公告"
                     }
                 },
                 {
                     path: "/systemManagerNoticeAudit",
                     name: "parameterScoreLevel",
                     component: () => import('../components/system/notice/audit/list.vue'),
                     meta: {
                         title: "审核公告"
                     }
                 },
                {
                    path: "/systemManagerLogOpertorList",
                    name: "logOpertor",
                    component: () => import('../components/system/log/operate/list.vue'),
                    meta: {
                        title: "后台操作日志"
                    }
                },
                {
                    path: "/systemManagerLogLoginList",
                    name: "logLogin",
                    component: () => import('../components/system/log/login/list.vue'),
                    meta: {
                        title: "系统登录日志"
                    }
                },
                {
                    path: "/reportCustomerMoneyList",
                    name: "reportCustomerMoneyList",
                    component: () => import('../components/transQuery/customer/fund/list.vue'),
                    meta: {
                        title: "客户资金查询"
                    }
                },
                {
                    path: "/reportDriverMoneyList",
                    name: "reportDriverMoneyList",
                    component: () => import('../components/transQuery/driver/fund/list.vue'),
                    meta: {
                        title: "司机资金查询"
                    }
                },
                {
                    path: "/reportAgentMoneyList",
                    name: "reportAgentMoneyList",
                    component: () => import('../components/transQuery/agent/fund/list.vue'),
                    meta: {
                        title: "经纪人资金查询"
                    }
                },
                {
                    path: "/reportCustomerServiceMoneyList",
                    name: "reportCustomerServiceMoneyList",
                    component: () => import('../components/transQuery/customerService/fund/list.vue'),
                    meta: {
                        title: "客服资金查询"
                    }
                },
                {
                    path: "/reportDispatcherMoneyList",
                    name: "reportDispatcherMoneyList",
                    component: () => import('../components/transQuery/dispatcher/fund/list.vue'),
                    meta: {
                        title: "调度资金查询"
                    }
                },
                {
                    path: "/reportMemberMoneyList",
                    name: "reportMemberMoneyList",
                    component: () => import('../components/transQuery/member/fund/list.vue'),
                    meta: {
                        title: "运营商资金查询"
                    }
                },
                {
                    path: "/reportCenterMoneyList",
                    name: "reportCenterMoneyList",
                    component: () => import('../components/transQuery/center/fund/list.vue'),
                    meta: {
                        title: "运营中心资金查询"
                    }
                },
                {
                    path: "/reportCustomerMoneyWaterList",
                    name: "reportCustomerMoneyWaterList",
                    component: () => import('../components/transQuery/customer/fundWater/list.vue'),
                    meta: {
                        title: "客户资金流水查询"
                    }
                },
                {
                    path: "/reportDriverMoneyWaterList",
                    name: "reportDriverMoneyWaterList",
                    component: () => import('../components/transQuery/driver/fundWater/list.vue'),
                    meta: {
                        title: "司机资金流水查询"
                    }
                },
                {
                    path: "/reportAgentMoneyWaterList",
                    name: "reportAgentMoneyWaterList",
                    component: () => import('../components/transQuery/agent/fundWater/list.vue'),
                    meta: {
                        title: "经纪人资金流水查询"
                    }
                },
                {
                    path: "/reportCustomerServiceMoneyWaterList",
                    name: "reportCustomerServiceMoneyWaterList",
                    component: () => import('../components/transQuery/customerService/fundWater/list.vue'),
                    meta: {
                        title: "客服资金流水查询"
                    }
                },
                {
                    path: "/reportDispatcherMoneyWaterList",
                    name: "reportDispatcherMoneyWaterList",
                    component: () => import('../components/transQuery/dispatcher/fundWater/list.vue'),
                    meta: {
                        title: "调度资金流水查询"
                    }
                },
                {
                    path: "/reportMemberMoneyWaterList",
                    name: "reportMemberMoneyWaterList",
                    component: () => import('../components/transQuery/member/fundWater/list.vue'),
                    meta: {
                        title: "运营商资金流水查询"
                    }
                },
                {
                    path: "/reportCenterMoneyWaterList",
                    name: "reportCenterMoneyWaterList",
                    component: () => import('../components/transQuery/center/fundWater/list.vue'),
                    meta: {
                        title: "运营中心资金流水查询"
                    }
                },
                {
                    path: "/reportCustomeOrderList",
                    name: "reportCustomeOrderList",
                    component: () => import('../components/transQuery/customer/order/list.vue'),
                    meta: {
                        title: "客户订单查询"
                    }
                },
                {
                    path: "/reportAgentOrderList",
                    name: "reportAgentOrderList",
                    component: () => import('../components/transQuery/agent/order/list.vue'),
                    meta: {
                        title: "经纪人订单查询"
                    }
                },
                {
                    path: "/reportCustomerServiceOrderList",
                    name: "reportCustomerServiceOrderList",
                    component: () => import('../components/transQuery/customerService/order/list.vue'),
                    meta: {
                        title: "客服订单查询"
                    }
                },
                {
                    path: "/reportDispatcherOrderList",
                    name: "reportDispatcherOrderList",
                    component: () => import('../components/transQuery/dispatcher/order/list.vue'),
                    meta: {
                        title: "调度订单查询"
                    }
                },
                {
                    path: "/reportMembeOrderList",
                    name: "reportMembeOrderList",
                    component: () => import('../components/transQuery/member/order/list.vue'),
                    meta: {
                        title: "订单查询"
                    }
                },
                {
                    path: "/reportCustomerWaybillList",
                    name: "reportCustomerWaybillList",
                    component: () => import('../components/transQuery/customer/waybill/list.vue'),
                    meta: {
                        title: "客户运单查询"
                    }
                },
                {
                    path: "/reportDriverWaybillList",
                    name: "reportDriverWaybillList",
                    component: () => import('../components/transQuery/driver/waybill/list.vue'),
                    meta: {
                        title: "司机运单查询"
                    }
                },
                {
                    path: "/reportAgentWaybillList",
                    name: "reportAgentWaybillList",
                    component: () => import('../components/transQuery/agent/waybill/list.vue'),
                    meta: {
                        title: "经纪人运单查询"
                    }
                },
                {
                    path: "/reportCustomerServiceWaybillList",
                    name: "reportCustomerServiceWaybillList",
                    component: () => import('../components/transQuery/customerService/waybill/list.vue'),
                    meta: {
                        title: "客服运单查询"
                    }
                },
                {
                    path: "/reportDispatcherWaybillList",
                    name: "reportDispatcherWaybillList",
                    component: () => import('../components/transQuery/dispatcher/waybill/list.vue'),
                    meta: {
                        title: "调度员运单查询"
                    }
                },
                {
                    path: "/reportMemberWaybillList",
                    name: "reportMemberWaybillList",
                    component: () => import('../components/transQuery/member/waybill/list.vue'),
                    meta: {
                        title: "运单查询"
                    }
                },
                {
                    path: "/reportExchangeMoneyList",
                    name: "reportExchangeMoneyList",
                    component: () => import('../components/transQuery/exchange/fund/list.vue'),
                    meta: {
                        title: "交易中心资金查询"
                    }
                },
                {
                    path: "/reportExchangeMoneyWaterList",
                    name: "reportExchangeMoneyWaterList",
                    component: () => import('../components/transQuery/exchange/fundWater/list.vue'),
                    meta: {
                        title: "交易中心资金流水查询"
                    }
                },
                {
                    path: "/reportOtherDrivergpsList",
                    name: "reportOtherDrivergpsList",
                    component: () => import('../components/transQuery/other/driverGps/list.vue'),
                    meta: {
                        title: "司机定位查询"
                    }
                },
                {
                    path: "/reportOtherMarketPriceList",
                    name: "reportOtherMarketPriceList",
                    component: () => import('../components/transQuery/other/marketPrice/list.vue'),
                    meta: {
                        title: "市场报价查询"
                    }
                },
                {
                    path: "/reportOtherSystemHqList",
                    name: "reportOtherSystemHqList",
                    component: () => import('../components/transQuery/other/systemHq/list.vue'),
                    meta: {
                        title: "市场行情查询"
                    }
                },
				{
				    path: '/platTransStatistics',
				    name: "platTransStatistics",
				    component: () => import('../components/statistics/transStat/exchange/list.vue'),
				    meta: {
				        title: '交易所统计分析'
				    }
				},
				{
				    path: '/centerTransStatistics',
				    name: "centerTransStatistics",
				    component: () => import('../components/statistics/transStat/center/list.vue'),
				    meta: {
				        title: '运营中心统计分析'
				    }
				},
				{
				    path: '/memberTransStatistics',
				    name: "memberTransStatistics",
				    component: () => import('../components/statistics/transStat/member/list.vue'),
				    meta: {
				        title: '运营商统计分析'
				    }
				},
				{
				    path: '/orgTransStatistics',
				    name: "orgTransStatistics",
				    component: () => import('../components/statistics/transStat/org/list.vue'),
				    meta: {
				        title: '机构统计分析'
				    }
				},
				{
				    path: '/customerServiceTransStatistics',
				    name: "customerServiceTransStatistics",
				    component: () => import('../components/statistics/transStat/customerService/list.vue'),
				    meta: {
				        title: '客服统计分析'
				    }
				},
				{
				    path: '/brokerTransStatistics',
				    name: "brokerTransStatistics",
				    component: () => import('../components/statistics/transStat/agent/list.vue'),
				    meta: {
				        title: '经纪人统计分析'
				    }
				},
				{
				    path: '/customerTransStatistics',
				    name: "customerTransStatistics",
				    component: () => import('../components/statistics/transStat/customer/list.vue'),
				    meta: {
				        title: '客户统计分析'
				    }
				},
				{
				    path: '/driverTransStatistics',
				    name: "driverTransStatistics",
				    component: () => import('../components/statistics/transStat/driver/list.vue'),
				    meta: {
				        title: '司机统计分析'
				    }
				},
				{
				    path: '/dispatchTransStatistics',
				    name: "dispatchTransStatistics",
				    component: () => import('../components/statistics/transStat/dispatcher/list.vue'),
				    meta: {
				        title: '调度统计分析'
				    }
				},
				{
				    path: '/businessDriverPromotionSum',
				    name: "businessDriverPromotionSum",
				    component: () => import('../components/business/marketing/driverPromotionSum/list.vue'),
				    meta: {
				        title: '司机推广统计'
				    }
				},
				{
				    path: '/businessPointConsume',
				    name: "businessPointConsume",
				    component: () => import('../components/business/marketing/pointConsume/list.vue'),
				    meta: {
				        title: '积分统计管理'
				    }
				}
                
                
            ]
        },

        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/login/Login.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
});