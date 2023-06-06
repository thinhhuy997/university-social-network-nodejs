const db = require("../models");

var bcrypt = require("bcryptjs");


const Thongbao = require('../models/thongbao.model');
const Chuyenmuc = require("../models/chuyenmuc.model");
const User = require("../models/user.model");



exports.capnhatmatkhau = (req,res) => {
    let user = req.cookies.data

    let username = user.username
    console.log(username)
    let {CurrentPassword,NewPassword,ConfirmPassword} = req.body

 


    
    User.findOne({username:username}, (err,data) => {
        if(err){
            return res.json({code:0,erorr:'Có lỗi xảy ra, vui lòng thử lại sau'})
        }
        // return res.send(data)
       
        console.log(data)
        let compare = bcrypt.compareSync(
            CurrentPassword,
            data.password
          )
        if( !compare ){
            return res.json({"code":0,'error':'Mật khẩu không chính xác'})
        }
        else if(NewPassword.length < 6 ){
            return res.json({"code":0,'error':'Mật khẩu phải có ít nhất 6 kí tự'})
        }
        else if(NewPassword != ConfirmPassword){
            return res.json({"code":0,'error':'Mật khẩu chưa khớp'})
        }
        else if(NewPassword != ConfirmPassword){
            return res.json({"code":0,'error':'Mật khẩu chưa khớp'})
        }else if (CurrentPassword == NewPassword){
            return res.json({"code":0,'error':'Mật khẩu mới phải khác với mật khẩu hiện tại'})
        }


        data.password = bcrypt.hashSync(NewPassword, 8)

        data.save( (error,data) => {
            if(err){
                return res.json({code:0,erorr:'Cập nhật mật khẩu thất bại'})
                // return res.send('l thanh cong')
            }
            console.log(data)
            // return res.send('thanh cong')

            return res.json({code:1,message:'Mật khẩu đã được đổi thành công'})
        })
        
    })
 
}

exports.index=(req,res) => {
    let user = req.cookies.data
    console.log("user")
    console.log(user)

    // get tat ca cac noi dung cua phong khoa
    let usertmp = User.findOne({_id:user.userId}).populate({ path: 'chuyenmuc', select: ['name']}).exec( (err,usertmp) => {
        if (err){
            return res.status(400).send("có lỗi xảy ra, vui lòng thử lại sau")
        }


        // console.log("usertmp")
        // console.log(usertmp)


        Thongbao.find({id_user:usertmp.id}).populate('chuyenmuc').populate('id_user').exec((err,thongbao) =>{
            if(err){
                return res.json({code:0})
            }
            console.log(thongbao)
            return res.render('phongkhoa/index',{'displayName':user.displayName,'user':usertmp,'thongbao':thongbao})
        })




       
    })

   


   
}

exports.dangthongbao= async (req, res) => {

    let user = req.cookies.data

    let id_user = user.userId

    let name = req.body.name_chuyenmuc
    try{
      const chuyenmuc = await Chuyenmuc.findOne({
        name: name
      });
      if (!chuyenmuc) res.json({"code":0,"error":"khong tim thay chuyen muc"});
  
      const user = await User.findOne({
        _id: id_user
      });
      if (!user) res.json({"code":0,"error":"khong tim thay user"});
      
  
      const { tieude_thongbao, noidung_thongbao} = req.body
      let newThongbao = await new Thongbao({
          chuyenmuc: chuyenmuc,
          id_user:user,
          tieude_thongbao: tieude_thongbao,
          noidung_thongbao: noidung_thongbao
      })
      newThongbao.save();
      return res.json({"code":1,"data":newThongbao});
    }
    catch(error){
      res.status(500).send(error);
      console.log(error);
    }
  }

exports.suathongbao = async (req, res) => {

    // idthongbao
    // name_chuyenmuc
    // tieude_thongbao
    // noidung_thongbao

    let user = req.cookies.data

    let id_user = user.userId

    let idthongbao = req.body.idthongbao
    let name = req.body.name_chuyenmuc
    try{
        const chuyenmuc = await Chuyenmuc.findOne({
        name: name
        });
        if (!chuyenmuc) return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})

        const user = await User.findOne({
        _id: id_user
        });
        if (!user) return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
        

        const { tieude_thongbao, noidung_thongbao} = req.body
   

        Thongbao.findOne({id_user:user,_id:idthongbao}).populate('chuyenmuc').populate('id_user').exec((err,data)=>{
            if(err){
                return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
            }
            data.chuyenmuc = chuyenmuc
            data.tieude_thongbao = tieude_thongbao
            data.noidung_thongbao = noidung_thongbao
            data.save( (error,data) => {
                if(error){
                    return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
                   
                }
                return res.json({"code":1,"data":data})
            })
        })

       
    }
    catch(error){
        res.status(500).send(error);
        console.log(error);
    }
}

exports.xoathongbao = async (req,res) => {
    let user = req.cookies.data
    let id_user = user.userId
    let idthongbao = req.body.idthongbao

    const usertmp = await User.findOne({
        _id: id_user
    });

    if (!usertmp) return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})

    Thongbao.findOne({id_user:usertmp,_id:idthongbao}).populate('chuyenmuc').populate('id_user').exec((err,data)=>{
                if(err){
                    return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
                }
              
                data.remove( (error) => {
                    if(error){
                        return res.json({"code":0,"err":"Có lỗi xảy ra vui lòng thử lại sau"})
                    
                    }
                    return res.json({"code":1,"err":"Đã Xóa Thành Công","data":data})
                })
    })
}

