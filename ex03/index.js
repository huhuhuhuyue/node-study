const fs = require('fs')
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0; 
    return new Promise(resolve => {
        // ##BEGIN## 代码已加密
        readStream.on('data', data => {
          reqData.push(data);
          size += data.length;
        });
        readStream.on('end', function () {
          const data = Buffer.concat(reqData, size);
          // console.log('data:', size, data.toString())
          resolve(JSON.parse(data.toString()))
        });
        // ##END##
    })
}
