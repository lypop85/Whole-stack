module.exports = app => {
    const mongooes = require('mongoose')
    mongooes.connect('mongodb://localhost:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongooes.connection.once('open', function() {
        console.log('数据库连接成功')
    }).on('error', function() {
        console.log('数据库连接失败')
    })
}