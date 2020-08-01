export default {
    /**
     * v不能为空，若为空，弹消息，请输入name,返回false
     * @param {*} obj 
     * @param {*} value 
     * @param {*} messageStr 
     */
    notNulWarn(obj,value,name) {
        if(value === null || value === undefined || value === '' ){
            obj.$message({message: '请输入'+name,type: 'error'});
            return false;
        }
        return true;
    },
    /**
     * v1不能大于v2，如果v1大于v2，弹消息，name1不能大于name2，返回false
     * @param {*} obj 消息弹窗所在对象
     * @param {*} value1 
     * @param {*} name1 v1的名称
     * @param {*} value2 
     * @param {*} name2 v2的名称
     */
    v1NotGTv2(obj,value1,name1,value2,name2) {
        if(value1 >= value2){
            obj.$message({message: name1+"不能大于"+name2,type: 'error'});
            return false;
        }
        return true;
    },
    maxlenthCharge:"7",
    percent(obj){
		obj.value = obj.value.replace(/[^0-9.]|^\./g,'').replace(/\.{2,}/g,'.').replace(/^0[0-9]/,'0');
		obj.value = obj.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		if (obj.value > 100 ){
			obj.value = 100;
		}
    },
    /**
     * 限制只能输入数字
     * @param {*} obj 为页面data对象，传参方式为 $data.data 
     * @param {*} pro 属性名称字符串
     * 如果有第三个参数则表示限制的长度
     */
    onlyNumber(obj,pro){
        var temp = obj[pro];
        temp = temp.toString().replace(/[^0-9]/g,'');
        if(arguments.length > 2){
            temp = temp.slice(0,parseInt(arguments[2]));
        }
        return obj[pro] = temp;
    }
}