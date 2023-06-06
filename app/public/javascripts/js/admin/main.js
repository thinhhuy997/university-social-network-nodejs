let URL = 'http://localhost:8080' 

     
$('#btn-DangKi').click( e => {

   

    


    // $('header').addClass('header-desktop');

    let username = $('#username').val()
    let email = $('#email').val()
    let displayName = $('#displayName').val()
    let password = $('#password').val()
    let chuyenmuc =  $('input[name="chuyenmuc[]"]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
 
    console.log(typeof(displayName),displayName)
    taotaikhoan(username,email,password,displayName,chuyenmuc)
    

 

} )
function taotaikhoan(username,email,password,displayName,chuyenmuc){
    fetch('http://localhost:8080/admin/taotaikhoan',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:username,
            email:email,
            displayName:displayName,
            password:'password',
            chuyenmuc:chuyenmuc
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.code == 0) {
            $("#ThongBao").html(res.message)
        }else if(res.code == 1){
            console.log('test result',res.result)
            $("#ThongBao").html(res.message)

            // DOM them tr vao
            let tmp =''
             res.result.chuyenmuc.forEach( (el,index) => { 
                    
                tmp = tmp + (index+1) + ". " + el.name + " \n " 
                
             })
            
             tmp = tmp.replace(/\n/g, '<br/>') 
               
             let stt = $('#TatCaTaiKhoan tr').length;

             let tr = `
             
                <tr class="${res.result._id}">

                    ${`<th>${stt}</th>`}
                    ${`<th data-username="${res.result._id}" > ${res.result.username} </th>`}
                    ${`<th data-displayName="${res.result._id}"> ${res.result.displayName} </th>`}
                    ${`<th data-email="${res.result._id}"> ${res.result.email} </th>`}
                    ${`<th style="  max-width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;" >  ${res.result.password} </th>`}

                 
                   
                    ${`<th data-chuyenmuc="${res.result._id}"> ${tmp} </th>`}
                    ${`
                        <th>
                        ${`
                            <button data-id="${res.result._id}" class="btn btn-primary sua-phongkhoa">
                                Phân Quyền
                            </button>    
                        `}
                        
                    </th>    
                    `}
                </tr>
                `
             $('#TatCaTaiKhoan').append(tr);
            

        }
    })
    .catch(e => {
        $("#ThongBao").html(e)
    })

    }

$("#TaoTaiKhoan").click( () => {
    $('.checkboxphongban').prop('checked', false);
    $('#ModelTaoTaiKhoan').modal('show');
    $('header').removeClass('header-desktop');
    $("#ThongBao").html("")
})
$("#CloseTaoTaiKhoan").click( () => {
$('header').addClass('header-desktop');
$("#ThongBao").html("")
})

$(document).on('click',".sua-phongkhoa",function(){
let id = $(this).attr("data-id")
console.log("test id",id)
$('#ModelPhanQuyenTaiKhoan').modal('show');

$('#ModelPhanQuyenTaiKhoan').attr("data-id",id)

$('header').removeClass('header-desktop');

let username = $(`th[data-username="${id}"]`).text()
$("#username_pq").val(username)
let email = $(`th[data-email="${id}"]`).text()
$("#email_pq").val(email)
let displayName = $(`th[data-displayName="${id}"]`).text()
$("#displayName_pq").val(displayName)
$("#password_pq").val("*******")


let chuyenmuc = $(`th[data-chuyenmuc="${id}"]`).text().replace(/\n|\r/g, "");
let test= chuyenmuc.split(/(?:\d\. |_)+/) 

let tmp =  $('input[name="chuyenmuc_pq[]"]').map(function(_, el) {
        return $(el).val();
    }).get();

$('.checkboxphongban').prop('checked', false);
test.forEach( (ele,index) => {
    console.log(ele.trim())
    tmp.forEach((eletmp,indextmp) => {
    // console.log(ele.trim() +"===="+eletmp)
    if(ele.trim() == eletmp ){
        
        $(`input[value="${eletmp}"]`).prop('checked',true)

    }
    })
})


})

// phan quyen tai khoan cho phong khoa
$('#btn-PhanQuyen').click( e => {

    // $('header').addClass('header-desktop');

    let username = $('#username_pq').val()
    let email = $('#email_pq').val()
    let displayName = $('#displayName_pq').val()
    let password = $('#password_pq').val()
    let chuyenmuc =  $('input[name="chuyenmuc_pq[]"]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
 
    console.log("username",username)
    phanquyen(username,email,password,displayName,chuyenmuc)
    
})
function phanquyen(username,email,password,displayName,chuyenmuc){
    fetch('http://localhost:8080/admin/phanquyen',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:username,
            email:email,
            displayName:displayName,
            password:'password',
            chuyenmuc:chuyenmuc
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.code == 0) {
            $("#ThongBao_pq").html(res.message)
        }else if(res.code == 1){
            $("#ThongBao_pq").html(res.message)
            console.log('test chuyenmuc',chuyenmuc)

            let tmp = ''
            chuyenmuc.forEach( (ele,index) =>{
                tmp = tmp + (index+1) + ". " + ele + " \n "
            })
            
            let id = $('#ModelPhanQuyenTaiKhoan').attr("data-id")
            $(`th[data-chuyenmuc=${id}]`).html( tmp.replace(/\n/g, '<br/>') )


           
        }
    })
    .catch(e => {
        $("#ThongBao_pq").html(e)
    })

}