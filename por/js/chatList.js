$(function () {
    getChatList()
});

function getChatList() {
    $.ajax({
        url: URL + '/chat/recentMessage',
        type: 'get',
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success) {
                console.log(xhr.data);
                createChatList(xhr.data);
            }
        }
    })
}

/*function getUserMes(userId) {
    let mes = null;
    $.ajax({
        url: URL + '/user/' + userId,
        type: 'get',
        xhrFields:{
            withCredentials:true
        },
        async:false,
        success: function (xhr) {
            if (xhr.success) {
                // console.log(xhr.data);
                mes = xhr.data;
            }
        }
    });
    return mes;
}*/

function NotReceived(chatId) {
    let count = null;
    $.ajax({
        url: URL + '/chat/'+ chatId + '/notReceivedMessage?pageIndex=1&pageSize=999',
        type: 'get',
        async: false,
        xhrFields: {
            withCredentials:true
        },
        success: function(xhr) {
            // console.log(xhr.data.count);
            count = xhr.data.count;
        }

    });

    // console.log(count);
    return count;
}

function createChatList(list) {
    $(list).each(function (index, friend) {
        // let userMes = getUserMes(friend.);
        let count = NotReceived(friend.chatId);
        if (count === 0){
            let friendMes = $('<li class="list-group-item" data-acceptName="'+ friend.userVO.nickName +'" data-chatId="' + friend.chatId + '">\n' +
                '                    <img src="img/header/h1.jpg" alt="header">\n' +
                '                    <div>\n' +
                '                        <p><strong>' + friend.userVO.nickName + '</strong></p>\n' +
                '                        <span>' + friend.content + '</span>\n' +
                '                    </div>\n' +
                '                </li>');

            $("#mesList").append(friendMes);
        } else {
            let friendMes = $('<li class="list-group-item" data-acceptName="' + friend.userVO.nickName + '" data-chatId="' + friend.chatId + '">\n' +
                '                    <span class="badge">' + count + '</span>\n' +
                '                    <img src="img/header/h1.jpg" alt="header">\n' +
                '                    <div>\n' +
                '                        <p><strong>' +  friend.userVO.nickName + '</strong></p>\n' +
                '                        <span>' + friend.content + '</span>\n' +
                '                    </div>\n' +
                '                </li>');

            $("#mesList").append(friendMes);
        }

    })
}