const fs = require('fs')
module.exports.createLoader = config => {
    const loader = (scanFolder, cb) => {
      // console.log(scanFolder); // E:\lx\k-node\zy\node-study\ex07\data\func
      const files = fs.readdirSync(scanFolder); // [ 'funcA.js', 'funcB.js' ]
      files.forEach(filename => {
        filename = filename.replace(".js", "");
        const file = require(scanFolder + "/" + filename);
        cb(filename, file);
      })
    }
    return {
      initFunction: scanFolder => {
        const ret = {}
        // ##BEGIN## 代码已加密
        loader(scanFolder, (filename, file) => {
          // console.log(filename, file);
          // funcA config => () => `funcA run` // funcB config => () => `funcB run config is ${config}`
          ret[filename] = file(config)
        });
        // ##END##
        return ret
      }
    }
}

