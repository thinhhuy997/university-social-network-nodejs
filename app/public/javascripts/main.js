$('#forgot-password').click((ev)=>{
    ev.preventDefault();
    $('.login-form').addClass('login-form-hide');
    $('.forgot-pass-form').addClass('forgot-pass-form-active');
})
$('#return-login').click((ev)=>{
    $('.login-form').removeClass('login-form-hide');
    $('.forgot-pass-form').removeClass('forgot-pass-form-active');
})
$('.md-form').click((e)=>{
    let label = $('.md-form').find("label");
    label.addClass('active');
}).focusout(()=>{
    if($('#form16').val().length == 0){
        $('.md-form > label').removeClass('active');
    }
})
$('.md-form-center').click((e)=>{
    let md_form = e.toElement.parentElement
    let label = md_form.querySelector('label');
    label.classList.add('active');
}).focusout(()=>{
    if($('#center-text-input-area').val().length === 0){
        $('.md-form-center > label').removeClass('active');
    }
})
$(".btn-like").on("click",(e)=>{
    console.log(e.target.dataset.id)

})
$("textarea.user-post-comment-input").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight)-26 + "px;overflow-y:hidden;");
    this.value ='';
}).on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight)-26 + "px";
    if(this.value.length > 10){
        alert(this.value)
    }
    if(parseInt(this.style.height.split('px'))< 36){
        this.style.height = '40px'
    }
});
$('.open-post-modal').click((e)=>{
    $('#post-Modal').modal()
})
/*
Các hàm liên quan đến register
 */
function changePassWordShow() {
    var password_toggle = document.getElementById('password-toggle')
    var password = document.getElementById('password')
    if (password.type === 'password') {
        password.type = 'text'
        password_toggle.classList.remove('fa-eye-slash')
        password_toggle.classList.add('fa-eye')
    } else {
        password.type = 'password'
        password_toggle.classList.remove('fa-eye')
        password_toggle.classList.add('fa-eye-slash')
    }
}
function changeRePassWordShow() {
    var password_toggle = document.getElementById('re-password-toggle')
    var password = document.getElementById('re-password')
    if (password.type === 'password') {
        password.type = 'text'
        password_toggle.classList.remove('fa-eye-slash')
        password_toggle.classList.add('fa-eye')
    } else {
        password.type = 'password'
        password_toggle.classList.remove('fa-eye')
        password_toggle.classList.add('fa-eye-slash')
    }
}
/*
-------------------------------------------------------------------
 */
/*
Cac ham lien quan den user site
 */
