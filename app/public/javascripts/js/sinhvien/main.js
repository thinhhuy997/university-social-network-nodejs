    $('.btn-chinhsuathongtin').click( e => {
        $('#capnhatthongtin').modal('show')
    })

    choose_avatar.onchange = evt => {
        const [file] = choose_avatar.files
        if (file) {
            let div_avatar = $('#div_avatar')
            let avatar = `
                <img style="height: 100px; width: 100px;" id="avatar" src="#"  />
            `
            div_avatar.append(avatar)

            $('#avatar').attr("src",URL.createObjectURL(file))

        }
    }

   

    $('#CloseCapNhat').click( e => {
        $('#div_avatar').empty()
        $('#choose_avatar').val(null)

    })

    $('#BtnCapNhat').click( e => {

        let [image] = choose_avatar.files
       
        let displayName = $('#displayName').val()
        let lop = $('#lop').val()
        let khoa = $('#khoa').val()

        let data = new FormData()
      
        data.append('image', image )
        data.append('khoa',khoa )
        data.append('lop',lop )
        data.append('displayName',displayName )

        fetch('http://localhost:8080/sinhvien/capnhatthongtin', {
            method: 'put',
            body: data
        })
        .then( res => res.json())
        .then( res => {
            if (res.code == 0){
                alert(res.error)
            }else{
                alert(res.message)
                console.log(res)
                $('.displaynameuser').html(res.data.displayName)
                $('.lopuser').html(res.data.lop)
                $('.khoauser').html(res.data.khoa)
                $('img.avataruser').attr('src',res.data.avatar)

            }
        })
        .catch(e => {
            alert(e)
        })

    })
    // showYourOwnPost
    // getYourOwnPost

 

    $('.BtnDang').click( () => {
        let loading = document.querySelector('.loading')
        let messageContain = document.querySelector('.post-message');
        if(loading.classList.contains('d-none')){
            loading.classList.remove('d-none')
        }

        let TieuDeDang = $('.TieuDeDang').val()
        let NoiDungDang = $('.NoiDungDang').val()
        
     
        let [image] = InputImageDang.files
        let InputYoutubeDang = $('.InputYoutubeDang').val().replace("watch?v=","embed/")

        console.log(TieuDeDang,NoiDungDang)
        console.log(image,InputYoutubeDang)

        let data = new FormData()
        data.append('tieude', TieuDeDang )
        data.append('noidung', NoiDungDang )
        data.append('image',image )
        data.append('urlvideo',InputYoutubeDang )

        fetch('http://localhost:8080/sinhvien/dangbaiviet', {
            method: 'post',
            body: data
        })
        .then( res => res.json())
        .then( res => {
            if(!loading.classList.contains('d-none')){
                loading.classList.add('d-none')
            }
            if(res.code === 0){
                let messageText = messageContain.querySelector('div');
                messageText.innerHTML = res.message;
                if(messageText.classList.contains('alert-success')){
                    messageText.classList.remove('alert-success')
                    messageText.classList.add('alert-danger')
                }
                if(messageContain.classList.contains('d-none')){
                    messageContain.classList.remove('d-none')
                }
            }
            else if(res.code === 1){
                let messageText = messageContain.querySelector('div');
                $('.TieuDeDang').val('');
                $('.NoiDungDang').val('');
                document.getElementById('youtube-link').value = "";
                let deleteBtn = document.querySelector('#post-Modal .modal-dialog .modal-content .modal-body .form-group .preview #delete-img')
                deleteImg(deleteBtn)
                messageText.innerHTML = "Đăng bài thành công";
                if(messageText.classList.contains('alert-danger')){
                    messageText.classList.remove('alert-danger')
                    messageText.classList.add('alert-success')
                }
                if(messageContain.classList.contains('d-none')){
                    messageContain.classList.remove('d-none')
                }
                setTimeout(()=>{
                    if(!messageContain.classList.contains('d-none')){
                        messageContain.classList.add('d-none')
                    }
                },1500)
                setTimeout(()=>{
                    let postModel = document.querySelector('#post-Modal')
                    if(postModel.classList.contains('show')){
                        postModel.querySelector('.modal-content .modal-header .close').click()

                    }
                },1700)
              
                let data = res.data
                let postDiv = $(`<div class="card BaiViet mb-2" data-id="${data._id}">
                                    <div class="card-header d-flex">
                                        <div href="" class="small-user-container">
                                            <div class="nav-avt">
                                                <img src="${data.id_user.avatar}" alt="User img">
                                            </div>
                                            <div class="px-2">
                                                <h6>${data.id_user.displayName}</h6>
                                                <span class="text-muted">Sinh viên</span>
                                            </div>
                                        </div>
                                        <p class="card-text user-post-time"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        <div class="dropup position-absolute top-0 right-0">
                                            <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fas fa-ellipsis-h"></i>
                                            </div>
                                            <div class="dropdown-menu dropdown-fix py-2">
                                                <div class="dropdown-item Btn-ChinhSua" data-id="${data._id}" data-toggle="modal" data-target="#change-post-Modal">Chỉnh sửa</div>
                                                <div class="dropdown-item Btn-Xoa" data-id="${data._id}">Xóa</div>
                                                <div class="dropdown-item" href="#">Copy link</div>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title TieuDe" data-id="${data._id}">${data.tieude}</h5>
                                            <p class="card-text NoiDung" data-id="${data._id}">${data.noidung}</p>
                                        </div>
                                        <img class="card-img-bottom Image" data-id="${data._id}" src="${data.urlImage[0]}" loading="lazy" alt="Card image cap">
                                        <div class="VideoYoutubeDiv" data-id="${data._id}">
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
                                        
                                        <div class="comment-container" id="${data._id}">
                                        </div>
                                    
                                        <div class="see-more-btn-container">
                                        </div>
                                        <div class="user-post-comment-container">
                                            <form class="user-post-comment-form d-flex">
                                                <div class="form-group">
                                                    <div class="nav-avt">
                                                        <img src="/imgs/avt/avt01.jfif" alt="User img">
                                                    </div>
                                                </div>
                                                <div class="form-group d-flex align-items-center user-post-comment-input-container">
                                                    <textarea baiviet-id="${data._id}" name="comment" value="123" class="form-control user-post-comment-input IntputComment" rows="1" placeholder="Viết bình luận...">
                                    
                                                    </textarea>
                                                    <div baiviet-id="${data._id}" class="text-primary btn send-cmt-btn d-flex align-items-center justify-content-center BtnComment">
                                                        <i class="fas fa-chevron-right"></i>
                                                    </div>
                                                </div>
                                    
                                            </form>
                                        </div>
                                  
                                </div>`);

                let parentDiv = $('div.user-post-container').prepend(postDiv)

                if(data.urlvideo[0].length > 0){
                    $(`.VideoYoutubeDiv[data-id='${data._id}']`).append($(`
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item "  src="${data.urlvideo[0]}" ></iframe>
                        </div>
                    `))
                }
            }
            console.log(res)
        })
        .catch(e => {
            alert(e)
        })
    
    })
   

  

    $(document).on("click",".Btn-ChinhSua", function(e){

        let id = $(this).attr("data-id")
        let current = $(this)


        $(".Btn-LuuChinhSua").click( (e) => {
            let ChangePost = document.getElementById('change-post-Modal')
            let loading = ChangePost.querySelector('.loading')
            let messageContain = ChangePost.querySelector('.post-message');
            if(loading.classList.contains('d-none')){
                loading.classList.remove('d-none')
            }

            $(".Btn-LuuChinhSua").off('click'); 

            let [image] = InputImageChinhSua.files
            let InputYoutubeChinhSua = $('.InputYoutubeChinhSua').val().replace("watch?v=","embed/")
            let NoiDungChinhSua =  $('.NoiDungChinhSua').val()
            let TieuDeChinhSua = $('.TieuDeChinhSua').val()

       



            let data = new FormData()
            data.append('idbaiviet', id )
            data.append('tieude', TieuDeChinhSua )
            data.append('noidung', NoiDungChinhSua )
            data.append('image',image )
            data.append('urlvideo',InputYoutubeChinhSua )

            fetch('http://localhost:8080/sinhvien/suabaiviet', {
                method: 'put',
                body: data
            })
            .then( res => res.json())
            .then( res => {
                if(!loading.classList.contains('d-none')){
                    loading.classList.add('d-none')
                }
                console.log(res)
                if(res.code === 0){
                    let messageText = messageContain.querySelector('div');
                    messageText.innerHTML = res.message;
                    if(messageText.classList.contains('alert-success')){
                        messageText.classList.remove('alert-success')
                        messageText.classList.add('alert-danger')
                    }
                    if(messageContain.classList.contains('d-none')){
                        messageContain.classList.remove('d-none')
                    }
                }
                else if(res.code === 1){
                    let messageText = messageContain.querySelector('div');
                    $('.TieuDeChinhSua').val('');
                    $('.NoiDungChinhSua').val('');
                    ChangePost.querySelector('.youtube-link').value = "";
                    let deleteBtn = document.querySelector('#change-post-Modal .modal-dialog .modal-content .modal-body .form-group .preview #delete-img')
                    deleteImg(deleteBtn)
                    messageText.innerHTML = "Chỉnh sửa thành công";
                    if(messageText.classList.contains('alert-danger')){
                        messageText.classList.remove('alert-danger')
                        messageText.classList.add('alert-success')
                    }
                    if(messageContain.classList.contains('d-none')){
                        messageContain.classList.remove('d-none')
                    }
                    setTimeout(()=>{
                        if(!messageContain.classList.contains('d-none')){
                            messageContain.classList.add('d-none')
                        }
                    },1500)
                    setTimeout(()=>{
                        let postModel = document.querySelector('#change-post-Modal')
                        if(postModel.classList.contains('show')){
                            postModel.querySelector('.modal-content .modal-header .close').click()

                        }
                    },1700)





                    let data = res.data
                    let tieude = $(`.TieuDe[data-id='${data._id}']`).html(`${data.tieude}`)
                    let noidung = $(`.NoiDung[data-id='${data._id}']`).html(`${data.noidung}`)
                    let image = $(`.Image[data-id='${data._id}']`).attr('src',`${data.urlImage}`)
                    if(data.urlvideo[0].length > 0){
                        let video = $(`.VideoYoutubeDiv[data-id='${data._id}']`).empty().append($(`
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item "  src="${data.urlvideo[0]}" ></iframe>
                            </div>
                        `))
                    }
                    console.log(res.data)
                }

            })
            .catch(e => {
                alert(e)
            })
        })


      
      
    })

    // $('.BtnComment').click( e => {
     
    // })
    
    // comment vao bai viet
    $(document).on("click",".BtnComment",function() {
        let id_baiviet = $(this).attr("baiviet-id")
        let input_comment = $(`.IntputComment[baiviet-id=${id_baiviet}]`).val()
        console.log(id_baiviet,input_comment)


        

        fetch('http://localhost:8080/sinhvien/commentbaiviet', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    id_baiviet:id_baiviet ,
                    noidung: input_comment
                 }),
            })
            .then( res => res.json())
            .then( res => {
                if(res.code == 0){
                    alert("Thêm comment thất bại, vui lòng thử lại sau")
                }else if(res.code == 1){
                    alert("Thêm comment thành công")
                    console.log(res)
                    $(`.IntputComment[baiviet-id=${id_baiviet}]`).val("")

                    let res_idbaiviet = res.data._id
                    let res_idcomment = res.comment._id
                    let res_avataruser = res.ttuser.avatar
                    let res_displayName = res.ttuser.displayName
                    let res_noidungcmt = res.comment.noidung

                    let commentDiv = `<div class="user-comment py-2 d-flex" comment-id="${res_idcomment}">
                                        <div class="nav-avt">
                                            <img src="${res_avataruser}" alt="User img">
                                        </div>
                                        <div class="user-comment-content" comment-id="${res_idcomment}">
                                            <div class="commenter-infor mt-2 d-flex">
                                                <span class="commenter-name">${res_displayName}</span>
                                                <span class="ml-2 text-muted">Sinh viên</span>
                                            </div>
                                            <div class="mt-2 comment-content NoiDungComment" comment-id="${res_idcomment}">
                                                ${res_noidungcmt}
                                            </div>
                                            <div class="dropup position-absolute top-0 right-0">
                                                <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </div>
                                                <div class="dropdown-menu dropdown-fix py-2">
                                                    <div class="dropdown-item BtnChinhSuaComment" comment-id="${res_idcomment}" data-toggle="modal" data-target="#change-comment">Chỉnh sửa</div>
                                                    <div class="dropdown-item BtnXoaComment" data-toggle="modal" comment-id="${res_idcomment}" data-target="#delete">Xóa</div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>`
                    let parentdiv = $(`div.comment-container[id="${res_idbaiviet}"]`).append(commentDiv)
                    
                }
            })
            .catch(e => {
                alert(e)
            })


    })

    $(document).on("click",".BtnChinhSuaComment",function(){
        
        let id_comment = $(this).attr("comment-id")
        

        $('.LuuThayDoiComment').click( () =>{

            $(".LuuThayDoiComment").off('click'); 

            let noidung = $('.NoiDungThayDoiComment').val()

            console.log(id_comment,noidung)
            fetch('http://localhost:8080/sinhvien/chinhsuacomment', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    id_comment:id_comment ,
                    noidung: noidung
                 }),
            })
            .then( res => res.json())
            .then( res => {
                if(res.code == 0){
                    alert("Chỉnh sửa comment thất bại, vui lòng thử lại sau")
                }else if(res.code == 1){
                    alert("Chỉnh sửa comment thành công")
                    $('.NoiDungThayDoiComment').val("")
                    $('#change-comment').modal('toggle');
                    $(`div.NoiDungComment[comment-id="${id_comment}"`).html(res.data.noidung)

                }
               
                
            })
            .catch(e => {
                alert(e)
            })

        })


    })


    $(document).on("click",".BtnXoaComment",function(){
        
        let id_comment = $(this).attr("comment-id")
        

        $('.BtnXacNhanXoaComment').click( () =>{

            
            $(".BtnXacNhanXoaComment").off('click'); 

            console.log(id_comment)
            fetch('http://localhost:8080/sinhvien/xoacomment', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    id_comment:id_comment ,
             
                 }),
            })
            .then( res => res.json())
            .then( res => {
                if(res.code == 0){
                    alert("Xóa comment thất bại, vui lòng thử lại sau")
                }else if(res.code == 1){
                    alert("Xóa comment thành công")
                    $('#delete').modal('toggle');
                    $(`div.user-comment[comment-id="${id_comment}"`).remove()
                }
            })
            .catch(e => {
                alert(e)
            })

        })


    })

    $(document).on("click",".Btn-Xoa",function(){
        let id = $(this).attr("data-id")

        $('#deletebaiviet').modal('show')
    

        $('.BtnXacNhanXoaBaiViet').click(()=>{

            $(".BtnXacNhanXoaBaiViet").off('click'); 
           
            fetch('http://localhost:8080/sinhvien/xoabaiviet', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    id_baiviet:id ,
             
                 }),
            })
            .then( res => res.json())
            .then( res => {
                if(res.code == 0){
                    alert(res.err)
                }else if(res.code == 1){
                    alert("Xóa bài viết thành công")
                    $('#deletebaiviet').modal('toggle');
                    let child = $(`.BaiViet[data-id=${id}]`)
                    child.remove()
                }
                
            })
            .catch(e => {
                alert(e)
            })

        })
  
    })

    // phan search sinh vien hien bai viet
    $('.InputSearchBaiVietDisplayName').keyup(function () {
      
      
        let displayName = $('.InputSearchBaiVietDisplayName').val()

        fetch('http://localhost:8080/sinhvien/TimKiemSinhVien', {
            method: 'post',
            headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
            },
            body: JSON.stringify({
                displayName:displayName ,
             
            }),
            })
            .then( res => res.json())
            .then( res => {
                console.log(res)
                if (res.code == 0){
                    $('.DanhSachSinhVien').empty()
               
                }else{

                    $('.DanhSachSinhVien').empty()
                    res.data.forEach(element => {
                        $('.DanhSachSinhVien').append(`<a class="dropdown-item UserList" userid="${element._id}" >${element.displayName}</a>`)
                    });
                    $('.DanhSachSinhVien').show();
                
                }
            })
            .catch(e => {
                alert(e)
            })

        $(document).on('click', function (e) {
            if ($(e.target).closest(".InputSearchBaiVietDisplayName").length === 0) {
                console.log('123')
                $('.DanhSachSinhVien').hide();
           
              
                
            }

  
        });

    });
    $(document).on('click','#BaiVietCaNhan',function(){
        // alert('xin chao')
        LoadBaiVietIndex(true,null)
    })
    $(document).on('click','.UserList',function(){
        let userid = $(this).attr('userid')
 
        LoadBaiVietIndex(null,userid)
    })



