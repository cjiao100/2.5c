// const URL = "http://fmy.ngrok.xiaomiqiu.cn";
//const  URL = "http://192.168.199.179:8081";

//登录界面
$(function () {
    $("#captcha_img").attr('src', URL+'/kaptcha?');
    $('body').height(window.screen.height-25);

    // 点击登录时 获取登录手机号,密码以及验证码发送至后台
    $("#login").click(function () {
        let username = $("#phonenum").val();
        let userpaw = $("#passwordnum").val();
        let sms = $("#captcha").val();

        let loginInfo = {
            password: userpaw,
            phone: username,
            verifyCodeActual: sms
        };

        $.ajax({
           type: "post",
           url: URL+"/login",
           data: JSON.stringify(loginInfo),
           contentType: "application/json",
           dataType: "json",
           xhrFields:{
                    withCredentials:true
        	},
           success: function (xhr) {
               console.log(xhr);
               if (xhr.success){
                   window.location.href = "index_index.html";
                   window.localStorage.setItem('myId', xhr.data);
			   } else {
                   $("#snackbar").text(xhr.message);
                   toast();
               }
           }
       })
    });
});
//注册界面

