   
   $('#btn-doimatkhau').click( e => {
        $('#ModelDoiMatKhau').modal('show')
    })

    
    $('.SaveChange').click ( e => {
        $('#ModelDoiMatKhau').modal('hide')

        let CurrentPassword = $('#CurrentPassword').val()
        let NewPassword = $('#NewPassword').val()
        let ConfirmPassword = $('#ConfirmPassword').val()

        console.log(CurrentPassword,NewPassword,ConfirmPassword)


            fetch('http://localhost:8080/phongkhoa/capnhatmatkhau',{
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    CurrentPassword:CurrentPassword,
                    NewPassword:NewPassword,
                    ConfirmPassword:ConfirmPassword,
                  
                })

            })
            .then( res => res.json() )
            .then(res => {
                if (res.code == 0){
                    alert(res.error)
                }else if (res.code ==1 ){
                    alert(res.message)
                    $('input[type="password"]').val('')
                }
                else{
                    alert('test')
                }
            })
            .catch(e => {
                alert(e)
            })
        
            


    });


    $(".BtnDang ").click(()=>{

        let tieude_thongbao = $(".TieuDeDang").val()
        let noidung_thongbao = $(".NoiDungDang").val()
        let name_chuyenmuc = $("#chuyenmuc").val()

        


        fetch('http://localhost:8080/phongkhoa/dangthongbao', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    tieude_thongbao:tieude_thongbao ,
                    noidung_thongbao:noidung_thongbao,
                    name_chuyenmuc:name_chuyenmuc
                 }),
            })
            .then( res => res.json())
            .then( res => {
                
                if(res.code == 0){
                    alert(res.error)
                }else if(res.code==1){
                    alert("Thêm bài viết thành công")
                    $('#post-Modal').modal('toggle');
                    console.log(res.data)
                    let div =  $(".AllThongBao")
                    $(".TieuDeDang").val("")
                    $(".NoiDungDang").val("")
                    let child = `
                    <div class="user-post-container">
                            <div class="card DivThongBao" thongbao-id="${res.data._id }" >
                                <div class="card-header d-flex">
                                    <div href="" class="small-user-container">
                                        <div class="nav-avt">
                                            <img src="/imgs/avt/avt01.jfif" alt="User img">
                                        </div>
                                        <div class="px-2">
                                            <h6>  ${res.data.id_user.displayName}  </h6>
                                            <span class="text-muted ChuyenMuc" thongbao-id="${res.data._id }"> ${res.data.chuyenmuc.name} </span>
                                        </div>
                                    </div>
                                    <p class="card-text user-post-time"><small class="text-muted">   ${res.data.created_at.substring(0, 10)}   </small></p>
                                    <div class="dropup position-absolute top-0 right-0">
                                        <div class="btn  btn-more-function d-flex align-items-center justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-h"></i>
                                        </div>
                                        <div class="dropdown-menu dropdown-fix py-2">
                                            <div class="dropdown-item Btn-ChinhSuaThongBao" data-toggle="modal" thongbao-id="${res.data._id }" >Chỉnh sửa</div>
                                            <div class="dropdown-item Btn-XoaThongBao" data-toggle="modal" thongbao-id="${res.data._id }" >Xóa</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title TieuDe" thongbao-id="${res.data._id }">  ${res.data.tieude_thongbao }</h5>
                                    <p class="card-text NoiDung" thongbao-id="${res.data._id }">  ${res.data.noidung_thongbao } </p>
                                </div>
                          
                            </div>
                        </div>
                    `
                    div.prepend(child)
                 
                }

            })
            .catch(e => {
                alert(e)
            })

        // newcode

        let chuyenmuc;
        let chuyenmuc_name;
        let header_post;
        let content_post;
        let created_at;
        let id_thongbao;

        
        setTimeout(function(){ 
            fetch('http://localhost:8080/api/thongbao?page=1&limit=1')
            .then(response => response.json())
            .then(data => {
                posts = data["results"];
                posts.forEach(post => {
                    chuyenmuc = post["chuyenmuc"]
                    chuyenmuc_name = chuyenmuc["name"]
                    header_post = post["tieude_thongbao"]
                    content_post = post["noidung_thongbao"]
                    created_at = post["created_at"].substring(0, 10);
                    id_thongbao = post["_id"]
                    if(content_post.length > 40){
                        content_post = content_post.substring(0, 45) + "...."
                    }
                    console.log('Mở kết nối tới Server', chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                    socket = io()
                    socket.emit('send-notification', chuyenmuc_name, header_post, content_post, created_at, id_thongbao)
                });
            })
         }, 500);
        
        // newcode

    })

    $(document).on("click",".Btn-ChinhSuaThongBao", function(){
    
        let id = $(this).attr("thongbao-id")
        
        $("#change-post-Modal").modal('show')

        $(".Btn-LuuChinhSua").click(()=>{

            $(".Btn-LuuChinhSua").off('click'); 

            let tieude_thongbao = $(".TieuDeChinhSua").val()
            let noidung_thongbao = $(".NoiDungChinhSua").val()
            let name_chuyenmuc = $('#chuyenmucchinhsua').val()
     


            fetch('http://localhost:8080/phongkhoa/suathongbao', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    idthongbao:id,
                    tieude_thongbao:tieude_thongbao ,
                    noidung_thongbao:noidung_thongbao,
                    name_chuyenmuc:name_chuyenmuc
                 }),
            })
            .then( res => res.json())
            .then( res => {
                if(res.code == 0 ){
                    alert("Chỉnh Sửa Thất Bại")

                }else if(res.code == 1){
                    alert("Chỉnh Sửa Thành Công")
                    $(".TieuDeChinhSua").val("")
                    $(".NoiDungChinhSua").val("")
                    $('#change-post-Modal').modal('toggle');
                    $(`.ChuyenMuc[thongbao-id=${id}]`).html(res.data.chuyenmuc.name)
                    $(`.TieuDe[thongbao-id=${id}]`).html(res.data.tieude_thongbao)
                    $(`.NoiDung[thongbao-id=${id}]`).html(res.data.noidung_thongbao)
                }
            })
            .catch(e => {
                alert(e)
            })

        })

    })

    $(document).on("click",".Btn-XoaThongBao", function(e){
    
        e.preventDefault()
        let id = $(this).attr("thongbao-id")

        
        $("#delete").modal('show')

        $(".Btn-XacNhanXoaThongBao").click(()=>{
        
            $(".Btn-XacNhanXoaThongBao").off('click'); 

            // console.log(id,tieude,noidung,chuyenmuc)


            fetch('http://localhost:8080/phongkhoa/xoathongbao', {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({
                    idthongbao:id,
                
                }),
            })
            .then( res => res.json())
            .then( res => {
                console.log(res)
                if(res.code ==0){
                    alert("Đã xóa thất bại, vui lòng thử lại sau")
                }else if(res.code == 1){
                    alert("Đã xóa thành công")
                    let child = $(`.DivThongBao[thongbao-id=${id}]`)
                    $('#delete').modal('toggle');
                    child.remove()
                    

                }
            })
            .catch(e => {
                alert(e)
            })

        })
        

})

