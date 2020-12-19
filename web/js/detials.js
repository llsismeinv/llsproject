let close = document.querySelector('.close');
var citylist = document.querySelector(".citylist");
let list = document.querySelector('.list')
let city = document.querySelector('.city')
let breadcrumb = document.querySelector('.breadcrumb')
let breadcrumblist = document.querySelectorAll('.breadcrumb li')
let dropdownmenu = document.querySelector('.dropdown-menu')


// console.log(breadcrumblist)
// console.log(city);
cityarr = [
    '北京市', '天津市', '河北省', '山西省', '内蒙古',
    '辽宁省', '吉林省', '黑龙江', '上海市', '江苏省', '浙江省',
    '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省',
    '湖南省', '广东省', '广西省', '海南省', '重庆市', '四川省',
    '贵州省', '云南省', '西藏', '山西省', '甘肃省', '青海省', '宁夏', '维吾尔族'
]
//城市页面渲染
function render() {
    var str = "";
    for (var i = 0; i < cityarr.length; i++) {
        str += `                   
    <li><span>${cityarr[i]}</span></li>`
    }
    list.innerHTML = str;

}
render();
//循环数组给城市上树
let listlist = document.querySelectorAll('.list li')
listlist.forEach(function (item) {
    city.innerHTML = item.querySelector('span').innerText;
    item.onclick = function () {
        var str = this.querySelector('span').innerText;
        city.innerText = str;
        city.style.background = '#F5F5F5';
    }
})
//委托事件实现城市列表的显示
city.onclick = function () {
    let e = window.event;
    let target = e.target;
    if (target.className == 'city') {
        citylist.style.display = 'block';
        city.appendChild(citylist)
        city.style.background = 'white';
    } else if (target.className == 'close') {
        citylist.style.display = 'none';
        city.style.background = '#F5F5F5';
    }
}

//点击之后的城市有颜色
// listlist.forEach(function (item) {
//     console.log(item)
//     item.onclick=function(){
//         if( city.innerHTML=item.querySelector('span').innerText){
//             item.setAttribute("class", "hot")
//         }

//     }
// })



$('.sphover').mouseleave(function () {
    $('.sps').hide();
    $('.splist').slideUp()
})
$('.sphover').mouseenter(function () {
    $('.splist').slideDown()
});
$('.splist>li').mouseenter(function () {
    var index = $(this).index();
    $('.sps').show()
    $('.sp1').removeClass('select')
    $('.sp1').eq(index).addClass('select');
})

//判断登陆
var myname = document.getElementById('myname');
var loginname = document.querySelector('.loginname');
//    setCookie('login',$("#loginname").val());
var isLogin = getCookie("login") || "";
console.log(isLogin)
if (!isLogin) {
    myname.innerText = "请登录";
    loginname.innerText = "你好![请登录]";
    // localStorage.setItem('url', 'http://eigthweekxiangmu.com/web/html/detials.html');
        localStorage.setItem('url', './detials.html');

} else {
    myname.innerText = isLogin;
    loginname.innerText = isLogin;
}



//检测列表页(首页)传来的id号
let reg = /id=(\d+)/;
//search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）。
if (!reg.test(location.search)) {
    location.href = '../index.html'
}
//exec() 方法用于检索字符串中的正则表达式的匹配。
let id = reg.exec(location.search)[1]; //检测id号  例如值是4
console.log(id)
// 根据id获取数据
pAjax({
    url: '../../../php/getDetail.php',
    data: {
        id
    }
}).then(res => {
    // console.log(res);
    renderHtml(res.detail)
    fun()
})