function getImage(input){
    let imageBtn = input.querySelector('.image-input')
    imageBtn.click()
}
function deleteImg(btn){
    if(btn === null){
        return
    }
    let preview = btn.parentElement;
    if(preview === null){
        return
    }
    let form = preview.parentElement.parentElement;
    if(form === null){
        return
    }
    let input = form.querySelector('.image-input')
    console.log(input)
    try{
        input.type = "text";
        input.type = "file";
        if(preview.children.length != 0){
            preview.innerHTML = ''
        }
    }catch (e){}
}
function previewFile(input){
    const [file] = input.files
    let form = input.parentElement.parentElement.parentElement.parentElement
    const preview = form.querySelector('.preview')
    if(preview.children.length != 0){
        preview.innerHTML = ''
    }
    const reader = new FileReader()
    reader.onload = e =>{
        let src = e.target.result
        let child = '<img src="'+`${src}`+'" class="w-100">' +
            '        <div class="d-flex align-items-center justify-content-center position-absolute text-muted" onclick="deleteImg(this)" id="delete-img">×</div>'
        preview.innerHTML = child;
    }
    reader.readAsDataURL(file)
}
function addLinkYt(btn){
    let input = btn.parentElement.querySelector('.youtube-link');
    input.style.width = 'calc(100% - 100px - 1.4rem)';
    input.focus()
}
window.onload = ()=>{
    try{
        new FroalaEditor('#content',{heightMin:500,heightMax:1200});
    }catch (e) {
        
    }
    try{
        document.querySelectorAll('textarea').forEach((u)=>{
            u.value='';
        })
    }catch (e){

    }
    try{
        let attachment_post_container = document.querySelector('.attachment-post-container')
        attachment_post_container.addEventListener('focusout',(e)=>{
            let input = document.querySelector('.youtube-link');
            if(!input.value || input.value.length == 0){
                input.style.width = '0';
            }
        })
    }catch (e){};
    try{
        let calendar = document.querySelector('.calendar')

        const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
        }

        getFebDays = (year) => {
            return isLeapYear(year) ? 29 : 28
        }

        generateCalendar = (month, year) => {

            let calendar_days = calendar.querySelector('.calendar-days')
            let calendar_header_year = calendar.querySelector('#year')

            let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

            calendar_days.innerHTML = ''

            let currDate = new Date()
            if (!month) month = currDate.getMonth()
            if (!year) year = currDate.getFullYear()

            let curr_month = `${month_names[month]}`
            month_picker.innerHTML = curr_month
            calendar_header_year.innerHTML = year

            // get first day of month

            let first_day = new Date(year, month, 1)

            for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
                let day = document.createElement('div')
                if (i >= first_day.getDay()) {
                    day.classList.add('calendar-day-hover')
                    day.innerHTML = i - first_day.getDay() + 1
                    day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
                    if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                        day.classList.add('curr-date')
                    }
                }
                calendar_days.appendChild(day)
            }
        }

        let month_list = calendar.querySelector('.month-list')

        month_names.forEach((e, index) => {
            let month = document.createElement('div')
            month.innerHTML = `<div data-month="${index}">${e}</div>`
            month.querySelector('div').onclick = () => {
                month_list.classList.remove('show')
                curr_month.value = index
                generateCalendar(index, curr_year.value)
            }
            month_list.appendChild(month)
        })

        let month_picker = calendar.querySelector('#month-picker')

        month_picker.onclick = () => {
            month_list.classList.add('show')
        }

        let currDate = new Date()

        let curr_month = {value: currDate.getMonth()}
        let curr_year = {value: currDate.getFullYear()}

        generateCalendar(curr_month.value, curr_year.value)

        document.querySelector('#prev-year').onclick = () => {
            --curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }

        document.querySelector('#next-year').onclick = () => {
            ++curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }

        let dark_mode_toggle = document.querySelector('.dark-mode-switch')

        dark_mode_toggle.onclick = () => {
            document.querySelector('body').classList.toggle('light')
            document.querySelector('body').classList.toggle('dark')
        }
    }catch (e){};
    /*
    Đóng mở sidebar
     */
    try{
        document.getElementById('sidebar-btn').addEventListener('click',(e)=>{
            let sidebar = document.querySelector('.sidebar');
            if(sidebar.classList.contains('show')){
                sidebar.classList.add('hide');
                setTimeout(()=>{
                    sidebar.classList.remove('show')
                    sidebar.classList.remove('hide')
                },500)
            }
            else{
                sidebar.classList.add('show');
            }
        })

    }catch (e){
        console.log(e);
    }
    try{
        document.querySelector('.background-space').addEventListener('click',(e)=>{
            let sidebar = document.querySelector('.sidebar');
            if(sidebar.classList.contains('show')){
                sidebar.classList.add('hide');
                setTimeout(()=>{
                    sidebar.classList.remove('show')
                    sidebar.classList.remove('hide')
                },500)
            }
            else{
                sidebar.classList.add('show');
            }
        })

    }catch (e){
        console.log(e);
    }
    /*
    -----------------------------------
    Load editor
     */
    try {

        tinymce.init({
            selector: '#text-editor',
            plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
            toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
            toolbar_mode: 'floating',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
        })
    }catch (e){

    }

}
/*
javascript cho calender
 */

