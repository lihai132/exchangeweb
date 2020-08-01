export default {
    state: {
        loginData: {},
		//url: "http://127.0.0.1:9010",
        url: "http://192.168.0.230:9010",
        key: "",
        addressList: [],
        menuList: [],
        list: [],
        actionList: []
        
    },
    mutations: {
        setLogin(state, n) {
            state.loginData = n;
        },
        setkey(state, n) {
            state.key = n;
        },
        setaddressList(state, n) {
            state.addressList = n;
        },
        setmenuList(state, n) {
            state.menuList = n;
        },
        setList(state, n) {
            state.List = n;
        },
        setactionList(state, n) {
            state.actionList = n;
        }
        
    }
}