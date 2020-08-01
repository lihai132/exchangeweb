module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            // '/api':{
            //     target:'http://jsonplaceholder.typicode.com',
            //     changeOrigin:true,
            //     pathRewrite:{
            //         '/api':''
            //     }
            // }
			 "/baidu_token":{
                target:'https://aip.baidubce.com/',
                changeOrigin:true,
                pathRewrite:{
                    '^/baidu_token':'/'
                }
            }
        }
    }
}