//给详情页渲染页面
let contentleft = document.querySelector(".contentleft")
let contentright = document.querySelector(".contentright")
let spdetials = document.querySelector(".spdetials")
function renderHtml(data) {
    // class='col-lg-3'
    contentleft.innerHTML = `
    <div class="">
    <div  id="rongqi">
    </div>
     <div class="contentleftbt">
    <img src="../images/pc_xuanguan.png"
     </div>
    </div>
  </div> 
    `
    contentright.innerHTML = `
    <div class="rightdata" style="height:50px">
                  <a href="" style="font-size: 16px;text-decoration: none">${data.cat_id}</a>
                  <p style="font-size: 16px;font-weight:bolder">${data.goods_name}</p>
              </div>
              <div class="rightdata" style="height:94px;background: #FA2A83;margin-top:20px">
                  <div>￥${data.goods_price}</div>
                  <div>
                      <p style='margin-bottom:0px;margin-top: 15px'><img src="../images/fengqiang.png"></p>
                      <span style="font-size: 12px;color:white">累计热卖2.8万件</span>
                      </div>
                      </div>
                      <div class="rightdata" style="height:67px; ">
                          <div>
                              <span style="display: inline-block;font-size: 12px;color:#999999">配送</span>
                              <div class="form-group">
                                  <select class="form-control" id="exampleFormControlSelect1"
                                      style="width:250px;position: relative;top:-20px;left:55px">
                                      <option>北京市 西城区 大栅栏街道</option>
                                  </select>
                              </div>
                              <p style="width:200px;position: relative;top:-33px;left:55px;font-size: 12px">现在下单，最快周六送达
                              </p>
                          </div>

                      </div>
                      <div class="rightdata" style="height:32px">
                      <span style="display: inline-block;font-size: 12px;color:#999999">运费</span>
                      <span style="font-size: 12px;margin-left: 30px">订单满88元免运费</span>

                      </div>
                      <div class="rightdata" style="height:41px">
                    <span style="font-size: 12px;color:#999999">颜色</span>
                    <P
                        style="width:90px;height:30px;border: #FA2A83;margin-bottom: 0px;position: relative;left: 60px;top: -20px">
                        <img style="width:28px;height:28px" src="${data.goods_small_logo}">
                        <span style="font-size: 13px;margin-left: 10px">红色</span>
                    </P>
                    </div>
                    <div class="rightdata" style="height:109px">
                        <span style="font-size: 12px;color:#999999">尺寸</span>
                        <ul class="cclist" style="width: 375px;height:80px;position: relative;left: 60px;top: -20px">
                        <li class="sel">35</li>
                        <li>36</li>
                        <li>37</li>
                        <li>38</li>
                        <li>39</li>
                        <li>40</li>
                        </ul>
                    </div>
                    <div class="rightdata" style="height:50px">
                            <span style="font-size: 12px;color:#999999">数量</span>

                            <div class="btn-group" style="width:102px;height: 33px;border:#ccc 1px solid;position: relative;left: 33px;top: 2px;border-radius: 0px" role="group" aria-label="...">
                                <button class="btn btn-default" style="background: #F9F8F8">-</button>
                                <button class="btn btn-default" style="background: #fff">1</button>
                                <button class="btn btn-default" style="background: #F9F8F8">+</button>
                                </div>

                                </div>
                                <div class="rightdata price" style="height:56px">
                                <div style="width:113px;background: #F688A4;margin-left: 60px" class="addcar">
                                <a href="javascript:void(0)" style="text-decoration: none" class='addcar'>
                                <span style="font-size: 20px;margin-left: 7px;display: inline-block;color:white" class='addcar'>
                                ￥${data.goods_price}</span>
                                <span style="font-size: 14px;display: inline-block;color:white" class='addcar'>
                                特卖价&nbsp;&nbsp;抢>
                                </span>
                                </a>
                                </div>
                                <div style="width:139px;text-align: center;line-height: 56px;background: #F03867;" class="gotocar">
                                <a style="color:white;text-decoration: none" href="javascript:void(0)"class='gotocar' >加入购物车</ a></div>
                                </div>
                                <div class="rightdata" style="height:55px">
                                    <span style="font-size: 12px;color:#999999">客服</span>
                                    <span class="news"></span>
                                    <a href=""style="font-size:12px">在线客服</a><span style="font-size:12px">(09:00-23:59)</span>
                                </div>
                                <div class="rightdata" style="height:50px">
                                    <span style="font-size: 12px;color:#999999">服务</span>
                                    <ul class="fuwu">
                                        <li><i></i>
                                            <sapn>唯品会发货及售后</sapn>
                                        </li>
                                        <li><i></i>
                                            <sapn> 顺丰配送</sapn>
                                        </li>
                                        <li><i></i>
                                            <sapn> 7天无理由退货</sapn>
                                        </li>
                                        <li><i></i>
                                            <sapn>退货无忧</sapn>
                                        </li>
                                        <li><i></i>
                                            <sapn>7天可换</sapn>
                                        </li>
                                </ul>

                            </div>
        </div>
     
    `
    spdetials.innerHTML = `
    
    <div class="goods_detail">
    ${data.goods_introduce}
</div>
    
    `

    //给尺寸添加点击事件时边框变色
    let cclist = document.querySelectorAll('.cclist li')
    let sel = document.querySelector('.sel')
    $(cclist).click(function () {
        $(this).addClass("sel").siblings().removeClass("sel");
    });
    //调用放大镜的函数
    var rongqi = document.getElementById("rongqi");
    // var aa=rongqi.querySelector("div:nthchired")
    rongqi.style.width = "420px";
    rongqi.style.height = "491px";
    rongqi.style.position = 'relative';
    var tupian = new Zoom(rongqi, [{
            tubiao: `${data.goods_small_logo}`,
            smalltu: `${data.goods_small_logo}`,
            bigtu: `${data.goods_big_logo}`
        },
        {
            tubiao: `${data.goods_small_logo}`,
            smalltu: `${data.goods_small_logo}`,
            bigtu: `${data.goods_big_logo}`
        },
        {
            tubiao: `${data.goods_small_logo}`,
            smalltu: `${data.goods_small_logo}`,
            bigtu: `${data.goods_big_logo}`
        },
        {
            tubiao: `${data.goods_small_logo}`,
            smalltu: `${data.goods_small_logo}`,
            bigtu: `${data.goods_big_logo}`
        }
    ])


 
}
// fun()
function fun(){
    let addcar = document.querySelector('.addcar')
    console.log(addcar);
    
    let gotocar = document.querySelector('.gotocar')   
    
    contentright.onclick = function () {
        let e = window.event;
        console.log(e.target.className);
        
        // console.log(2)
        if (e.target.className == 'gotocar') {
            let login = getCookie('login');                
            if(!login){
                location.href = '../html/login.html';
                // localStorage.setItem('http://eigthweekxiangmu.com/web/html/detials.html?id=' + id)
                                localStorage.setItem('./detials.html?id=' + id)

                return
            }
            pAjax({
                url:'../../php/addcardata.php',
                data:{
                    username:login,
                    goods_id:id 
                }
            }).then(res1=>{
                console.log(res1);
            })
            location.href = '../html/car.html'
            console.log(1)

         
        }
        if(e.target.className == 'addcar'){
            // 因为添加到购物车按钮 需要把用户名和商品id
            // 所以需要判断是否有登录
            let login = getCookie('login');                
            if(!login){
                location.href = '../html/login.html';
                // localStorage.setItem('http://eigthweekxiangmu.com/web/html/detials.html?id=' + id)
                                localStorage.setItem('./detials.html?id=' + id)

                return
            }
            pAjax({
                url:'../../../php/addcardata.php',
                data:{
                    username:login,
                    goods_id:id 
                }
            }).then(res1=>{
                console.log(res1);
            })
        }

    
    }
    
    
}

