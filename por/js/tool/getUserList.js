// 获取用户信息
function getUser(userId){
    let userMes = {};

$.ajax({
	url: URL + '/user/' + userId,
	type: 'get',
	xhrFields: {
		withCredentials: true
	},
	success: function (xhr) {
		if (xhr.success) {
			userMes.userName = xhr.data.nickName;
			userMes.headerImg = xhr.data.headImage;
			userMes.phone = xhr.data.phone;
		}
	}
});
console.log(userMes);
return userMes;
}

// 获取搜索用户列表的AJAX
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

// 获取好友列表以及新朋友列表的AJAX
function getUserList(status, index) {
    $.ajax({
        url: URL+ '/user/friend/' + status + '?pageIndex=' + index + '&pageSize=' + 10,
        type: 'get',
        xhrFields: {
            withCredentials:true
        },
        success: function(xhr) {
            if (xhr.success) {
                if (status === 0) {
                    createNewUser(xhr.data);
                } else if (status === 1) {
                    createUser(xhr.data);
                }
            }
        }
    })
}

// 搜索好友以及获取好友列表
function createUser(friendList) {
    $.each(friendList, function (index, item) {
        let friend = $('<li class="list-group-item" data-userid="'+ item.userId +'">\n' +
            '            <img src="img/header/h3.jpg" class="img-circle" alt="">\n' +
            '            <span>'+ item.nickName +'</span>\n' +
            '        </li>');

        $('#myFriendList').append(friend);
    });
}
// 获取新朋友列表
function createNewUser(friendList) {
    $.each(friendList, function (index, item) {
        let newfriend = $('<li class="list-group-item" data-userid="'+ item.userId +'">\n' +
            '            <img src="img/header/h3.jpg" class="img-circle" alt="">\n' +
            '            <span>'+ item.nickName +'</span>\n' +
            '            <div class="button">\n' +
            '                <button class="btn" data-select="0">拒绝</button>\n' +
            '                <button class="btn btn-primary" data-select="1">同意</button>\n' +
            '            </div>' +
            '        </li>');

        $('#newFriendList').append(newfriend);
    })
}