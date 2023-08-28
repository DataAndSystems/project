export default {
    //判断对象中是否有属性
    isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
        return key in object;
    },
    //判断当前环境是否为微信小程序
    isMiniProgram() {
        let judgeMiniProgram = false;
        // 先验证是否在微信类浏览器中
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            window['wx'].miniProgram.getEnv((res: any) => {
                if (res.miniprogram) {
                    console.log('在小程序里');
                    judgeMiniProgram = true;
                } else {
                    console.log('不在小程序里');
                    judgeMiniProgram = false;
                }
            });
        } else {
            console.log('不在微信里');
            judgeMiniProgram = false;
        }
        return judgeMiniProgram;
    },
    //获取当前环境的baseURL
    getLocationUrl() {
        let env = process.env.REACT_APP_ENV;
        let baseUrl = '';
        //开发环境
        if (env === 'development') {
            baseUrl = 'http://106.14.197.93:9090/'
        }
        //测试环境
        else if (env === 'test') {
            baseUrl = 'https://edc-saas-test.huimeimt.com/wechat/'
        }
        //生产环境（未定）
        else if (env === 'production') {
            baseUrl = 'https://edc-saas-test.huimeimt.com/wechat/'
        }
        return baseUrl;
    }
}