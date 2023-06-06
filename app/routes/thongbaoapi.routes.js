const express = require('express')
const Router = express.Router()
const Thongbao = require('../models/thongbao.model')
const Chuyenmuc = require('../models/chuyenmuc.model')


//api phan trang thong bao
Router.get('/', (req,res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    console.log(limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    let lengthOfResult

    Thongbao.find().sort({ _id: -1 }).select("chuyenmuc tieude_thongbao noidung_thongbao created_at")
    .populate("chuyenmuc")
    .then(thongbaos => {
        if(page && limit){
            lengthOfResult = thongbaos.length
            if(endIndex < lengthOfResult){
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
        
            if(startIndex > 0){
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.results = thongbaos.slice(startIndex, endIndex)
            res.json(results)
        }
        else{
            results.results = thongbaos
            res.json(
                results
            )
        }
    })
})

// API search thongbao
Router.get('/search', (req,res) => {
    let idchuyenmuc_search_param = req.query.idchuyenmuc
    let title_search_param = req.query.title
    let content_search_param = req.query.content


    const results = {}

    // console.log('----------------------')
    // if(idchuyenmuc_search_param){
    //     console.log('idchuyenmuc_search_param - True')
    // }else{
    //     console.log('idchuyenmuc_search_param - False')
    // }

    if(idchuyenmuc_search_param && !title_search_param && !content_search_param){
        Thongbao.find({ chuyenmuc: idchuyenmuc_search_param}).sort({ _id: -1 }).select("chuyenmuc tieude_thongbao noidung_thongbao created_at")
        .populate("chuyenmuc")
        .then(thongbaos => {
            results.results = thongbaos
            res.json(
                results
            )
        })
        .catch(e => {
            return res.json({code: 0, message: e.message})
        })
    }
})

Router.get('/:id_thongbao', async (req,res) => {
    let {id_thongbao} = req.params
    
    Thongbao.findById(id_thongbao)
    .populate("chuyenmuc")        
    .then(thongbao => {
        if(thongbao) {
            return res.json({code: 200, message: 'Đã tìm thấy thông báo',
                data: thongbao
            })
        }
        else return res.json({code: 0, message: 'Không tìm thấy thông báo'})
    })
    .catch(e => {
        return res.json({code: 0, message: e.message})
    })


    // const results = {}
    // await Thongbao.findById(id_thongbao).exec().select("chuyenmuc tieude_thongbao noidung_thongbao created_at")
    // .populate("chuyenmuc")
    // .then(thongbaos => {
    //     results.results = thongbaos
    //     res.json(
    //         results
    //     )
        
    // })
})


module.exports = Router