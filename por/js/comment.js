function getComment(id, type) {
    //获取全部评论
    $.ajax({
        type: 'get',
        url: URL+'/comment?belongId='+ id +'&type='+ type,
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
            if (xhr.success){
                Comment(xhr.data)
            }
        },
        error: function (xhr) {
            alert("获取失败");
        }
    })
}

function Comment(ComList) {
    $(ComList).each(function (index, Content) {
        // let time = Content.createTime;
	
		// console.log(Content);

        let comment = $('<div class="comment-neirong" data-commentId = "'+ Content.commentId +'">\n' +
            '        <p><strong data-userId="'+ Content.user.userId +'">'+ Content.user.nickName +'</strong></p>\n' +
            '        <p>'+ new Date(Content.createTime).Format("yyyy-mm-dd") +'</p>\n' +
            '        <p>\n' + Content.commentContent +
            '        </p>\n' +
            '        <p>\n' +
            '            <span id="click_more"></span>' +
            '            <span>\n' +
            '                    <button>评论</button>\n' +
            '                    <button data-likes="'+ Content.likes +'">点赞</button>\n' +
            '                </span>\n' +
            '        </p>\n' +
            '    </div>');

        // if ()
        // console.log(Content.childrenCommentList);

        $('#comment-nav').after(comment);
    })
}

// new Date(item.createTime).Format("yyyy-mm-dd");
// 时间格式转换
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };

    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;

};

// 添加评论
function addComment(belongId, type, comment ,parentId) {
	
	let commentInfo = {
        belongId: belongId,
        commentContent: comment,
        type: type
    };
    $.ajax({
        type: 'post',
        url: URL+'/comment',
        data: JSON.stringify(commentInfo),
        contentType: "application/json",
        dataType: "json",
        xhrFields:{
            withCredentials:true
        },
        success: function (xhr) {
			getComment(belongId, type);
        }
    })
}

// 获取自己的评论
function getMyComment() {
    $.ajax({
        url: URL + '/comment/myComment',
        type: 'get',
		contentType: "application/json",
		dataType: "json",
		xhrFields:{
			withCredentials:true
		},
        success: function (xhr) {
			// console.log(xhr);
			if (xhr.success){
                createMyComment(xhr.data);
            }
		}
    })
}

// new Date(Content.createTime).Format("yyyy-mm-dd")

function createMyComment(MyCommentList) {
    $.each(MyCommentList, function (index, item) {
        let type = item.type;
        let belongId = item.belongId;
        let data = {};
        
        if (type === 1){
			data = getOneShop(belongId);
        } else if (type === 2) {
			data = getOnePost(belongId);
        } else {
            return false;
        }
	
		// console.log(data);
  
	
		let myComment = $('<div class="comment" data-comment="2">\n' +
			'            <div class="panel panel-default">\n' +
			'                <div class="panel-heading"><p class="panel-title">'+ item.commentContent +'</p></div>\n' +
			'                <div class="panel-body panel-content">\n' +
			'                    <p>《'+ data.postTitle +'》</p>\n' +
			'                    <p></p>\n' +
			'                </div>\n' +
			'                <div class="panel-footer">\n' +
			'                    <span>'+ new Date(item.createTime).Format("yyyy-mm-dd") +'</span>\n' +
			'                </div>\n' +
			'            </div>\n' +
			'        </div>');
		
		$("#put").prepend(myComment);
	})
}