// Javascript cho baiviet
let baiviet_url = 'http://localhost:8080/sinhvien/index';
//autoload bai viet khi scroll den cuoi trang
if(document.location.href == baiviet_url){

    // newcode
    console.log('Mở kết nối tới Server')
    socket = io()
    socket.on('connect', () => console.log('Đã kết nối thành công'))
    socket.on('disconnect', () => console.log('Đã mất kết nối với server'))
    socket.on('send-notification', handleSendNotification)

    function handleSendNotification(data){
        let {chuyenmuc_name, header_post, content_post, created_at, id_thongbao} = data
        is_socket = true
        displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao, is_socket)
    }
    // newcode

    function LoadBaiVietIndex(iduser,idanotheruser){
        $( document ).ready(function() {
            // alert('sdf')
           
            $('.user-post-container').html('');
            var limit = 10;
            var page = 1;
            var action = 'inactive';

            let fetchlink = ''
            if(iduser != null){
                fetchlink = `http://localhost:8080/api/baiviet?page=${page}&limit=${limit}&iduser=${iduser}`
            }else if(idanotheruser != null){
                fetchlink = `http://localhost:8080/api/baiviet?page=${page}&limit=${limit}&idanotheruser=${idanotheruser}`
            }else{
                fetchlink = `http://localhost:8080/api/baiviet?page=${page}&limit=${limit}`
            }
    
            function load_post_data(page, limit){
                fetch(fetchlink)
                .then(response => response.json())
                .then(data => {
    
                    let useraccount = data['user']
                    // console.log(useraccount)
    
                    posts = data["results"];
                    posts.forEach(post => {
                        let user = post["id_user"]
                        let displayname = user["displayName"]
                        let tieude_baiviet = post["tieude"]
                        let noidung_baiviet = post["noidung"]
                        let comments = post["id_comment"]
                        let urlImage = post["urlImage"]
                        let urlvideo = post["urlvideo"]
                        let id_baiviet = post["_id"]
    
                        console.log('load_post_data')
                        if(useraccount.userId == user._id){
                            displayBaiViet(displayname, tieude_baiviet, noidung_baiviet, urlImage,urlvideo, comments, id_baiviet,useraccount,user)
                        }else{
                            displayBaiVietCuaNguoiKhac(displayname, tieude_baiviet, noidung_baiviet, urlImage,urlvideo, comments, id_baiviet,useraccount,user)
                        }
                        
                        
                    });
    
                    if(posts == ''){
                        $('#load_data_message').html("<button type='button' class='btn btn-info'>Đã load hết bài viết</button>");
                        action = 'active';
                    }
                    else{
                        $('#load_data_message').html("<button type='button' class='btn btn-warning'>Đang load thêm bài viết</button>");
                        action = 'inactive';
                    }
                })
            }
            
    
            if(action == 'inactive'){
                action = 'active';
                load_post_data(page, limit);
            }
            
            $(window).scroll(function(){
                if($(window).scrollTop() + $(window).height() > $("#load_data").height() && action == 'inactive')
                {
                    action = 'active';
                    page = page + 1;
                    setTimeout(function(){
                        load_post_data(page, limit);
                    }, 10000);
                }
            });
    
            //thong bao
            $('.list-thongbao').html('');
            fetch('http://localhost:8080/api/thongbao?page=1&limit=7')
            .then(response => response.json())
            .then(data => {
                posts = data["results"];
                posts.forEach(post => {
                    let chuyenmuc = post["chuyenmuc"]
                    let chuyenmuc_name = chuyenmuc["name"]
                    let header_post = post["tieude_thongbao"]
                    let content_post = post["noidung_thongbao"]
                    let created_at = post["created_at"].substring(0, 10);
                    let id_thongbao = post["_id"]
                    if(content_post.length > 40){
                        content_post = content_post.substring(0, 45) + "...."
                    }
                    displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                });
            })
        
           
           
        })
    }
  
    LoadBaiVietIndex()

 
}
   // button xem tat ca
   $('.btn_all_post').click(() => {
    window.location.replace("http://localhost:8080/thongbao");
})

