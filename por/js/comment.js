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
                // console.log(xhr.data);
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

        let comment = $('<div class="comment-neirong" data-commentId = "'+ Content.commentId +'">\n' +
            '        <p><strong data-userId="'+ Content.user.userId +'">'+ Content.user.userName +'</strong></p>\n' +
            '        <p>'+ new Date(Content.createTime).Format("yyyy-mm-dd") +'</p>\n' +
            '        <p>\n' + Content.commentContent +
            '        </p>\n' +
            '        <p>\n' +
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

function addComment(belongId, type, parentId) {
    let commentInfo = {
        belongId: belongId,
        commentContent: '123',
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
            console.log(xhr);
        }
    })
}
