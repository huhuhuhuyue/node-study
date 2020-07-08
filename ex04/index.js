const Sequelize = require('sequelize');
module.exports.initModel = async sequelize => {
  // ##BEGIN## 代码已加密
  const User = sequelize.define('user', {
    name: Sequelize.STRING
  }, {
    timestamps: false
  })
  const Product = sequelize.define('product', {
    title: Sequelize.STRING
  }, {
    timestamps: false
  })
  User.hasMany(Product)
  await sequelize.sync({force: true})
  // ##END##
  return { User, Product }
} 
// 今日暗号：哈希算法