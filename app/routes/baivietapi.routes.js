const express = require('express')
const Router = express.Router()
const Baiviet = require('../models/baiviet.model')

Router.get('/', (req,res) => {

    let user = req.cookies.data

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    let iduser = req.query.iduser
    let idanotheruser = req.query.idanotheruser

    

   

    console.log(limit,iduser,idanotheruser)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    let lengthOfResult

    if(iduser){
        console.log(user)
        Baiviet.find({id_user:user.userId}).sort({ _id: -1 }).select("id_user tieude noidung urlvideo urlImage id_comment")
        .populate(
            {   path : 'id_user',
                populate: {path : 'user'}
            }
        )
        .populate(
            {   path : 'id_comment',
                populate: {path : 'id_user'}
            }
        )
        .exec()
        .then(baiviets => {
            if(page && limit){
                lengthOfResult = baiviets.length
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
                results.results = baiviets.slice(startIndex, endIndex)
                results.user = user
                res.json(results)
            }
            else{
                results.results = baiviets
                results.user = user
                res.json(
                    results
                )
            }
        })
    }else if(idanotheruser){
        Baiviet.find({id_user:idanotheruser}).sort({ _id: -1 }).select("id_user tieude noidung urlvideo urlImage id_comment")
        .populate(
            {   path : 'id_user',
                populate: {path : 'user'}
            }
        )
        .populate(
            {   path : 'id_comment',
                populate: {path : 'id_user'}
            }
        )
        .exec()
        .then(baiviets => {
            if(page && limit){
                lengthOfResult = baiviets.length
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
                results.results = baiviets.slice(startIndex, endIndex)
                results.user = user
                res.json(results)
            }
            else{
                results.results = baiviets
                results.user = user
                res.json(
                    results
                )
            }
        })
    }else{
        Baiviet.find().sort({ _id: -1 }).select("id_user tieude noidung urlvideo urlImage id_comment")
        .populate(
            {   path : 'id_user',
                populate: {path : 'user'}
            }
        )
        .populate(
            {   path : 'id_comment',
                populate: {path : 'id_user'}
            }
        )
        .exec()
        .then(baiviets => {
            if(page && limit){
                lengthOfResult = baiviets.length
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
                results.results = baiviets.slice(startIndex, endIndex)
                results.user = user
                res.json(results)
            }
            else{
                results.results = baiviets
                results.user = user
                res.json(
                    results
                )
            }
        })
    }
   
})


module.exports = Router