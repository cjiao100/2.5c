   // const  URL = "http://192.168.199.179:8081";
   // const  URL = "http://stxkfzx.xin:8081";
   const  URL = "http://119.23.208.165:8081";

   // const  SocketURL = "ws://192.168.199.179:8081";
   // const  SocketURL = "ws://stxkfzx.xin:8081";
   const  SocketURL = "ws://119.23.208.165:8081";
   
   const ID = window.localStorage.getItem('myId');

   //const  URL = "http://10.10.15.2:8081";

$(function () {
    let width = window.screen.width;
    $('body').css('font-size', width/27);
});

document.addEventListener('plusready', function() {
    let webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();
            } else {
                //webview.close(); //hide,quit
                //plus.runtime.quit();
                //首页返回键处理
                //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                let first = null;
                plus.key.addEventListener('backbutton', function() {
                    //首次按键，提示‘再按一次退出应用’
                    if (!first) {
                        first = new Date().getTime();
                        // console.log('再按一次退出应用');
                        setTimeout(function() {
                            first = null;
                        }, 1000);
                    } else {
                        if (new Date().getTime() - first < 1500) {
                        	window.localStorage.clear();
                            plus.runtime.quit();
                        }
                    }
                }, false);
            }
        })
    });
});