function displayBaiViet(displayname, tieude, noidung, urlImage,urlvideo, comments, id_baiviet,useraccount,user){

    let postDiv = ''

    if(urlvideo[0].length == 0 ){
        postDiv = $(`<div class="card BaiViet mb-2" data-id="${id_baiviet}">
        <div class="card-header d-flex">
            <div href="" class="small-user-container">
                <div class="nav-avt">
                    <img src="${user.avatar}" alt="User img">
                </div>
                <div class="px-2">
                    <h6>${displayname}</h6>
                    <span class="text-muted">Sinh viên</span>
                </div>
            </div>
            <p class="card-text user-post-time"><small class="text-muted">Last updated 3 mins ago</small></p>
            <div class="dropup position-absolute top-0 right-0">
                <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="dropdown-menu dropdown-fix py-2">
                    <div class="dropdown-item Btn-ChinhSua" data-id="${id_baiviet}" data-toggle="modal" data-target="#change-post-Modal">Chỉnh sửa</div>
                    <div class="dropdown-item Btn-Xoa" data-id="${id_baiviet}">Xóa</div>
                    <div class="dropdown-item" href="#">Copy link</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title TieuDe" data-id="${id_baiviet}">${tieude}</h5>
            <p class="card-text NoiDung" data-id="${id_baiviet}">${noidung}</p>
        </div>
        <img class="card-img-bottom Image" data-id="${id_baiviet}" src="${urlImage}" loading="lazy" alt="Card image cap">

        <div class="VideoYoutubeDiv" data-id="${id_baiviet}" >
      
        </div>

        <div class="card-footer">
            <hr>
            <div class="btn-deck d-flex justify-content-between align-items-center">
                <button data-id="1234" class="px-2 btn btn-light btn-like like"><i class="mr-1 fas fa-heart"></i>Thích</button>
                <button class="px-2 btn btn-light"><i class="mr-1 fas fa-comment-alt"></i>Bình luận</button>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">4 lượt thích</span>
                <span class="text-muted">5 lượt bình luận</span>
            </div>
        </div>
        
        <div class="comment-container" id="${id_baiviet}">
        </div>
    
        <div class="see-more-btn-container">
        </div>
        <div class="user-post-comment-container">
            <form class="user-post-comment-form d-flex">
                <div class="form-group">
                    <div class="nav-avt">
                        <img class="avataruser" src="${useraccount.avatar}" alt="User img">
                    </div>
                </div>
                <div class="form-group d-flex align-items-center user-post-comment-input-container">
                    <textarea baiviet-id="${id_baiviet}" name="comment" value="123" class="form-control user-post-comment-input IntputComment" rows="1" placeholder="Viết bình luận...">
    
                    </textarea>
                    <div baiviet-id="${id_baiviet}" class="text-primary btn send-cmt-btn d-flex align-items-center justify-content-center BtnComment">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
    
            </form>
        </div>
    </div>`);
    }else{
        postDiv = $(`<div class="card BaiViet mb-2" data-id="${id_baiviet}">
        <div class="card-header d-flex">
            <div href="" class="small-user-container">
                <div class="nav-avt">
                    <img src="${user.avatar}" alt="User img">
                </div>
                <div class="px-2">
                    <h6>${displayname}</h6>
                    <span class="text-muted">Sinh viên</span>
                </div>
            </div>
            <p class="card-text user-post-time"><small class="text-muted">Last updated 3 mins ago</small></p>
            <div class="dropup position-absolute top-0 right-0">
                <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="dropdown-menu dropdown-fix py-2">
                    <div class="dropdown-item Btn-ChinhSua" data-id="${id_baiviet}" data-toggle="modal" data-target="#change-post-Modal">Chỉnh sửa</div>
                    <div class="dropdown-item Btn-Xoa" data-id="${id_baiviet}">Xóa</div>
                    <div class="dropdown-item" href="#">Copy link</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title TieuDe" data-id="${id_baiviet}">${tieude}</h5>
            <p class="card-text NoiDung" data-id="${id_baiviet}">${noidung}</p>
        </div>
        <img class="card-img-bottom Image" data-id="${id_baiviet}" src="${urlImage}" loading="lazy" alt="Card image cap">
     
        <div class="VideoYoutubeDiv" data-id="${id_baiviet}" >
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item "  src="${urlvideo}" ></iframe>
            </div>
                
        </div>
       
        <div class="card-footer">
            <hr>
            <div class="btn-deck d-flex justify-content-between align-items-center">
                <button data-id="1234" class="px-2 btn btn-light btn-like like"><i class="mr-1 fas fa-heart"></i>Thích</button>
                <button class="px-2 btn btn-light"><i class="mr-1 fas fa-comment-alt"></i>Bình luận</button>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">4 lượt thích</span>
                <span class="text-muted">5 lượt bình luận</span>
            </div>
        </div>
        
        <div class="comment-container" id="${id_baiviet}">
        </div>
    
        <div class="see-more-btn-container">
        </div>
        <div class="user-post-comment-container">
            <form class="user-post-comment-form d-flex">
                <div class="form-group">
                    <div class="nav-avt">
                        <img class="avataruser" src="${useraccount.avatar}" alt="User img">
                    </div>
                </div>
                <div class="form-group d-flex align-items-center user-post-comment-input-container">
                    <textarea baiviet-id="${id_baiviet}" name="comment" value="123" class="form-control user-post-comment-input IntputComment" rows="1" placeholder="Viết bình luận...">
    
                    </textarea>
                    <div baiviet-id="${id_baiviet}" class="text-primary btn send-cmt-btn d-flex align-items-center justify-content-center BtnComment">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
    
            </form>
        </div>
    </div>`);
    } 
   

    $('.user-post-container').append(postDiv);
    
    displayCommentIntoBaiviet(comments, id_baiviet,useraccount)
   
 
}
function displayBaiVietCuaNguoiKhac(displayname, tieude, noidung, urlImage,urlvideo, comments, id_baiviet,useraccount,user){
   
    let postDiv = ''
    if(urlvideo[0].length == 0){
        postDiv = $(`<div class="card BaiViet mb-2" data-id="${id_baiviet}">
        <div class="card-header d-flex">
            <div href="" class="small-user-container">
                <div class="nav-avt">
                    <img src="${user.avatar}" alt="User img">
                </div>
                <div class="px-2">
                    <h6>${displayname}</h6>
                    <span class="text-muted">Sinh viên</span>
                </div>
            </div>
            <p class="card-text user-post-time"><small class="text-muted">Last updated 3 mins ago</small></p>
           
        </div>
        <div class="card-body">
            <h5 class="card-title TieuDe" data-id="${id_baiviet}">${tieude}</h5>
            <p class="card-text NoiDung" data-id="${id_baiviet}">${noidung}</p>
        </div>
        <img class="card-img-bottom Image" data-id="${id_baiviet}" src="${urlImage}" loading="lazy" alt="Card image cap">
       
        <div class="card-footer">
            <hr>
            <div class="btn-deck d-flex justify-content-between align-items-center">
                <button data-id="1234" class="px-2 btn btn-light btn-like like"><i class="mr-1 fas fa-heart"></i>Thích</button>
                <button class="px-2 btn btn-light"><i class="mr-1 fas fa-comment-alt"></i>Bình luận</button>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">4 lượt thích</span>
                <span class="text-muted">5 lượt bình luận</span>
            </div>
        </div>
        
        <div class="comment-container" id="${id_baiviet}">
        </div>
    
        <div class="see-more-btn-container">
        </div>
        <div class="user-post-comment-container">
            <form class="user-post-comment-form d-flex">
                <div class="form-group">
                    <div class="nav-avt">
                        <img class="avataruser" src="${useraccount.avatar}" alt="User img">
                    </div>
                </div>
                <div class="form-group d-flex align-items-center user-post-comment-input-container">
                    <textarea baiviet-id="${id_baiviet}" name="comment" value="123" class="form-control user-post-comment-input IntputComment" rows="1" placeholder="Viết bình luận...">
    
                    </textarea>
                    <div baiviet-id="${id_baiviet}" class="text-primary btn send-cmt-btn d-flex align-items-center justify-content-center BtnComment">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
    
            </form>
        </div>
        </div>`);
        
    }else{
        postDiv = $(`<div class="card BaiViet mb-2" data-id="${id_baiviet}">
        <div class="card-header d-flex">
            <div href="" class="small-user-container">
                <div class="nav-avt">
                    <img src="${user.avatar}" alt="User img">
                </div>
                <div class="px-2">
                    <h6>${displayname}</h6>
                    <span class="text-muted">Sinh viên</span>
                </div>
            </div>
            <p class="card-text user-post-time"><small class="text-muted">Last updated 3 mins ago</small></p>
           
        </div>
        <div class="card-body">
            <h5 class="card-title TieuDe" data-id="${id_baiviet}">${tieude}</h5>
            <p class="card-text NoiDung" data-id="${id_baiviet}">${noidung}</p>
        </div>
        <img class="card-img-bottom Image" data-id="${id_baiviet}" src="${urlImage}" loading="lazy" alt="Card image cap">
        <iframe  height="500"
            src="${urlvideo}">
        </iframe>
        <div class="card-footer">
            <hr>
            <div class="btn-deck d-flex justify-content-between align-items-center">
                <button data-id="1234" class="px-2 btn btn-light btn-like like"><i class="mr-1 fas fa-heart"></i>Thích</button>
                <button class="px-2 btn btn-light"><i class="mr-1 fas fa-comment-alt"></i>Bình luận</button>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">4 lượt thích</span>
                <span class="text-muted">5 lượt bình luận</span>
            </div>
        </div>
        
        <div class="comment-container" id="${id_baiviet}">
        </div>
    
        <div class="see-more-btn-container">
        </div>
        <div class="user-post-comment-container">
            <form class="user-post-comment-form d-flex">
                <div class="form-group">
                    <div class="nav-avt">
                        <img class="avataruser" src="${useraccount.avatar}" alt="User img">
                    </div>
                </div>
                <div class="form-group d-flex align-items-center user-post-comment-input-container">
                    <textarea baiviet-id="${id_baiviet}" name="comment" value="123" class="form-control user-post-comment-input IntputComment" rows="1" placeholder="Viết bình luận...">
    
                    </textarea>
                    <div baiviet-id="${id_baiviet}" class="text-primary btn send-cmt-btn d-flex align-items-center justify-content-center BtnComment">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
    
            </form>
        </div>
    </div>`);
    }

    $('.user-post-container').append(postDiv);
    
    displayCommentIntoBaiviet(comments, id_baiviet,useraccount)
}

