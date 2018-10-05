'use strict';
$(function () {
    // 获取好友列表
    getUserList(1, 1);
    getUserList(0, 1);
});


$("#myF .list-group-item").click(function () {
    window.location.href = "friends-index.html";
});


$(".newFriends").click(function () {
    $("#newF").fadeToggle(0);
    $('#myF').fadeToggle(0);

    let type = $("#prompt").data('type');
    if (type === 0){
        $("#prompt").text("我的朋友").data("type", 1);
    } else {
        $("#prompt").text("新朋友").data("type", 0);
    }
});


