import login from "../store/login.js";
import request from '../assets/Public/request.js';

const getImgBasePath = async () =>  {
	let imgBasePath =  localStorage.getItem('imgBasePath');
	if(!imgBasePath){
		let res = await request('/image/basePath/get', {});
		imgBasePath = res.data;
		if(imgBasePath){
			localStorage.setItem('imgBasePath', imgBasePath);
		}
	}
	return imgBasePath;
}

//后台图片识别地址
const distinguish_Image_Base_Path = "http://vtrade.gdzxjy.net/";

const correctIDCardFormat = (idcode) => {
	// 格式的正则
	// 正则思路
	/*
	第一位不可能是0
	第二位到第六位可以是0-9
	第七位到第十位是年份，所以七八位为19或者20
	十一位和十二位是月份，这两位是01-12之间的数值
	十三位和十四位是日期，是从01-31之间的数值
	十五，十六，十七都是数字0-9
	十八位可能是数字0-9，也可能是X
	*/
	var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
	return idcard_patter.test(idcode);
}

const baiduToken_apiKey="xfL8VlHVjY1ubdZU8tpyhzoN";
const baiduToken_secretKey="4u8FDsdEUE2PPazEOSvyrfLZvmapPpky";

const accountNameRegStr = "[a-zA-Z0-9\u4e00-\u9fa5]";