function displayCommentIntoBaiviet(comments, id_baiviet,useraccount){

   
    $('#'+id_baiviet).empty()
    comments.forEach(comment => {
        console.log('displayCommentIntoBaiviet')
        console.log(comment)

        
        
        if(comment.id_user != null){
            if(comment.id_user._id == useraccount.userId){
                let noidung_comment = comment["noidung"]
                let commentDiv = `<div class="user-comment py-2 d-flex" comment-id="${comment["_id"]}">
                <div class="nav-avt">
                    <img src="${comment["id_user"]["avatar"]}" alt="User img">
                </div>
                <div class="user-comment-content" comment-id="${comment["_id"]}">
                    <div class="commenter-infor mt-2 d-flex">
                        <span class="commenter-name">${comment["id_user"]["displayName"]}</span>
                        <span class="ml-2 text-muted">Sinh viên</span>
                    </div>
                    <div class="mt-2 comment-content NoiDungComment" comment-id="${comment["_id"]}">
                        ${noidung_comment}
                    </div>
                    <div class="dropup position-absolute top-0 right-0">
                        <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        <div class="dropdown-menu dropdown-fix py-2">
                            <div class="dropdown-item BtnChinhSuaComment" comment-id="${comment["_id"]}" data-toggle="modal" data-target="#change-comment">Chỉnh sửa</div>
                            <div class="dropdown-item BtnXoaComment" data-toggle="modal" comment-id="${comment["_id"]}" data-target="#delete">Xóa</div>
                        </div>
                    </div>
                </div>
                </div>`
                $('#'+id_baiviet).append(commentDiv)
            }else{
                let noidung_comment = comment["noidung"]
                let commentDiv = `<div class="user-comment py-2 d-flex">
                <div class="nav-avt">
                    <img src="${comment["id_user"]["avatar"]}" alt="User img">
                </div>
                <div class="user-comment-content">
                    <div class="commenter-infor mt-2 d-flex">
                        <span class="commenter-name">${comment["id_user"]["displayName"]}</span>
                        <span class="ml-2 text-muted">Sinh viên</span>
                    </div>
                    <div class="mt-2 comment-content NoiDungComment" comment-id="${comment["_id"]}">
                        ${noidung_comment}
                    </div>
                
                </div>
                </div>`
                $('#'+id_baiviet).append(commentDiv)
            }
        }
        
        
    })
}


