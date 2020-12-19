let loginname = document.querySelector('#loginname')
let password= document.querySelector('#password')
$("#rigister").validate({
    rules: {
        loginname: {
            required: true,
        },
        password: {
            required: true,
        },
    },
    messages: {

        loginname: {
            required: '请输入登录名',
        },
        password: {
            required: '请输入密码',
        },

    },
    submitHandler: function () {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求
        ajax({
            url: '../../../php/login.php',
            // type: 'post',  这里默认get吗是啊
            data:{
                // username: $("#loginname").val(),
                username:loginname.value,
                // password: $("#password").val()
                password:password.value
            },
            success: function(res){
            
                   var res1=JSON.parse(res)

                 if(res1.code == 1){
                    // 登录成功存储 登录的状态
                    // setCookie('login',loginname.value);
            
                   // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
                 // 否则就去到首页
                 
                   setCookie('login',loginname.value,360000000, '/');
                    // location.href='http://eigthweekxiangmu.com/web/index.html';
                    let url = localStorage.getItem('url');
                    if(url){                       
                        location.href = url;
                        // 登录成功的时候把url的这个cookie值清除
                        localStorage.removeItem('url');
                    }else{
                        // location.href = 'http://eigthweekxiangmu.com/web/index.html';
                 location.href="../index.html"
                         }

                }


            }   
     
        })
   }

})