export default{
	isEmpty(val){
		if(val==null||val==undefined||val===""){
			return true;
		}
		return false;
	},
	baiduToken:{
		apiKey:baiduToken_apiKey,
		secretKey:baiduToken_secretKey
	},
	// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
	// 详情查看javascript的数值范围
	isInvalidIDCard(idcode){
		return !correctIDCardFormat(idcode);
		// 	// 加权因子
		//     var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
		//     // 校验码
		//     var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
		
		//     var code = idcode + "";
		//     var last = idcode[17];//最后一位
		
		//     var seventeen = code.substring(0,17);
		
		//     // ISO 7064:1983.MOD 11-2
		//     // 判断最后一位校验码是否正确
		//     var arr = seventeen.split("");
		//     var len = arr.length;
		//     var num = 0;
		//     for(var i = 0; i < len; i++){
		//         num = num + arr[i] * weight_factor[i];
		//     }
		    
		//     // 获取余数
		//     var resisue = num%11;
		//     var last_no = check_code[resisue];
		
		//     // 判断格式是否正确
		//     var format = correctIDCardFormat(idcode);
		
		//     // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
		//     return last === last_no && format ? false : true;
	},
	isBadIDCardFormat(idcode){
		return !correctIDCardFormat(idcode);
	},
	isInvalidMobilePhone(mobilePhone){
		return !(/^1[3456789]\d{9}$/.test(mobilePhone));
	},
	searchCitys(cityArrays,selectedCityId){
		let tempSelectedCitys=[];
		for(let i=0;i<cityArrays.length;i++){
			let p = cityArrays[i];
			if(selectedCityId==p.value){
				tempSelectedCitys = [p.value];
				return tempSelectedCitys;
			}
			if(this.isEmpty(p.children)){
				continue;
			}
			for(let j=0;j<p.children.length;j++){
				let c = p.children[j];
				if(selectedCityId==c.value){
					tempSelectedCitys = [p.value,c.value];
					return tempSelectedCitys;
				}
				if(this.isEmpty(c.children)){
					continue;
				}
				for(let k=0;k<c.children.length;k++){
					let d = c.children[k];
					if(selectedCityId==d.value){
						tempSelectedCitys = [p.value,c.value,d.value];
						return tempSelectedCitys;
					}
				}
			}
		}
	},
	distinguishImageBaseUrl:distinguish_Image_Base_Path,
	imgUploadUrl:login.state.url+'/zuul/images/uploadFile',
	imgBaseUrl(){
		getImgBasePath();
		return localStorage.getItem('imgBasePath');
	},
	readFileAsDataURL(file) {
		return new Promise(function(resolve, reject) {
			let reader = new FileReader();
			let imgResult = '';
			reader.readAsDataURL(file);
			reader.onload = function() {
				imgResult = reader.result;
			};
			reader.onerror = function(error) {
				reject(error);
			};
			reader.onloadend = function() {
				resolve(imgResult);
			};
		});
	},
	trimForAccountName(val){
		if(val==null||val==undefined||val===''){
			return val;
		}
		var str = (val+"").trim();
		if(str.length==0){
			return str;
		}
		var chars = str.split("");
		var result = "";
		var reg=new RegExp("^"+accountNameRegStr+"$");
		for(var i=0;i<chars.length;i++){
			var c = chars[i];
			if(reg.test(c)){
				result += c;
				continue;
			}
		}
		return result;
	},
	plateNumberRegTest(val){
		var reg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/;
		return reg.test(val);
	},
	//车辆识别码校验
	VINRegTest(val){
		var reg = /^[a-zA-Z0-9]{17}$/;
		return reg.test(val);
	},
	trimForVIN(val){
		if(val==null||val==undefined||val===''){
			return val;
		}
		var str = (val+"").trim();
		if(str.length==0){
			return str;
		}
		var chars = str.split("");
		var result = "";
		var reg=/^[a-zA-Z0-9]$/;
		for(var i=0;i<chars.length;i++){
			var c = chars[i];
			if(reg.test(c)){
				result += c;
				continue;
			}
		}
		return result;
	},
	accountNameRegTest(pwd){
		var reg = new RegExp("^"+accountNameRegStr+"{2,16}$");
		return reg.test(pwd);
	},
	loginAccountRegTest(pwd){
		var reg = new RegExp("^\\w{4,16}$");
		return reg.test(pwd);
	},
	loginPwdRegTest(pwd){
		var reg = new RegExp("^[a-zA-Z0-9~!@#$%^&*_+`\\-={}:\";'<>,.\\/]{8,16}$");
		return reg.test(pwd);
	},
	bankCarNoRegTest(carNo){
		var reg = /^\d{12,25}$/;
		return reg.test(carNo);
	},
	trimAll(val){
		if(val==null||val==undefined||val===''){
			return val;
		}
		var str = (val+"").trim();
		if(str.length==0){
			return str;
		}
		var i;
		while((i = str.indexOf(" "))>-1){
			var a = str.substring(0,i);
			var b = str.substring(i+1).trim();
			str = a+b;
		}
		return str;
	},
	trimForDigit(digit,
	{	//options(可选参数)
		maxPrecision,					//最大精度(小数位数)
		allowDecimal = maxPrecision>=1,	//是否允许小数
		allowNegtive,					//是否允许负数
		maxDigits,						//最大位数(不包括负号及小数点)
		max								//最大值
	}={}
		){
		if(digit==null||digit==undefined||digit===''){
			return digit;
		}
		var digitStr = (digit+"").trim();
		if(digitStr.length==0){
			return digitStr;
		}
		
		if((maxPrecision=parseInt(maxPrecision))<1){
			allowDecimal = false;
		}
		maxDigits=parseInt(maxDigits);
		
		var chars = digitStr.split("");
		var result = "";
		var reg=/^\d$/;
		var havntSetDot = true;
		var first = true;
		var precision = 0;
		var digits = 0;
		for(var i=0;i<chars.length;i++){
			var c = chars[i];
			if(first&&c!=' '){
				first = false;
				if(allowNegtive&&c=='-'){
					result += c;
					continue;
				}
			}
			if(reg.test(c)){
				if(maxDigits>=1&&++digits>maxDigits||
					!havntSetDot&&maxPrecision>=1&&++precision>maxPrecision){
					break;
				}
				result += c;
				continue;
			}
			if(allowDecimal&&c=='.'&&havntSetDot){
				var len;
				if(maxDigits>=1&&(len=result.length)>0&&
					((result.charAt(0)=='-'?len-1:len)>maxDigits)){
					break;
				}
				result += c;
				havntSetDot = false;
				continue;
			}
		}
		if(result.length>0&&!isNaN(max=parseFloat(max))){
			var len;
			while((len=result.length)>0&&result>max){
				result = result.substr(0,len-1);
			}
		}
		return result;
	},
}