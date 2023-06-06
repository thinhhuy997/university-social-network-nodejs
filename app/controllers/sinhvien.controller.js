const db = require("../models");
const User = db.user;
const Role = db.role;
const Baiviet = db.baiviet;
const Comment = db.comment;
var bcrypt = require("bcryptjs");
const Chuyenmuc = require("../models/chuyenmuc.model");
// cap nhat thong tin sinh vien co upload anh
const multer = require('multer')
// upload for sinh vien
const upload = multer({dest:'../uploads/sinhvien/',fileFilter:(req,file,callback)=>{
  //console.log(file)  // in ra thu

  if(file.mimetype.startsWith('image/')){
      callback(null,true) // cho phep upload
  }else{
      callback(null,false) // k cho phep upload
  }
}}) 

exports.index = (req,res) => {
    let user = req.cookies.data
    console.log('user dang nhap')
    console.log(user)
    

    let userdata = User.findOne({_id:user.userId},(err,data)=>{
        if(err){
            return res.send('Có Lỗi Xảy Ra, Vui Lòng Thử Lại Sau')
        }
        return res.render('sinhvien/index',{displayName:user.displayName,user:data})
    })
    
  }



exports.dangbaiviet = async (req,res) => {

    let user = req.cookies.data
    let email = user.email

   

    try{

        const id_user = await User.findOne({
            email: email // truyen vao id_user.emiail
        });
        if (!id_user) res.status(400).send("khong tim thay id_user");

       
        let test = require('path').dirname('uploads')
        console.log(test)
        let uploader = upload.single('image')
        const fs = require('fs')
        uploader(req,res,err => {

            let {tieude, noidung, urlvideo} = req.body

            


            let image = req.file

            console.log(image)


            
            let error = undefined
            if(!image){
                error = 'chua co file anh hoac file khong dc chap nhan'
            }

            if(error){
                return res.json({code:0,message:'chua chon file anh'})
            }else{
                console.log(image)

                

                // upload file anh
                let dir = `./app/public/uploads/sinhvien/baiviet/${image.filename}`
                try {
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir) // tao thu muc
                        
                        let iamgePath = dir + `/${image.originalname}`
                        // doi ten file va dua file vao path
                        fs.renameSync(image.path,iamgePath)
                        fs.create 

                        
                        let baiviet = new Baiviet({
                            id_user: id_user,
                            tieude: tieude,
                            noidung: noidung,
                            urlvideo: [urlvideo],
                            urlImage: [ `/uploads/sinhvien/baiviet/${image.filename}` +  `/${image.originalname}` ],
                            
                        })
                        baiviet.save((err,data) => {
                            if(err){
                                return res.json({code:1,error:error})
                            }
                            return res.json({code:1,data:data})
                        })

        

                    }
                } catch (err){
                    return res.json({code:0,error:err})
                }
            }
        })
    }

    catch(error){
        res.status(500).send(error);
        console.log(error);
    }


    


}

exports.commentbaiviet = (req,res) => {

    let user = req.cookies.data

    let id_user = user.userId

   
    let {id_baiviet,noidung} = req.body
   
    console.log('test ',id_user,id_baiviet,noidung)

    let time = new Date().toLocaleString('en-US',{timeZone:'Asia/Ho_Chi_Minh'})
    console.log(time,id_user,noidung)
    let comment = new Comment({
       id_user:id_user,
       time:time,
       noidung:noidung
    })



    Baiviet.findById(id_baiviet,(err,baiviet) =>{
        if(err){
            return res.json({code:0,error:'khong tim ra id_baiviet'})
        }
        baiviet.id_comment.push(comment.id)
        baiviet.save((err,data)=>{
            if(err){
                return res.json({code:0,error:'khong luu bai viet thanh cong'})
            }
            comment.save((err,tmp) =>{
                if(err){
                    return res.json({code:0,error:'khong luu comment thanh cong, kiem tra id_user'})
                }
                User.findById(tmp.id_user,(err,ttuser)=>{
                    if(err){
                        return res.json({code:0,error:'khong tim ra id_baiviet'})
                    }
                    return res.json({code:1,data:data,comment:tmp,ttuser:ttuser})
                })
            })
         
          
        })
    })
  
}

exports.suabaiviet = async (req,res) => {

    let user = req.cookies.data

    let id_user = user.userId


   
    


    try{



       

       
        let test = require('path').dirname('uploads')
        console.log(test)
        let uploader = upload.single('image')
        const fs = require('fs')
        uploader(req,res,err => {

            let {idbaiviet,tieude, noidung, urlvideo} = req.body

            


            let image = req.file

            console.log(image)


            
            let error = undefined
            if(!image){
                error = 'chua co file anh hoac file khong dc chap nhan'
            }

            if(error){
                //  truong hop khong cap nhat anh 
                Baiviet.findOne({_id:idbaiviet},(err,data)=>{

                    if(id_user != data.id_user){
                        return res.json({"code":0,"message":"Bạn không có quyền thực hiện thao tác này"})
                    }

                    data.tieude = tieude
                    data.noidung = noidung

                    if (urlvideo.length > 0){
                        data.urlvideo = [urlvideo]
                    }

                    data.save((error,result) =>{
                        if (error){
                            return res.json({"code":0,"message":error})
                        }
                        return res.json({"code":1,"data":result})
                    })
                })

            }else{
                console.log(image)

                

                // upload file anh
                let dir = `./app/public/uploads/sinhvien/baiviet/${image.filename}`
                try {
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir) // tao thu muc
                        
                        let iamgePath = dir + `/${image.originalname}`
                        // doi ten file va dua file vao path
                        fs.renameSync(image.path,iamgePath)
                        fs.create 

                        
                        Baiviet.findOne({_id:idbaiviet},(err,data)=>{

                            if(id_user != data.id_user){
                                return res.json({"code":0,"message":"Bạn không có quyền thực hiện thao tác này"})
                            }

                            data.tieude = tieude
                            data.noidung = noidung
                            data.urlImage = [ `/uploads/sinhvien/baiviet/${image.filename}` +  `/${image.originalname}` ]
                            if (urlvideo.length > 0){
                                data.urlvideo = [urlvideo]
                            }

                            data.save((error,result) =>{
                                if (error){
                                    return res.json({"code":0,"message":error})
                                }
                                return res.json({"code":1,"data":result})
                            })
                        })

        

                    }
                } catch (err){
                    return res.json({code:0,error:err})
                }
            }
        })
    }

    catch(error){
        res.status(500).send(error);
        console.log(error);
    }


    


}

