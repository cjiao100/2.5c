function searchUser(content) {
    let userCondition={};
    if(!(/^1[34578]\d{9}$/.test(content))){
        userCondition.nickName = content;
        // console.log("no");
    } else {
        userCondition.phone = content;
        // console.log('yes');
    }

    $.ajax({
        url: URL+'/user/search',
        type: 'get',
        data: {
            userCondition: JSON.stringify(userCondition)
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (xhr) {
            console.log(xhr);
            if (xhr.success){
                createUser(xhr.data);
            }
        }
    });
}

function getUser() {

}

// 搜索好友以及获取好友列表
function createUser(friendList) {
    $.each(friendList, function (index, item) {
        let friend = $('<li class="list-group-item" data-userid="'+ item.userId +'">\n' +
            '            <img src="img/header/h3.jpg" class="img-circle" alt="">\n' +
            '            <span>'+ item.nickName +'</span>\n' +
            '        </li>');

        $('#myFriendList').append(friend);
    })
}
// 获取新朋友列表