const express = require('express')
const Router = express.Router()

Router.get('/', (req,res) => {
    let user = req.cookies.data
    res.render('./thongbao/notification',{user:user,displayName:user.displayName})
})

Router.get('/detail/:id_thongbao', (req,res) => {
    let {id_thongbao} = req.params
    let user = req.cookies.data
    res.render('./thongbao/detail_notification', {id_thongbao,user:user,displayName:user.displayName})
})

module.exports = Router