exports.chinhsuacomment = (req,res) => {
    let user = req.cookies.data

    let id_user = user.userId

   
    let {id_comment,noidung} = req.body
   
    console.log('test ',id_user,noidung)

    let time = new Date().toLocaleString('en-US',{timeZone:'Asia/Ho_Chi_Minh'})

    Comment.findOne({ _id:id_comment},(err,comment) =>{
        if(err){
            return res.json({code:0,err:"Có Lỗi Xảy Ra, Vui Lòng Thử Lại Sau"})
        }
        if(comment.id_user != id_user ){
            return res.json({code:0,err:"Có Lỗi Xảy Ra, Bạn không có quyền chỉnh sửa"})
        }
        comment.noidung = noidung
        comment.time = time
        comment.save((error,data)=>{
            if(error){
                return res.json({code:0,err:"Có Lỗi Xảy Ra, Vui Lòng Thử Lại Sau"})
            }
            return res.json({"code":1,"data":data})
        })
    })



}

exports.xoacomment = (req,res) => {
    let user = req.cookies.data

    let id_user = user.userId

   
    let {id_comment} = req.body
   
    console.log('test ',id_user)


    Comment.findOne({ _id:id_comment},(err,comment) =>{
        if(err){
            return res.json({code:0,err:"Có Lỗi Xảy Ra, Vui Lòng Thử Lại Sau"})
        }
        if(comment.id_user != id_user ){
            return res.json({code:0,err:"Có Lỗi Xảy Ra, Bạn không có quyền chỉnh sửa"})
        }
     
        comment.remove().then( () =>{
            return res.json({"code":1})
        })
    })



}

exports.capnhatthongtin = (req,res) => {

    let user = req.cookies.data

    let email = user.email
   
    let test = require('path').dirname('uploads')
    console.log(test)
    let uploader = upload.single('image')
    const fs = require('fs')
    uploader(req,res,err => {

        let image = req.file

      
      
        let error = undefined
        if(!image){
            error = 'chua co file anh hoac file khong dc chap nhan'
        }

        if(error){
            return res.json({code:0,message:'chua chon file anh'})
        }else{
            console.log(image)
            let {displayName,lop,khoa} = req.body
            console.log(displayName,lop,khoa)   // lay thong tin 
            // upload file anh
            let dir = `./app/public/uploads/sinhvien/avatar/${image.filename}`
        
            console.log(dir)
            try {
                if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir) // tao thu muc
                
                let iamgePath = dir + `/${image.originalname}`
                // doi ten file va dua file vao path
                fs.renameSync(image.path,iamgePath)
                fs.create 
                // update vao db
                User.findOne({email:email},(error,data)=>{
                    if(error){
                        return res.json({code:0,error:'loi khi tim tai khoan trong db'})
                    }
                    if(!data){
                        return res.json({code:0,error:'khong tim thay email trong db'})
                    }
                    data.displayName = displayName
                    data.lop = lop,
                    data.khoa = khoa
                    data.avatar = `/uploads/sinhvien/avatar/${image.filename}` +  `/${image.originalname}`
                    data.save((err,tmp) => {
                        if(err){
                            return res.json({code:0,error:'khong update trong db dc'})
                        }
                        return res.json({code:1,message:'update thong tin thanh cong',data:tmp})
                    })
                })}
            } catch (err){
                return res.json({code:0,error:err})
            }
        }
  })
  
  
   

 

    
}

exports.xoabaiviet =  (req,res) => {

   
    let user = req.cookies.data
    let email = user.email

   

    let id_baiviet = req.body.id_baiviet




   
        Baiviet.findOne({_id:id_baiviet}).exec((err,data)=>{
            if(err){
                return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
            }

            
          
            if(data){

                if(data.id_user != user.userId){
                    return res.json({"code":0,"err":"Bạn không có quyền thực hiện thao tác này"})
                }

                data.remove( (error) => {
                    if(error){
                        return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
                    
                    }
                    return res.json({"code":1,"err":"Đã Xóa Thành Công","data":data})
                })
                
            }else{
                return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
            }
      
        })
        
 

    
}

exports.TimKiemSinhVien = (req,res) => {
    let keysearch = req.body.displayName
   
    if(keysearch.length == 0){
        console.log('keysearch null')
        return res.json({code:0})
    }
    console.log('keysearch ',keysearch)
    User.find({displayName: new RegExp(`${keysearch}`, 'i'),role:'6077a86af3098715a0991b37'},(err,data)=>{
        if(err){
            return res.json({code:0,err:err})
        }
        return res.json({'code':1,'data':data})
    })

}