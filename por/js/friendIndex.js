$(function () {
	initArticle(myId);
	initShop(myId);
});



$("#open").click(function () {
	$("#other").modal("toggle");
});
$("#send").click(function () {
	let userId;
	addChat(userId);
	
});
$("#back").click(function () {
	window.history.back();
});



/**************************AJAX***********************************/

function addChat(receiverId) {
	$.ajax({
		url: URL + '/chat/add/' + receiverId,
		type: 'post',
		xhrFields: {
			withCredentials:true
		},
		success: function (xhr) {
			window.location.href = "chat.html?chatId=" + xhr.data;
		}
	});
}