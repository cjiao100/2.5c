'use strict';
//获取URL的参数
$.getUrlParam = function (name) {
    let a = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(a);
    if (r !== null) return decodeURI(r[2]);
    return null;
}