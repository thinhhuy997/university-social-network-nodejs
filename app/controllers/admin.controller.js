const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");
const Chuyenmuc = require("../models/chuyenmuc.model");




exports.taotaikhoan = (req,res) => {
   
    let {username,email,displayName,password,chuyenmuc} = req.body
    console.log(username,email,displayName)

    
    async function  find_chuyenmuc(){
        let list = []
        await Promise.all([...chuyenmuc.map( async (element) => {
            let test = await  Chuyenmuc.findOne({name:element}, (err,chuyenmucdata)=>{
        
                if(chuyenmucdata){
                    console.log('tim thay '+ chuyenmucdata.id)
                    list.push(chuyenmucdata.id)
                    console.log(list)
                    return 'list'
                    
                }
              
               
            })
        })]);
        return list
       
    }
    find_chuyenmuc().then(array_chuyenmucid => {

        // console.log('return func '+data)
        // return res.send(data)
        Role.findOne({name:"PhongKhoa"},(err,data) => {
            if(err){
              return res.json({code:0,error:'loi role khong trung khop'})
            }
            
            const user = new User({
                username: username,
                email: email,
                displayName:displayName,
                password: bcrypt.hashSync(password, 8),
                role:data.id,
                chuyenmuc : array_chuyenmucid
            });
            
            user.save((err, user) => {
                if (err) {
                    if(err.keyPattern.email){
                        return res.status(500).json({code:0, message: 'Email đã được sử dụng, vui lòng thử với email khác' }); 
                    }else if(err.keyPattern.username){
                        return res.status(500).json({code:0, message: 'Username đã được sử dụng, vui lòng thử với username khác' }); 
                    }
                    else{
                        return res.json({code:0,message:err})
                    }
                    
                }
                console.log('luu thanh cong ',user)
                User.findById(user.id)
                .populate('role','-__v')
                .populate('chuyenmuc')
                .exec((err,result) => {
                    return res.json({code:1,message:'tạo tài khoản thành công',result})
                })
                
               
            })
        })


    })
   

    
}

// phan quyen phong khoa
exports.phanquyen = (req,res) => {
   
    let {username,email,displayName,password,chuyenmuc} = req.body
    console.log(username,email,displayName,chuyenmuc)

    // return res.json({"code":0,"message":'loi role khong trung khop'})

    Chuyenmuc.find().where('name').in(chuyenmuc).exec((err, array_chuyenmucid) => {

        User.findOne({
            email: email
           
        })
        .exec((errtmp,tmpdata) => {


            if(errtmp){
                return res.json({"code":0,"message":'co loi xay ra vui long thu lai sau'})

            }

            tmpdata.chuyenmuc = array_chuyenmucid
        
            tmpdata.save((err, user_tmp) => {
                if (err) {
                    return res.json({"code":0,"message":err})
                    
                }
               
                return res.json({"code":1,"message":'phân quyền thành công',"result":user_tmp})
                
               
            })

        })

    });

    
 
   

    
}



exports.index = (req,res) => {
    let user = req.cookies.data
    User.find({role:"6077a86af3098715a0991b38"})    // id cua phong khoa
    .populate('role','-__v')
    .populate('chuyenmuc')
    .exec((err,result) => {
        if(err){
            return res.json({code:0,message:'Có lỗi xảy ra vui lòng thử lại sau'})
        }

        console.log(result)
        
        return res.render('admin/index',{'displayName':user.displayName,'AllPhongKhoa':Array.from(result.values())})
    })
   
}