// khai bao global
let listChuyenMuc_name = [];
let listChuyenMuc_id = [];

// Javascript cho Thong Bao
//$('#btn_all_post').click(() => {
if(document.location.href == 'http://localhost:8080/thongbao'){
    $( document ).ready(function() {
        // let listChuyenMuc_name = [];
        // let listChuyenMuc_id = [];
        $('.list-thongbao').html('');
        fetch('http://localhost:8080/api/thongbao/')
        .then(response => response.json())
        .then(data => {
            posts = data["results"];

            posts.forEach(post => {
                let chuyenmuc = post["chuyenmuc"]
                let chuyenmuc_name = chuyenmuc["name"]
                let chuyenmuc_id = chuyenmuc["_id"] 
                let header_post = post["tieude_thongbao"]
                let content_post = post["noidung_thongbao"]
                let created_at = post["created_at"].substring(0, 10)
                let id_thongbao = post["_id"]

                if(!listChuyenMuc_name.includes(chuyenmuc_name)){
                    listChuyenMuc_name.push(chuyenmuc_name);
                    listChuyenMuc_id.push(chuyenmuc_id);
                }

                displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
            });
            displayChuyenMucToSearch(listChuyenMuc_name, listChuyenMuc_id);
            paginatePost();
        })
    })
}

