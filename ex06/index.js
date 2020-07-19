const crypto = require('crypto')
module.exports.createToken = token => {
    const ary = token.split('.')
    if (ary.length !== 3) {
        return
    }
    return {
      getExp: () => {
        // ary[0]: {"alg":"HS256","typ":"JWT"}
        // ary[1]: {"data":{"username":"abc","password":"111111"},"exp":1591933872,"iat":1591930272}
        // ##BEGIN## 代码已加密

        // 方法一：利用js的方法进行Base64解码
        // btoa()：字符串或二进制值转为 Base64 编码。
        // atob()：把 Base64 编码转为原来的字符。
        // decodeURIComponent可以解码URI特殊字符（如#，/，￥等），而decodeURI则不能。
        // const b64Decode = decodeURIComponent(atob(ary[1]))
        // const exp = JSON.parse(b64Decode).exp
        
        // 方法二：利用Buffer进行Base64解码
        const b64Decode = Buffer.from(ary[1], 'base64').toString('utf-8')
        const exp = JSON.parse(b64Decode).exp
        return exp
        // ##END##
      },
      verify: key => {
        /**crypto.createHmac(params, key);
         * 第一个参数(params)含义是在Node.js中使用的算法，比如’sha1’, ‘md5’, ‘sha256’, 'sha512’等等，该方法返回的是hmac对象。
         * 第二个参数key参数值为一个字符串，用于指定一个PEM格式的密钥。
         */
        const hmac = crypto.createHmac('SHA256', key).update(ary[0]+ '.' +  ary[1]).digest('base64');
        return hmac === ary[2] + '='
      }
    }
}
