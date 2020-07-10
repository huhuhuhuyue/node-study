const {EventEmitter} = require('events')
module.exports = class Connection {
    // ##BEGIN## 代码已加密
    constructor () {
      this.emmiter = new EventEmitter()
    }
    onConn (mockFn) {
      this.emmiter.on('connection', mockFn)
    }
    connection (msg) {
      this.emmiter.emit('connection', msg)
    }
    // ##END##
}
// 今日暗号：搜索算法