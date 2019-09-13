console.log(`es6 string template`);

$(function(){
	var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	$('#loginForm').on('submit', function(e){
		e.preventDefault();
		var phone = $(this).find('input[name="phone"]').val();
		$err = $(this).find('.err');
		if (!phoneReg.test(phone)) {
			$err.addClass('show-err').text('手机号为空或者格式不对');
			return false;
		}
		$err.removeClass('show-err').text('');
	});

	var countState = true;
    var timer = null;
	$('#vcodeBtn').on('click', function(){
		var btn = $(this);
        var phone = $('input[name="phone"]').val();
        if (phone == '') {
            $('.err').addClass('show-err').text('请输入手机号码');
            return false;
        }
        if (!phoneReg.test(phone)) {
            $('.err').addClass('show-err').text('手机格式错误');
            return false;
        }
        
        function codeCountDown($ele) {
            var time = 59;
            timer = setInterval(function () {
                if (time === 0) {
                    countState = true;
                    $ele.text('获取验证码');
                    clearInterval(timer);
                    return false;
                } else {
                    countState = false;
                    $ele.text(time-- + '秒');
                }
            }, 1000);
        }
        if (countState) {
            codeCountDown($(this));
            // ajax 
        }
	});

    $.ajax({
        type: 'POST',
        url: '/mobao/mine/personal',
        data: {
            userId: 87,
        }
    }).done(function (res) {
        
    }).fail(function (error) {
        throw new Error(error)
    })
});