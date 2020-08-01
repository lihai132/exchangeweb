export default {
    state: {
       popup1:{},
       show1:false
        
    },
    mutations: {
        setPopup1(state, n) {
            state.popup1 = n;
        },
        setShow1(state, n) {
            state.show1 = n;
        }
        
    }
}