//newcode
function displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao, isSocket){ // new isSocket
    let postDiv = $(`<li class="list-group-item notification-item">
    <a href="#" class="notification-item-link" data-id="${id_thongbao}" onclick="openInNewTab('${id_thongbao}'); return false">
        <span class="h6">${header_post}</span>
        <small class="text-muted">${chuyenmuc_name} - ${created_at}</small>
        <div class="content">
            <span>${content_post}</span>
        </div>
    </a>
    </li>`);
    if(isSocket){ //new !if(!isSocket)
        $('.list-thongbao').prepend(postDiv);
    }
    else{
        $('.list-thongbao').append(postDiv);
    }
}
//newcode

function openInNewTab(id_thongbao){
    window.open(`http://localhost:8080/thongbao/detail/${id_thongbao}`, "_blank");
}

function paginatePost(){
    var items = $(".list-thongbao .notification-item");
    var numItems = items.length;
    var perPage = 10;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
}

function displayChuyenMucToSearch(listChuyenMuc_name, listChuyenMuc_id){
    $('#option-chuyenmuc').html('');
    option_luachon = document.createElement("option");
    option_luachon.innerText = "Chọn theo phòng ban";
    option_luachon.setAttribute("data-id", "chuyenmuc-defaut")
    $('#option-chuyenmuc').append(option_luachon);
    var i = 0;
    listChuyenMuc_name.forEach(chuyenMuc => {
        option_with_data_id = document.createElement("option");
        option_with_data_id.innerText = chuyenMuc;
        option_with_data_id.setAttribute("data-id", listChuyenMuc_id[i])
        $('#option-chuyenmuc').append(option_with_data_id);
        i += 1;
    })
}



//thongbao-detail
if (window.location.href.indexOf("/thongbao/detail/") > -1){
    $( document ).ready(function() {
        let id_thongbao_url = window.location.href.toString();
        id_thongbao_url = id_thongbao_url.substring(id_thongbao_url.lastIndexOf('/') + 1);
        fetch(`http://localhost:8080/api/thongbao/${id_thongbao_url}`)
        .then(response => response.json())
        .then(data => {
            post = data["data"];
            let chuyenmuc = post["chuyenmuc"]
            let chuyenmuc_name = chuyenmuc["name"]
            let header_post = post["tieude_thongbao"]
            let content_post = post["noidung_thongbao"]
            let created_at = post["created_at"].substring(0, 10)
            displayDetailPost(chuyenmuc_name, header_post, content_post, created_at)
        })
    })
}

