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
function next (fn) {
  return () => {
    if (!fn) {
      return Promise.resolve()
    }
    return Promise.resolve(fn(next))
  }
}
module.exports.compose = middlewares => {
  if (middlewares.length === 0) return
  if (middlewares.length === 1) return middlewares[0]
  return middlewares.reduce((a, b) => {
    return () => {
      return Promise.resolve(
        a(next(b))
      )
    }
  })
}