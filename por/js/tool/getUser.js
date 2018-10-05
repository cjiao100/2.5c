// 获取用户信息
function getUser(userId){
	let user = {};
	
	$.ajax({
		url: URL + '/user/' + userId,
		type: 'get',
		async:false,
		xhrFields: {
			withCredentials: true
		},
		success: function (xhr) {
			if (xhr.success) {
				console.log(xhr.data);
				user = xhr.data;
			}
		}
	});
	
	console.log(user.nickName);
	
	return user;
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
					console.log(xhr);
                    createNewUser(xhr.data);
                } else if (status === 1) {
					console.log(xhr);
					createUser(xhr.data);
                }
            }
        }
    })
}

// 搜索好友以及获取好友列表
function createUser(friendList) {
	console.log(friendList);
	$.each(friendList, function (index, item) {
		// console.log(item);
        let friend = $('<li class="list-group-item" data-userid="'+ item.userId +'">\n' +
            '            <img src="img/header/h3.jpg" class="img-circle" alt="">\n' +
            '            <span>'+ item.nickName +'</span>\n' +
            '        </li>');

        $('#myFriendList').append(friend);
    });
}
// 获取新朋友列表
function createNewUser(friendList) {
	console.log(friendList);
	$.each(friendList.friendList, function (index, item) {
		if (item.userVO.sender === 0){
			let newfriend = $('<li class="list-group-item" data-userId="'+ item.userVO.userId +'">\n' +
				'            <img src="img/header/h3.jpg" class="img-circle" alt="">\n' +
				'            <span>'+ item.userVO.nickName +'</span>\n' +
				'            <div class="button">\n' +
				'                <button class="btn" data-select="false">拒绝</button>\n' +
				'                <button class="btn btn-primary" data-select="true">同意</button>\n' +
				'            </div>' +
				'        </li>');
			
			$('#newFriendList').append(newfriend);
		}
    })
}