function displayDetailPost(chuyenmuc_name, header_post, content_post, created_at){
    $('.notification-content-container').html('');
    let postDiv = `<div class="notification-content-header">
                    <h3 class="text-center font-weight-bold" id="title_thongbao">${header_post}</h3>
                </div>
                <div class="notification-content-infor d-flex flex-wrap justify-content-between align-items-center">
                    <!-- <a href="" class="content-topic mt-2 px-3 outline-danger">
                        <span><i class="wild-water-melon-color fas fa-image"></i></span>
                        <span>Đăng ký môn học</span>
                    </a> -->
                    <div class="d-flex align-items-center mt-2 px-3 outline-primary">
                        <a href="#" class="d-flex align-items-center notification-content-faculty">
                            <div class="faculty-avt">
                                <img src="/imgs/avt/avt02.jfif" alt="User image cap">
                            </div>
                            <span class="ml-2" id="chuyenmuc_thongbao">
                                    ${chuyenmuc_name}
                                </span>
                        </a>
                        <div>
                            |
                        </div>
                        <div class="time ml-2">
                            ${created_at}
                        </div>
                    </div>
                </div>
                <div class="notification-content-detail mt-5" id="content_thongbao">
                    <span style="font-size: 25px;">
                        ${content_post}
                    </span>
                </div>`

    $('.notification-content-container').prepend(postDiv);
}

$('#btn-search').click(() => {
    let id_chuyenmuc = $('select[id=option-chuyenmuc] option').filter(':selected').attr('data-id');
    //alert($('select[id=option-chuyenmuc] option').filter(':selected').attr('data-id'))
    $(this).submit(function(e){
        e.preventDefault();

        console.log($('#input-notification-title').val())


        let input_notification_title = $('#input-notification-title').val();
        let input_notification_content = $('#input-notification-content').val();

        // if(!input_notification_title){
        //     console.log('input_notification_title is not exist')
        //     input_notification_title = '';
        // }else{
        //     console.log('input_notification_title is exist')
        // }

        // if(!input_notification_content){
        //     input_notification_content = '';
        // }

        if(id_chuyenmuc != "chuyenmuc-defaut"){


            $('.list-thongbao').html('');
            fetch(`http://localhost:8080/api/thongbao/search?idchuyenmuc=${id_chuyenmuc}`)
            .then(response => response.json())
            .then(data => {
                posts = data["results"];
    
                posts.forEach(post => {
                    let chuyenmuc = post["chuyenmuc"]
                    let chuyenmuc_name = chuyenmuc["name"]
                    let chuyenmuc_id = chuyenmuc["_id"] 
                    let header_post = post["tieude_thongbao"]
                    let content_post = post["noidung_thongbao"]
                    let created_at = post["created_at"].substring(0, 10)
                    let id_thongbao = post["_id"]
    
                    if(!listChuyenMuc_name.includes(chuyenmuc_name)){
                        listChuyenMuc_name.push(chuyenmuc_name);
                        listChuyenMuc_id.push(chuyenmuc_id);
                    }

                    if(!input_notification_title && !input_notification_content){
                        displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                    }
                    else if(input_notification_title && !input_notification_content){
                        if(header_post.toUpperCase().search(input_notification_title.toUpperCase()) !== -1){
                            displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                        }
                    }
                    else if(!input_notification_title && input_notification_content){
                        if(content_post.toUpperCase().search(input_notification_content.toUpperCase()) !== -1){
                            displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                        }
                    }
                    else{
                        if(header_post.toUpperCase().search(input_notification_title.toUpperCase()) !== -1 && content_post.toUpperCase().search(input_notification_content.toUpperCase()) !== -1)
                        {
                            displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                        }
                    }
    
                });
                displayChuyenMucToSearch(listChuyenMuc_name, listChuyenMuc_id);
                paginatePost();
            })
            //test
        }
        else{
            $('.list-thongbao').html('');
            fetch(`http://localhost:8080/api/thongbao/`)
            .then(response => response.json())
            .then(data => {
                posts = data["results"];
                posts.forEach(post => {
                    let chuyenmuc = post["chuyenmuc"]
                    let chuyenmuc_name = chuyenmuc["name"]
                    let chuyenmuc_id = chuyenmuc["_id"] 
                    let header_post = post["tieude_thongbao"]
                    let content_post = post["noidung_thongbao"]
                    let created_at = post["created_at"].substring(0, 10)
                    let id_thongbao = post["_id"]
                    displayPosts(chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                });
                displayChuyenMucToSearch(listChuyenMuc_name, listChuyenMuc_id);
                paginatePost();
            })
        } 
    })
})