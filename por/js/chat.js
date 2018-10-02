$(function() {
	let chatId = $.getUrlParam('chatId');
	let acceptName = $.getUrlParam('acceptName');
	let websocket = null;
	let postInfoUrl = URL + '/post/' + chatId;
	let currentInfoId = null;
	let pageIndex = 1;
	let pageSize = 10;

/*	const JOIN = 1;
	const CLOSE = 2;*/

    connectWebSocket();

	$('#send').on('click', function(e) {
		let msg = $("#chat").val();
		if(msg !== null || $.trim(msg) !== '') {
			let postValue = {};
			postValue.message = msg;
			websocket.send(JSON.stringify(postValue));
		} else {
            console.log("未輸入消息");
        }
		$("#chat").val('');
	});

	$('#acceptName').text(acceptName);

	function connectWebSocket() {
		console.log("开始建立socket连接....");

        //判断当前浏览器是否支持WebSocket
        if('WebSocket' in window){
            // 建立连接
            websocket = new WebSocket("ws://192.168.199.179:8081/one/realTime/chatId=1");
        }
        else{
            alert('Not support websocket')
        }



		websocket.onopen = function() {
			console.log("连接成功");
            // Time(chatId, JOIN);
			beforeMessage();
            // console.log(html);
        };

		websocket.onclose = function() {
			console.log("关闭连接");
			// Time(chatId, CLOSE);
		};

		websocket.onmessage = function(msg) {
			console.log(msg.data);
			let info = JSON.parse(msg.data);
			//				console.log(info.success);
			//				console.log(info.message);
			if(info.success) {
				let html = appendChatContentHTML(info.data);
				$('.list-group').append(html);
			} else {
				$.toast("亲,没登录不能发消息");
			}
		};
	}

	function appendChatContentHTML(data) {
        // console.log(data);
        let sendPeople = data.myMessage ? 'right' : 'left';
		currentInfoId = data.infoId;
		let content = data.message || data.content;
		let html = '<li class="list-group-item">' +
			'<div class="' + sendPeople + ' messages clearfix  ">' +
			'<div class="header-img pull-' + sendPeople + '" data-user-id="' + data.userId + '");></div>' +
			'<div class="send pull-' + sendPeople + '">' +
			'<p>' +
			'<span>' + content + '</span>' +
			'</p>' +
			'<div class="arrow"></div>' +
			'</div>' +
			'</div>' +
			'</li>';

		return html;
	}

	function closeWebSocket() {
		if(websocket !== null) {
			websocket.close();
		}
	}

	window.onunload = function() {
		closeWebSocket();
		// Time(chatId, CLOSE);
	};

	// 下拉刷新
	$(document).on('refresh', '.pull-to-refresh-content', function(e) {
		// TODO 从后台获取数据
		let html = beforeMessage();
//			let html = appendChatContentHTML(data.data);
		$(e.target).find('.list-group').prepend(html);
		// 加载完毕需要重置
		$.pullToRefreshDone('.pull-to-refresh-content');
	});
	function beforeMessage() {
		let html = '';
		let parame = currentInfoId === null ? '' : '&infoId=' + currentInfoId;
		let count = 0;
		$.ajax({
			url: URL + '/chat/'+ chatId + '/beforeMessage?pageIndex='+pageIndex+'&pageSize=' + pageSize + parame,
			type: 'get',
			// async: false,
            xhrFields: {
                withCredentials:true
            },
			success: function(xhr) {
				console.log(xhr);
				if (xhr.success) {
				    if (xhr.data.messageList.length !== 0) {
                        pageIndex ++;
                        // console.log(xhr.data.messageList);
                        $.each(xhr.data.messageList, function (index, item) {
                            // console.log(item);
                            html = appendChatContentHTML(item);
                            $('#char-window').append(html);
                        })
                    }
				}
			}
			
		});
	}

	// function Time(chatId, type) {
	// 	$.ajax({
    //         url: URL+ '/chat/' + chatId + '/' + type,
	// 		type: 'put',
    //         xhrFields:{
    //             withCredentials:true
    //         },
	// 		success: function (xhr) {
    //             console.log(xhr);
    //         },
    //         error: function (xhr) {
    //             console.log(xhr);
    //         }
	// 	})
    // }
});