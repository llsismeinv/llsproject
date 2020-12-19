var usernameLock = false;
var passwordLock = false;
var code = document.getElementById("code")
var error = document.getElementById("#yanzhengma-error")
var yanzhengma = document.getElementById("yanzhengma")
jQuery.validator.addMethod('rigister1', function (value) {
    let reg = /^1[3,5,6,7,8]\d{9}$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
});
jQuery.validator.addMethod('pass', function (value) {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
});


// 调用函数产生验证码
code.value = rand(6);
// 点击刷新验证码
code.onclick = function () {
    // 调用函数
    let num = rand(6);
    this.value = num;
};
// 验证码函数
function rand(number) {
    // 存储验证码
    let codeNum = "";
    // 循环生成验证码
    for (let i = 0; i < number; i++) {
        // 验证码随机颜色
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let codeColor = "rgb" + "(" + r + "," + g + "," + b + ")";
        code.style.color = codeColor;
        // 验证码
        codeNum += Math.floor(Math.random() * 10);
    }
    return codeNum;
}


// 验证码输入框失去焦点事件
yanzhengma.onblur = function () {
    // 获取验证码输入框内容
    let checkCodeVal = $("#yanzhengma").val();
    // 获取验证码内容
    let codeVal = $("#code").val();
    // 校验验证码
    if (checkCodeVal!=codeVal) {
        // error.innerText = "验证码不正确";
        // 重新调用函数，生成新的验证码
        // console.log(codeVal)
        // console.log( checkCodeVal)
        // checkCodeVal="";
        alert("验证码错误")
        codeVal = rand(6);
        return;
    }
}



$("#rigister").validate({
    onfocusout: function (element) {
        $("#yanzhengma").valid();

    },
    rules: {
        rigisterphone: {
            required: true,
            rigister1: true,
            // focusCleanup: true,

        },
        yanzhengma: {
            required: true,
          minlength:6,
            maxlength:6

        },
        password: {
            required: true,
            pass: true,
        },
        password1: {
            required: true,
            equalTo: "#password",
        },
        check: {
            required: true,
        }
    },
    messages: {

        rigisterphone: {
            required: '手机号不能为空',
            rigister1: ' 请输入你的11位手机号',
        },
        yanzhengma: {
            required: ' 请输入6位数字验证码',

        },
        password: {
            required: '密码不能为空',
            pass: '请输入8-20位密码',
        },
        password1: {
            required: '请确认输入密码',
            equalTo: '两次输入的密码不一致，请重试',
        },
        check: {
            required: '接受服务条款才可以注册',
        }

    },
    submitHandler: function () {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求



        ajax({
            url: '../../../php/checkusername.php',
            // type: 'post',  这里默认get吗是啊
            data: {
                username: $("#rigisterphone").val(),
            },
            success: function (res1) {

                // console.log(JSON.parse(res1).error);
                let newRes = JSON.parse(res1);
                console.log(newRes.error)
                if (newRes.error == 0) {
                    // $("#rigisterphone").style.border = "2px solid green";                    
                    ajax({
                        url: '../../../php/rigister.php',
                        // type: 'post',  这里默认get吗是啊
                        data: {
                            username: $("#rigisterphone").val(),
                            password: $("#password").val()
                        },
                        success: function (res) {
                            // usernameLock = true;
                            console.log(res)

                       
                        }
 
                    })
        
        // console.log(location.href);
        
        // location.href="localhost:80/eigthweekxiangmu.com/web/html/login.html"
         location.href="./login.html"
                } else if (newRes.error == 1) {
                    alert('用户名已存在')
                    // $("#rigisterphone").style.border = "2px solid #f00";

                }
            }

        })

    }
})