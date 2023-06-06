const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser') //Sử dụng module cookie-parse
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
let path = require('path');
const app = express();
const socketio = require('socket.io');// new


app.use(express.static('app/public'));
app.use(cookieParser())
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine','ejs')




var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect('mongodb+srv://lethaibinh:lethaibinh@cluster0.1vdpq.mongodb.net/webNC?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });




// routes
require("./app/routes/auth.routes")(app);

let sinhvienroute = require("./app/routes/sinhvien.routes")
app.use('/sinhvien',sinhvienroute)
let phongkhoaroute = require("./app/routes/phongkhoa.routes")
app.use('/phongkhoa',phongkhoaroute)
let adminroute = require("./app/routes/admin.routes");
const Chuyenmuc = require("./app/models/chuyenmuc.model");
app.use('/admin',adminroute)

//test
let baiviet_api_route = require("./app/routes/baivietapi.routes")
app.use('/api/baiviet',baiviet_api_route)

let thongbao_api_route = require("./app/routes/thongbaoapi.routes")
app.use('/api/thongbao',thongbao_api_route)

let thongbaoroute = require("./app/routes/thongbao.routes")
app.use('/thongbao', thongbaoroute)
//test

app.use((req,res)=>{
  return res.redirect('/login')
})


// set port, listen for requests
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

    // new
    const io = socketio(httpServer)

    io.on('connection', client => {
      console.log(`Client ${client.id} đã kết nối`);
  
      // gửi message cho các client ngoại trừ client hiện tại
      client.on('send-notification', (chuyenmuc_name, header_post, content_post, created_at, id_thongbao) => {
        client.chuyenmuc_name = chuyenmuc_name
        client.header_post = header_post
        client.content_post = content_post
        client.created_at = created_at
        client.id_thongbao = id_thongbao
        client.broadcast.emit('send-notification', {chuyenmuc_name: client.header_post, header_post: client.header_post, content_post: client.content_post, created_at: client.created_at, id_thongbao: client.id_thongbao})
      })
  
    })
    //new
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "SinhVien"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SinhVien' to roles collection");
      });

      new Role({
        name: "PhongKhoa"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'PhongKhoa' to roles collection");
      });

      new Role({
        name: "Admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Admin' to roles collection");
      });
    }
  });

  // khoi tao cho chuyên mục
  Chuyenmuc.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      let arr = ["PHÒNG CTHSSV","PHÒNG ĐẠI HỌC","PHÒNG SAU ĐẠI HỌC","PHÒNG ĐIỆN TOÁN VÀ MÁY TÍNH","PHÒNG KHẢO THÍ VÀ KĐCL",
      "PHÒNG TÀI CHÍNH","TDT CREATIVE LANGUAGE CENTER","TRUNG TÂM TIN HỌC","KHOA LUẬT","KHOA MỸ THUẬT CÔNG NGHIỆP","KHOA ĐIỆN – ĐIỆN TỬ",
      "KHOA CÔNG NGHỆ THÔNG TIN","KHOA QUẢN TRỊ KINH DOANH","KHOA MÔI TRƯỜNG VÀ BẢO HỘ LAO ĐỘNG","KHOA LAO ĐỘNG CÔNG ĐOÀN ","KHOA TÀI CHÍNH NGÂN HÀNG",
      "KHOA GIÁO DỤC QUỐC TẾ"
    ]
      arr.forEach(element => {
        new Chuyenmuc({
          name: element
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added "+element+" to roles collection");
        });
        });
      }
  });
}
