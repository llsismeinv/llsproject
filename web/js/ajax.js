
/**
 * @param {object} option I am argument option. 
 */
function ajax(option) {
    // 在发送请求之前先判断参数是否正确
    // 1.必须有的参数：url
    if (!option.url) {
        // 当没有url地址的时候 应该手动抛出一个错误，告诉调用者，url是必填参数
        // throw 抛出错误
        throw new Error('url是必填参数')
    }

    // 2.设置默认的参数
    let defInfo = {
        type: 'get',
        data: '',
        async: true,
        success() { }
    }

    // 3.循环把传递进来的参数 取出来拿给默认参数对象
    for (let attr in option) {
        defInfo[attr] = option[attr];
    }

    // 4.判断请求方式type 是否是get 或者 post
    if (!/^(get|post)$/i.test(defInfo.type)) {
        throw new Error('暂时只支持get 和post请求');
    }

    // 5.ajax请求携带的参数只支持 "key=value&age=18"
    if (!(typeof defInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defInfo.data) || Object.prototype.toString.call(defInfo.data) == '[object Object]')) {
        throw new Error('data参数只支持key=vlue 或者对象')
    }

    // {name:aa,age:18}===> name=aa&age=18
    // 6.如果参数时对象的时候，那么久把这个对象处理 key=value&age=18
    let str = '';
    if (Object.prototype.toString.call(defInfo.data) == '[object Object]') {
        for (let key in defInfo.data) {
            // console.log(key);
            str += `${key}=${defInfo.data[key]}&`
        }
    }
    // 把处理好的结果赋值给data
    defInfo.data = str.slice(0, -1);

    // 7.判断传进来的success是否是函数
    if (!(Object.prototype.toString.call(defInfo.success) === "[object Function]")) {
        throw new Error('success 必须是一个函数')
    }

    // 8.判断async的值是否是布尔值
    if (!(Object.prototype.toString.call(defInfo.async) === "[object Boolean]")) {
        throw new Error('saync 只能是布尔值')
    }

    // 8.发送ajax请求
    // let xhr = new XMLHttpRequest();
    // let xhr = new ActiveXObject("Microsoft.XMLHTTP");

    /* 
        try{
            尝试执行这里的代码，如果这里的代码能执行就会把这个代码执行
            如果这里代码有错误，那么久执行 catch
        }catch(error){
            当try中代码有问题，执行这里代码
            如果try中代码没有问题，不会执行这里
        }
    */
    // let xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 设置请求的方式 和url地址
    // 进行判断，如果过get请求，需要把参数拼接在url地址后面
    if (/^(get)$/i.test(defInfo.type)) {
        xhr.open(defInfo.type, defInfo.url + '?' + defInfo.data, defInfo.async);
        xhr.send();
    } else {
        xhr.open(defInfo.type, defInfo.url, defInfo.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defInfo.data)
    }

    // 接收响应体
    xhr.onreadystatechange = function () {
        if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
            defInfo.success(xhr.responseText);
        }
    }

}


// 封装一个promise的ajax
function pAjax(option) {
    return new Promise(function (resvole, reject) {
        ajax({
            url: option.url,
            data: option.data || '',
            type: option.type || 'get',
            async: option.async || true,
            success(res3) {
                resvole(JSON.parse(res3));
            }
        })
    })
}