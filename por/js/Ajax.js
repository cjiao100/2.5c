function obj2str(data) {
    data.t = new Date().getTime();
    let res = [];
    for (let key in data) {
        if(!data.hasOwnProperty(key)) continue;
        //当传入URL有中文时 通过encodeURIComponent进行转码
        //URL中只能出现字母、数字、下划线以及ASCII码
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
    }
    return res.join("&")
}
function ajax(option) {
    //将对象转化为字符串
    let str = obj2str(option.data);
    //创建异步对象
    let xmlhttp, timer;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 判断请求类型
    //toLowerCase() 方法用于把字符串转换为小写, 这样的话在传入请求类型时，无需必须大写
    if(option.type.toLowerCase() === "GET") {
        //设置请求方式和地址
        xmlhttp.open(option.type, option.url + "?" + str, true);
        //发送请求
        xmlhttp.send();
    } else {
        xmlhttp.open(option.type, option.url, true);
        //一下代码必须在open和send方法之间
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }

    //监听状态的改变
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            clearInterval(timer);
            if (xmlhttp.status >= 200 && xmlhttp.status <= 300 || xmlhttp.status === 304) {
                option.success(xmlhttp);
            } else {
                option.error();
            }
        }
    };
    //判断外界是否传入超时
    if (option.timeout){
        timer = setInterval(function () {
            xmlhttp.abort();
            clearInterval(timer);
            console.log("中断请求");
        }, option.timeout)
    }
}