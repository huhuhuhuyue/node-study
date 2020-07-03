// 方法一：不使用reduce
// module.exports.compose = middlewares => {
//     return function () {
//         return dispatch(0)
//         function dispatch(i) {
//             // ##BEGIN## 代码已加密
//             let fn = middlewares[i]
//             if (!fn) {
//               return Promise.resolve()
//             }
//             return Promise.resolve(
//               fn(function next () {
//                 return dispatch(i + 1)
//               })
//             )
//             // ##END##
//         }
//     }
// }
// 方法二：使用reduce
module.exports.compose = middlewares => {
  if (middlewares.length === 0) return arg => arg
  if (middlewares.length === 1) return middlewares[0]
  return () => Promise.resolve(
    middlewares.reduce((a, b) => {
      return arg => {
        return Promise.resolve(a(() => b(arg)))
      }
    })(() => Promise.resolve())
  )
}
// 参考资料：https://segmentfault.com/a/1190000016707187