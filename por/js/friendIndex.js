$(function () {
	let userId = $.getUrlParam('userId');
	let userMes = getUser(userId);
	
	initArticle(userId);
	initShop(userId);
	
	$("#userName strong").text(userMes.nickName);
	
});

$("#open").click(function () {
	$("#other").modal("toggle");
});
$("#send").click(function () {
	let userId = $.getUrlParam('userId');
	addChat(userId);
	
});
$("#back").click(function () {
	window.history.back();
});

$(".pagination li").click(function () {
	let style = $(this).data('style');
	switch (style) {
		case 0:
			$('#post').hide();
			$('#shop').show();
			break;
		case 1:
			$('#post').show();
			$('#shop').hide();
			break;
	}
});

$("#addFriends").click(function () {
	let userId = $.getUrlParam('userId');
	addFriend(userId);
});


/**************************AJAX***********************************/

function addChat(receiverId) {
	// console.log(receiverId);
	
	$.ajax({
		url: URL + '/chat/add/' + receiverId,
		type: 'post',
		xhrFields: {
			withCredentials:true
		},
		success: function (xhr) {
			// console.log(xhr.data);
			window.location.href = "chat.html?chatId=" + xhr.data;
		}
	});
}

function addFriend(userId) {
	$.ajax({
		url: URL + '/user/addFriend/' + userId,
		type: 'post',
		xhrFields: {
			withCredentials:true
		},
		success: function (xhr) {
			if (xhr.success){
				$("#snackbar").text('添加成功，等待对方同意');
				toast();
			} else {
				$("#snackbar").text(xhr.message);
				toast();
			}
		}
	})
}