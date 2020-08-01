let reslist = [{
    "index": 2,
    "title": "账户管理",
    "list": [{
        "index": 1,
        "title": "管理员管理",
        "subs": [{
            "index": "managerManager_id=0",
            "title": "管理员管理",
            "fUrl": "/account/manager/manager/list_r"
        }, {
            "index": "managerRole_id=1",
            "title": "角色管理",
            "fUrl": "/account/manager/role/list_r"
        }]
    }, {
        "index": 2,
        "title": "运营中心管理",
        "subs": [{
            "index": "centerList_r_id=0",
            "title": "运营中心维护",
            "fUrl": "/account/center/list_r"
        }, {
            "index": "operationsAuthentication_id=1",
            "title": "运营中心认证审核",
            "fUrl": "/account/operations/authentication/list_r"
        }, /* {
            "index": "operationsActive_id=2",
            "title": "运营中心激活",
            "fUrl": "/account/operations/active/list_r"
        }, {
            "index": "operationsFreeze_id=3",
            "title": "运营中心冻结",
            "fUrl": "/account/operations/freeze/list_r"
        }, {
            "index": "operationsUnfreeze_id=4",
            "title": "运营中心解冻",
            "fUrl": "/account/operations/unfreeze/list_r"
        }, */ /* {
            "index": "operationsEnd_id=5",
            "title": "运营中心终止",
            "fUrl": "/account/operations/end/list_r"
        }, */{
            "index": "centerManager_id=6",
            "title": "运营中心管理员管理",
            "fUrl": "/account/center/manager/list"
        }]
    }, {
        "index": 3,
        "title": "运营商管理",
        "subs": [{
            "index": "carrieroperatorMaintenance_id=0",
            "title": "运营商维护",
            "fUrl": "/account/carrieroperator/maintenance/list_r"
        }, {
            "index": "carrieroperatorAuthentication_id=1",
            "title": "运营商认证审核",
            "fUrl": "/account/carrieroperator/authentication/list_r"
        }, /* {
            "index": "carrieroperatorActive_id=2",
            "title": "运营商激活",
            "fUrl": "/account/carrieroperator/active/list_r"
        }, */ {
            "index": "carrieroperatorFreeze_id=3",
            "title": "运营商冻结",
            "fUrl": "/account/carrieroperator/freeze/list_r"
        }, {
            "index": "carrieroperatorUnfreeze_rescind_id=4",
            "title": "运营商解冻",
            "fUrl": "/account/carrieroperator/unfreeze_rescind/list_r"
        }, /* {
            "index": "carrieroperatorEnd_id=5",
            "title": "运营商终止",
            "fUrl": "/account/carrieroperator/end/list_r"
        }, */ {
            "index": "carrieroperatorManager_id=6",
            "title": "运营商管理员管理",
            "fUrl": "/account/carrieroperator/manager/list_r"
        }, {
            "index": "customerDispatcher=0",
            "title": "客服调度管理",
            "fUrl": "/account/customerDispatcher/maintenance/list_r"
        }, /* {
            "index": "carrieroperatorChangeorder_id=7",
            "title": "运营商转单分配",
            "fUrl": "/account/carrieroperator/changeorder/list_r"
        }, */ 
		{
            "index": "dispatcherRegion",
            "title": "调度区域分配",
            "fUrl": "/account/dispatcher/region/list"
        },
		]
    }, {
        "index": 4,
        "title": "机构管理",
        "subs": [{
            "index": "mechanismMaintenance_id=0",
            "title": "机构维护",
            "fUrl": "/account/mechanism/maintenance/list_r"
        }, {
            "index": "orgManager_id=1",
            "title": "机构管理员管理",
            "fUrl": "/account/org/manager/list"
        }]
    }, /* {
        "index": 5,
        "title": "调度员管理",
        "subs": [{
            "index": "dispatcherMaintenance_id=0",
            "title": "调度员维护",
            "fUrl": "/account/dispatcher/maintenance/list_r"
        }, {
            "index": "dispatcherAuthentication_id=1",
            "title": "调度员认证审核",
            "fUrl": "/account/dispatcher/authentication/list_r"
        }, {
            "index": "dispatcherCancelauthentication_id=2",
            "title": "调度员注销审核",
            "fUrl": "/account/dispatcher/cancelauthentication/list_r"
        }, {
            "index": "dispatcherGroup_id=3",
            "title": "调度员分组管理",
            "fUrl": "/account/dispatcher/group/list_r"
        }]
    }, {
        "index": 6,
        "title": "客服管理",
        "subs": [{
            "index": "customserviceMaintenance_id=0",
            "title": "客服维护",
            "fUrl": "/account/customservice/maintenance/list_r"
        }, {
            "index": "customserviceAuthentication_id=1",
            "title": "客服认证审核",
            "fUrl": "/account/customservice/authentication/list_r"
        }, {
            "index": "customserviceCancelauthentication_id=2",
            "title": "客服注销审核",
            "fUrl": "/account/customservice/cancelauthentication/list_r"
        }, {
            "index": "customserviceGroup_id=3",
            "title": "客服分组管理",
            "fUrl": "/account/customservice/group/list_r"
        }]
    }, */ {
        "index": 7,
        "title": "经纪人管理",
        "subs": [{
            "index": "agentMaintenance_id=0",
            "title": "经纪人维护",
            "fUrl": "/account/agent/maintenance/list_r"
        }, {
            "index": "agentAuthentication_id=1",
            "title": "经纪人认证审核",
            "fUrl": "/account/agent/authentication/list_r"
        }, /* {
            "index": "agentCancelauthentication_id=2",
            "title": "经纪人注销审核",
            "fUrl": "/account/agent/cancelauthentication/list_r"
        }, {
            "index": "agentGroup_id=3",
            "title": "经纪人分组管理",
            "fUrl": "/account/agent/group/list_r"
        }, *//* {
            "index": "agentCancel_id=4",
            "title": "经纪人注销",
            "fUrl": "/account/agent/cancel/list_r"
        }, */]
    }, {
        "index": 8,
        "title": "客户管理",
        "subs": [{
            "index": "customerMaintenance_id=0",
            "title": "客户维护",
            "fUrl": "/account/customer/maintenance/list_r"
        }, /* {
            "index": "customerActive_id=1",
            "title": "客户激活",
            "fUrl": "/account/customer/active/list_r"
        }, {
            "index": "customerFreeze_id=2",
            "title": "客户冻结",
            "fUrl": "/account/customer/freeze/list_r"
        }, {
            "index": "customerUnfreeze_id=3",
            "title": "客户解冻",
            "fUrl": "/account/customer/unfreeze/list_r"
        }, */ /* {
            "index": "customerCancel_id=4",
            "title": "客户注销",
            "fUrl": "/account/customer/cancel/list_r"
        }, */ /* {
            "index": "customerAuthentication_id=5",
            "title": "客户企业认证审核",
            "fUrl": "/account/customer/authentication/list_r"
        }, */ /* {
            "index": "customerGroup_id=6",
            "title": "客户分组管理",
            "fUrl": "/account/customer/group/list_r"
        }, {
            "index": "dealerManager_id=7",
            "title": "企业交易员管理",
            "fUrl": "/account/dealer/manager/list_r"
        }, {
            "index": "dealerSinglemanager_id=8",
            "title": "个人交易员管理",
            "fUrl": "/account/dealer/singlemanager/list_r"
        }, */{
            "index": "dealerAuthentication_id=9",
            "title": "客户认证审核",
            "fUrl": "/account/dealer/authentication/list_r"
        }, /* {
            "index": "dealerCancelauthentication_id=10",
            "title": "交易员注销审核",
            "fUrl": "/account/dealer/cancelauthentication/list_r"
        }, */ {
            "index": "dealerOpenbills_id=11",
            "title": "客户开票信息管理",
            "fUrl": "/account/dealer/openbills/list_r"
        }, {
            "index": "customerBindDispatcher=0",
            "title": "客户与客服绑定",
            "fUrl": "/account/customer/bind/list_r"
        }]
    }, {
        "index": 9,
        "title": "司机管理",
        "subs": [/* {
            "index": "carmanagerMaintenance_id=0",
            "title": "车辆维护",
            "fUrl": "/account/carmanager/maintenance/list_r"
        }, {
            "index": "carmanagerAuthentication_id=1",
            "title": "车辆认证审核",
            "fUrl": "/account/carmanager/authentication/list_r"
        }, {
            "index": "carmanagerActive_id=2",
            "title": "车辆激活",
            "fUrl": "/account/carmanager/active/list_r"
        }, {
            "index": "carmanagerFreeze_id=3",
            "title": "车辆冻结",
            "fUrl": "/account/carmanager/freeze/list_r"
        }, {
            "index": "carmanagerUnfreeze_id=4",
            "title": "车辆解冻",
            "fUrl": "/account/carmanager/unfreeze/list_r"
        }, {
            "index": "carmanagerCancel_id=5",
            "title": "车辆销户",
            "fUrl": "/account/carmanager/cancel/list_r"
        }, {
            "index": "carmanagerGroup_id=6",
            "title": "车辆分组管理",
            "fUrl": "/account/carmanager/group/list_r"
        }, */ {
            "index": "carmanagerGroup_id=7",
            "title": "司机维护",
            "fUrl": "/account/carmanager/group/driver/list_r"
        },/* {
            "index": "cancelDriver_id=0",
            "title": "司机注销",
            "fUrl": "/account/carmanager/driver/cance/list_r"
        }, */ {
            "index": "carmanagerDriver_id=8",
            "title": "司机认证审核",
            "fUrl": "/account/carmanager/driver/authentication/list_r"
        }, {
            "index": "driverBindDispatcher=0",
            "title": "司机与调度绑定",
            "fUrl": "/account/carmanager/bind/list_r"
        }, /* {
            "index": "carmanagerDriver_id=9",
            "title": "司机注销审核",
            "fUrl": "/account/carmanager/driver/cancelauthentication/list_r"
        }, {
            "index": "carmanagerTemporarycar_id=10",
            "title": "外协车辆维护",
            "fUrl": "/account/carmanager/temporarycar/list_r"
        } */]
    }]
}, {
    "index": 3,
    "title": "参数设置",
    "list": [{
        "index": 1,
        "title": "服务费设置",
        "subs": [{
            "index": "serverchargeDefaultList",
            "title": "默认服务费",
            "fUrl": "/parameter/poundage/defaultpoundage/list_r"
        }, {
            "index": "serverchargeCustomizeList",
            "title": "运营商服务费",
            "fUrl": "/parameter/poundage/custompoundage/list_r"
        }]
    }, {
        "index": 4,
        "title": "运营商参数设置",
        "subs": [{
            "index": "parameterMemberParam",
            "title": "运营商参数设置",
            "fUrl": "/parameter/carrieroperator/risk/list_r"
        }]
    }, {
        "index": "parameterOtherParam",
        "title": "系统其他参数设置"
    }, {
        "index": "parameterBankCharge",
        "title": "银行服务费设置"
    }, {
        "index": "parameterScoreLevel",
        "title": "积分规则设置"
    }]
}, {
    "index": 5,
    "title": "资金管理",
    "list": [{
        "index": 1,
        "title": "银行管理",
        "subs": [{
            "index": "banksBank_id=0",
            "title": "银行管理",
            "fUrl": "/fund/banks/bank/list_r"
        }, {
            "index": "bankFundRecordList",
            "title": "银行台账",
            "fUrl": "/fund/banks/bankFundRecordList"
        },{
            "index": "banksReconciliation_id=1",
            "title": "对账结果",
            "fUrl": "/fund/banks/reconciliation/list_r"
        }]
    },{
        "index": 2,
        "title": "签约管理",
        "subs": [{
            "index": "bankmanagerPlatSign_id=0",
            "title": "交易所签约解约",
            "fUrl": "/fund/bankmanager/platSign/list_r"
        },{
            "index": "bankmanagerCenterSign_id=0",
            "title": "运营中心签约解约",
            "fUrl": "/fund/bankmanager/centerSign/list_r"
        },{
            "index": "bankmanagerOperatorsSign_id=0",
            "title": "运营商签约解约",
            "fUrl": "/fund/bankmanager/operatorsSign/list_r"
        },{
            "index": "bankmanagerTraderSign_id=0",
            "title": "交易员签约解约",
            "fUrl": "/fund/bankmanager/traderSign/list_r"
        }, /* {
            "index": "bankmanagerDriversSign_id=1",
            "title": "司机签约管理",
            "fUrl": "/fund/bankmanager/DriversSign/list_r"
        }, {
            "index": "bankmanagerBalance_id=2",
            "title": "银行余额查询",
            "fUrl": "/fund/bankmanager/balance/list_r"
        }, {
            "index": "bankmanagerAgentSign_id=3",
            "title": "经纪人签约管理",
            "fUrl": "/fund/bankmanager/agentSign/list_r"
        } */]
    }, /* {
        "index": 2,
        "title": "运营商出账管理",
        "subs": [{
            "index": "outFundDealerDetailed_id=0",
            "title": "运营商出账明细查询",
            "fUrl": "/fund/outFundDealer/Detailed/list_r"
        }, {
            "index": "outFundDealerException_id=1",
            "title": "运营商出账异常处理",
            "fUrl": "/fund/outFundDealer/Exception/list_r"
        }, {
            "index": "outFundDealerCheck_id=2",
            "title": "运营商出账审核",
            "fUrl": "/fund/outFundDealer/check/list_r"
        }, {
            "index": "outFundDealerCheckResult_id=3",
            "title": "运营商出账审核结果",
            "fUrl": "/fund/outFundDealer/checkResult/list_r"
        }, {
            "index": "outFundDealerAuditTeam_id=4",
            "title": "运营商出账审核组管理",
            "fUrl": "/fund/outFundDealer/auditTeam/list_r"
        }]
    }, {
        "index": 3,
        "title": "司机出账管理",
        "subs": [{
            "index": "outFundDriverDetailed_id=0",
            "title": "司机出账明细查询",
            "fUrl": "/fund/outFundDriver/Detailed/list_r"
        }, {
            "index": "outFundDriverException_id=1",
            "title": "司机出账异常处理",
            "fUrl": "/fund/outFundDriver/Exception/list_r"
        }, {
            "index": "outFundDriverCheck_id=2",
            "title": "司机出账审核",
            "fUrl": "/fund/outFundDriver/check/list_r"
        }, {
            "index": "outFundDriverCheckResult_id=3",
            "title": "司机出账审核结果",
            "fUrl": "/fund/outFundDriver/checkResult/list_r"
        }, {
            "index": "outFundDriverAuditTeam_id=4",
            "title": "司机出账审核组管理",
            "fUrl": "/fund/outFundDriver/auditTeam/list_r"
        }]
    }, */ 
	{
	    "index": 3,
	    "title": "提现管理",
	    "subs": [{
	        "index": "outFundCenterDetailed_id=0",
	        "title": "交易中心提现明细查询",
	        "fUrl": "/fund/outFundCenter/Detailed/list_r"
	    }, {
	        "index": "outFundCenterWithdraw_id=1",
	        "title": "交易中心提现",
	        "fUrl": "/fund/outFundDriver/Exception/list_r"
	    }, {
	        "index": "outFundMemberDetailed_id=2",
	        "title": "运营商提现明细查询",
	        "fUrl": "/fund/outFundDriver/check/list_r"
	    }, {
	        "index": "outFundMemberCheckWithdraw_id=3",
	        "title": "运营商提现审核",
	        "fUrl": "/fund/outFundDriver/checkResult/list_r"
	    }, {
	        "index": "outFundTraderDetailed_id=4",
	        "title": "交易员提现明细查询",
	        "fUrl": "/fund/outFundDriver/auditTeam/list_r"
	    }, {
	        "index": "outFundTraderCheckWithdraw_id=5",
	        "title": "交易员提现审核",
	        "fUrl": "/fund/outFundDriver/auditTeam/list_r"
	    }, {
	        "index": "outFundCheckSetting_id=6",
	        "title": "提现审核设置",
	        "fUrl": "/fund/outFundDriver/auditTeam/list_r"
	    }, {
	        "index": "outFundTimeSetting_id=7",
	        "title": "提现时间设置",
	        "fUrl": "/fund/outFundDriver/auditTeam/list_r"
	    }]
	},
	{
        "index": 4,
        "title": "支付管理",
        "subs": [
			// {
   //          "index": "payManagementTraderDetailed_id=0",
   //          "title": "用户支付明细查询",
   //          "fUrl": "/fund/payManagement/traderDetailed/list_r"
   //      }, {
   //          "index": "payManagementTraderRefund_id=1",
   //          "title": "用户退款异常查询",
   //          "fUrl": "/fund/payManagement/traderRefund/list_r"
   //      }, {
   //          "index": "payManagementTraderRefundResult_id=2",
   //          "title": "用户退款明细查询",
   //          "fUrl": "/fund/payManagement/traderRefundResult/list_r"
   //      }, {
   //          "index": "payManagementDealerDetailed_id=3",
   //          "title": "交易商支付明细查询",
   //          "fUrl": "/fund/payManagement/dealerDetailed/list_r"
   //      }, {
   //          "index": "payManagementDealerRefund_id=4",
   //          "title": "交易商退款异常查询",
   //          "fUrl": "/fund/payManagement/dealerRefund/list_r"
   //      }, {
   //          "index": "payManagementDealerRefundResult_id=5",
   //          "title": "交易商退款明细查询",
   //          "fUrl": "/fund/payManagement/dealerRefundResult/list_r"
   //      }, {
   //          "index": "payManagementRefundInfo_id=6",
   //          "title": "用户服务费返还",
   //          "fUrl": "/fund/payManagement/refundInfo/list_r"
   //      }, {
   //          "index": "payManagementRefundConsumerFreight_id=7",
   //          "title": "用户运费退款",
   //          "fUrl": "/fund/payManagement/refundConsumerFreight/list_r"
   //      }, {
   //          "index": "payManagementRefundDealerFreight_id=8",
   //          "title": "交易商运费退款",
   //          "fUrl": "/fund/payManagement/refundDealerFreight/list_r"
   //      },
			{
			    "index": "payManagementCenterDetailed_id=0",
			    "title": "运营中心付款明细查询",
			    "fUrl": "/fund/payManagement/center/detail_list"
			}, /* {
			    "index": "payManagementCenterPay_id=1",
			    "title": "运营中心付款",
			    "fUrl": "/fund/payManagement/center/pay_list"
			}, */ {
			    "index": "payManagementCenterRefund_id=2",
			    "title": "运营中心退款",
			    "fUrl": "/fund/payManagement/center/refund_list"
			}, {
			    "index": "payManagementTraderDetailed_id=3",
			    "title": "交易员支付明细查询",
			    "fUrl": "/fund/payManagement/trader/detail_list"
			}, {
			    "index": "payManagementTraderRefund_id=4",
			    "title": "交易员支付退款",
			    "fUrl": "/fund/payManagement/trader/refund_list"
			}, 
		]
    }, /* {
        "index": 5,
        "title": "二级手工结算",
        "subs": [{
            "index": "handSettlementAgentTransfer_id=0",
            "title": "经纪人服务费划转",
            "fUrl": "/fund/handSettlement/agentTransfer/list_r"
        }, {
            "index": "handSettlementCustomerServiceTransfer_id=1",
            "title": "客服服务费划转",
            "fUrl": "/fund/handSettlement/customerServiceTransfer/list_r"
        }, {
            "index": "handSettlementDispatcherTransfer_id=2",
            "title": "调度员服务费划转",
            "fUrl": "/fund/handSettlement/dispatcherTransfer/list_r"
        }]
    }, */  /* {
        "index": 7,
        "title": "交易中心出账管理",
        "subs": [{
            "index": "outFundExchangeDetailed_id=0",
            "title": "交易中心出账明细查询",
            "fUrl": "/fund/outFundExchange/detailed/list_r"
        }, {
            "index": "outFundExchangeOutFund_id=1",
            "title": "交易中心出账",
            "fUrl": "/fund/outFundExchange/outFund/list_r"
        }, {
            "index": "outFundExchangeUpdatePassward_id=2",
            "title": "修改资金密码",
            "fUrl": "/fund/outFundExchange/updatePassward/update"
        }]
    }, {
        "index": 8,
        "title": "经纪人出账管理",
        "subs": [{
            "index": "outFundAgentDetail_id=0",
            "title": "经纪人出账明细查询",
            "fUrl": "/fund/outFundAgent/detail/list_r"
        }, {
            "index": "outFundAgentException_id=1",
            "title": "经纪人出账异常处理",
            "fUrl": "/fund/outFundAgent/exception/list_r"
        }, {
            "index": "outFundAgentCheck_id=2",
            "title": "经纪人出账审核",
            "fUrl": "/fund/outFundAgent/check/list_r"
        }, {
            "index": "outFundAgentCheckResult_id=3",
            "title": "经纪人出账审核结果",
            "fUrl": "/fund/outFundAgent/checkResult/list_r"
        }, {
            "index": "outFundAgentAuditTeam_id=4",
            "title": "经纪人出账审核组管理",
            "fUrl": "/fund/outFundAgent/auditTeam/list_r"
        }]
    } */]
}, {
    "index": 8,
    "title": "系统管理",
    "list": [{
        "index": 1,
        "title": "公告管理",
        "subs": [{
            "index": "systemManagerNoticeList",
            "title": "发布公告",
            "fUrl": "/systemManager/notice/introduced/list_r"
        }, {
            "index": "systemManagerNoticeAudit",
            "title": "审核公告",
            "fUrl": "/systemManager/notice/auditing/list_r"
        }]
    }, {
        "index": 2,
        "title": "日志管理",
        "subs": [{
            "index": "systemManagerLogOpertorList",
            "title": "后台操作日志",
            "fUrl": "/systemManager/log/backPlatform/list_r"
        }, {
            "index": "systemManagerLogLoginList",
            "title": "系统登录日志",
            "fUrl": "/systemManager/log/systemPlatform/list_r"
        }]
    }]
}, {
    "index": 6,
    "title": "交易查询",
    "list": [{
        "index": 1,
        "title": "客户查询",
        "subs": [{
            "index": "reportCustomerMoneyList",
            "title": "客户资金查询",
            "fUrl": "/report/customer/money/list_r"
        }, {
            "index": "reportCustomerMoneyWaterList",
            "title": "客户资金流水查询",
            "fUrl": "/report/customer/moneyWater/list_r"
        }, {
            "index": "reportCustomeOrderList",
            "title": "客户订单查询",
            "fUrl": "/report/customer/order/list_r"
        }, {
            "index": "reportCustomerWaybillList",
            "title": "客户运单查询",
            "fUrl": "/report/customer/waybill/list_r"
        }]
    }, {
        "index": 2,
        "title": "司机查询",
        "subs": [{
            "index": "reportDriverMoneyList",
            "title": "司机资金查询",
            "fUrl": "/report/driver/money/list_r"
        }, {
            "index": "reportDriverMoneyWaterList",
            "title": "司机资金流水查询",
            "fUrl": "/report/driver/moneyWater/list_r"
        }, {
            "index": "reportDriverWaybillList",
            "title": "司机运单查询",
            "fUrl": "/report/driver/traderMoney/list_r"
        }]
    }, {
        "index": 3,
        "title": "经纪人查询",
        "subs": [{
            "index": "reportAgentMoneyList",
            "title": "经纪人资金查询",
            "fUrl": "/report/agent/money/list_r"
        }, {
            "index": "reportAgentMoneyWaterList",
            "title": "经纪人资金流水查询",
            "fUrl": "/report/agent/moneyWater/list_r"
        }, {
            "index": "reportAgentOrderList",
            "title": "经纪人订单查询",
            "fUrl": "/report/agent/agentOrder/list_r"
        }, {
            "index": "reportAgentWaybillList",
            "title": "经纪人运单查询",
            "fUrl": "/report/agent/agentWaybill/list_r"
        }]
    }, /* {
        "index": 4,
        "title": "客服查询",
        "subs": [{
            "index": "reportCustomerServiceMoneyList",
            "title": "客服资金查询",
            "fUrl": "/report/customerService/money/list_r"
        }, {
            "index": "reportCustomerServiceMoneyWaterList",
            "title": "客服资金流水查询",
            "fUrl": "/report/customerService/moneyWater/list_r"
        }, {
            "index": "reportCustomerServiceOrderList",
            "title": "客服订单查询",
            "fUrl": "/report/customerService/order/list_r"
        }, {
            "index": "reportCustomerServiceWaybillList",
            "title": "客服运单查询",
            "fUrl": "/report/customerService/waybill/list_r"
        }]
    }, {
        "index": 5,
        "title": "调度员查询",
        "subs": [{
            "index": "reportDispatcherMoneyList",
            "title": "调度员资金查询",
            "fUrl": "/report/dispatcher/money/list_r"
        }, {
            "index": "reportDispatcherMoneyWaterList",
            "title": "调度员资金流水查询",
            "fUrl": "/report/dispatcher/moneyWater/list_r"
        }, {
            "index": "reportDispatcherOrderList",
            "title": "调度员订单查询",
            "fUrl": "/report/dispatcher/order/list_r"
        }, {
            "index": "reportDispatcherWaybillList",
            "title": "调度员运单查询",
            "fUrl": "/report/dispatcher/waybill/list_r"
        }]
    }, */ {
        "index": 6,
        "title": "运营商查询",
        "subs": [{
            "index": "reportMemberMoneyList",
            "title": "运营商资金查询",
            "fUrl": "/report/carrier/money/list_r"
        }, {
            "index": "reportMemberMoneyWaterList",
            "title": "运营商资金流水查询",
            "fUrl": "/report/carrier/moneyWater/list_r"
        }, {
            "index": "reportCustomerServiceMoneyWaterList",
            "title": "客服资金流水查询",
            "fUrl": "/report/customerService/moneyWater/list_r"
        }, {
            "index": "reportDispatcherMoneyWaterList",
            "title": "调度员资金流水查询",
            "fUrl": "/report/dispatcher/moneyWater/list_r"
        }, {
            "index": "reportMembeOrderList",
            "title": "订单查询",
            "fUrl": "/report/carrier/moneyWater/list_r"
        }, {
            "index": "reportMemberWaybillList",
            "title": "运单查询",
            "fUrl": "/report/carrier/moneyWater/list_r"
        }]
    }, {
        "index": 7,
        "title": "运营中心查询",
        "subs": [{
            "index": "reportCenterMoneyList",
            "title": "运营中心资金查询",
            "fUrl": "/report/center/money/list_r"
        },{
            "index": "reportCenterMoneyWaterList",
            "title": "运营中心资金流水查询",
            "fUrl": "/report/center/money/list_r"
        }]
    }, {
        "index": 8,
        "title": "交易中心查询",
        "subs": [{
            "index": "reportExchangeMoneyList",
            "title": "交易中心资金查询",
            "fUrl": "/report/center/money/list_r"
        },{
            "index": "reportExchangeMoneyWaterList",
            "title": "交易中心资金流水查询",
            "fUrl": "/report/center/money/list_r"
        }]
    }, {
        "index": 10,
        "title": "其他查询",
        "subs": [{
            "index": "reportOtherDrivergpsList",
            "title": "司机定位查询",
            "fUrl": "/report/other/driverGps/list_r"
        }, {
            "index": "reportOtherMarketPriceList",
            "title": "市场报价查询",
            "fUrl": "/report/other/marketPrice/list_r"
        }, {
            "index": "reportOtherSystemHqList",
            "title": "市场行情查询",
            "fUrl": "/report/other/systemHq/list_r"
        }]
    }]
}, {
    "index": 4,
    "title": "运营管理",
    "list": [{
        "index": 1,
        "title": "市场管理",
        "subs": [{
            "index": "businessOpeningClosing",
            "title": "开休市管理",
            "fUrl": "/parameter/poundage/defaultpoundage/list_r"
        }, {
            "index": "businessSetUp",
            "title": "结算设置",
            "fUrl": "/parameter/poundage/custompoundage/list_r"
        }, {
            "index": "businessHandSettlement",
            "title": "手工结算",
            "fUrl": "/parameter/poundage/custompoundage/list_r"
        }]},
        {
            "index": 2,
            "title": "运营管理",
            "subs": [{
                "index": "businessPlanningPromotion",
                "title": "推广管理",
                "fUrl": "/parameter/poundage/defaultpoundage/list_r"
            }, {
                "index": "businessFeedback",
                "title": "投诉管理",
                "fUrl": "/parameter/poundage/custompoundage/list_r"
            }, {
                "index": "businessEvaluate",
                "title": "评价管理",
                "fUrl": "/parameter/poundage/custompoundage/list_r"
            }, {
                "index": "businessDriverPromotionSum",
                "title": "司机推广统计",
                "fUrl": "/businessManagement/driverPromotion/sum/list"
            }, {
                "index": "businessPointConsume",
                "title": "积分提现管理",
                "fUrl": "/businessManagement/point/consume/list"
            }]},
            {
                "index": 3,
                "title": "其他管理",
                "subs": [{
                    "index": "businessUserUnlock",
                    "title": "用户解锁",
                    "fUrl": "/parameter/poundage/defaultpoundage/list_r"
                }, {
                    "index": "businessMarketInfo",
                    "title": "市场行情管理",
                    "fUrl": "/parameter/poundage/custompoundage/list_r"
                }]}
]
}, {
    "index": 7,
    "title": "统计分析",
    "list": [{
        "index": 1,
        "title": "开户统计",
        "subs": [{
            "index": "platUserStatistics",
            "title": "交易所客户统计",
            "fUrl": "/statistics/users/plat/platUserList"
        }, {
            "index": "platDriverStatistics",
            "title": "交易所司机统计",
            "fUrl": "/statistics/users/plat/platDriverList"
        }, {
            "index": "memberUserStatistics",
            "title": "运营商客户统计",
            "fUrl": "/statistics/users/member/memberUserList"
        }, {
            "index": "memberDriverStatistics",
            "title": "运营商司机统计",
            "fUrl": "/statistics/users/member/memberDriverList"
        }]},
        {
            "index": 2,
            "title": "交易统计",
            "subs": [{
                "index": "platTransStatistics",
                "title": "交易所统计分析",
                "fUrl": "/statistics/trans/plat/platTransList"
            }, {
                "index": "centerTransStatistics",
                "title": "运营中心统计分析",
                "fUrl": "/statistics/trans/center/centerTransList"
            }, {
                "index": "memberTransStatistics",
                "title": "运营商统计分析",
                "fUrl": "/statistics/trans/member/memberTransList"
            }, {
                "index": "orgTransStatistics",
                "title": "机构统计分析",
                "fUrl": "/statistics/trans/org/orgTransList"
            }, {
                "index": "customerServiceTransStatistics",
                "title": "客服统计分析",
                "fUrl": "/statistics/trans/customerService/customerServiceTransList"
            }, {
                "index": "dispatchTransStatistics",
                "title": "调度统计分析",
                "fUrl": "/statistics/trans/dispatch/dispatchTransList"
            }, {
                "index": "brokerTransStatistics",
                "title": "经纪人统计分析",
                "fUrl": "/statistics/trans/broker/brokerTransList"
            }, {
                "index": "customerTransStatistics",
                "title": "客户统计分析",
                "fUrl": "/statistics/trans/customer/customerTransList"
            }, {
                "index": "driverTransStatistics",
                "title": "司机统计分析",
                "fUrl": "/statistics/trans/driver/driverTransList"
            }]},
            {
                "index": 3,
                "title": "绩效考核",
                "subs": [{
                    "index": "customerServiceKPI",
                    "title": "客服绩效",
                    "fUrl": "/statistics/kpi/trader/customerServiceKPI"
                }, {
                    "index": "dispatcherKPI",
                    "title": "调度绩效",
                    "fUrl": "/statistics/kpi/trader/dispatcherKPI"
				}
		   ]},
            {
                "index": 4,
                "title": "评分统计",
                "subs": [{
                    "index": "customerServiceScoreStatistics",
                    "title": "客服评分统计",
                    "fUrl": "/statistics/score/customerService/customerServiceScoreList"
                }, {
                    "index": "dispatchScoreStatistics",
                    "title": "调度评分统计",
                    "fUrl": "/statistics/score/dispatch/dispatchScoreList"
				},
				{
				    "index": "customerScoreStatistics",
				    "title": "客户评分统计",
				    "fUrl": "/statistics/score/customer/customerScoreList"
				}, {
				    "index": "driverScoreStatistics",
				    "title": "司机评分统计",
				    "fUrl": "/statistics/score/driver/driverScoreList"
				},
		   ]},
            {
                "index": 5,
                "title": "排名统计",
                "subs": [{
                    "index": "memberRankStatistics",
                    "title": "运营商排名Top100",
                    "fUrl": "/statistics/rank/member/memberRankList"
                }, {
                    "index": "customerServiceRankStatistics",
                    "title": "客服排名Top100",
                    "fUrl": "/statistics/rank/customerService/customerServiceRankList"
				},
				{
				    "index": "dispatchRankStatistics",
				    "title": "调度排名Top100",
				    "fUrl": "/statistics/rank/dispatch/dispatchRankList"
				}, {
				    "index": "customerRankStatistics",
				    "title": "客户排名Top100",
				    "fUrl": "/statistics/rank/customer/customerRankList"
				},{
				    "index": "driverRankStatistics",
				    "title": "司机排名Top100",
				    "fUrl": "/statistics/rank/driver/driverRankList"
				}
		   ]},
            {
                "index": 6,
                "title": "其他统计",
                "subs": [{
                    "index": "provinceWeightTrafficStatistics",
                    "title": "省级货运量排名",
                    "fUrl": "/statistics/others/freightTraffic/provinceWeightTrafficRank"
                }, {
                    "index": "lineWeightTrafficStatistics",
                    "title": "线路货运量排名",
                    "fUrl": "/statistics/others/freightTraffic/lineWeightTrafficRank"
				},
				{
				    "index": "carUserRateStatistics",
				    "title": "车辆使用率排名",
				    "fUrl": "/statistics/others/userRate/carUserRateRank"
				}
		   ]}
]
}];
export default reslist;