let close = document.querySelector('.close');
var citylist = document.querySelector(".citylist");
let list = document.querySelector('.list')
let city = document.querySelector('.city')
let breadcrumb = document.querySelector('.breadcrumb')
let breadcrumblist = document.querySelectorAll('.breadcrumb li')
let dropdownmenu = document.querySelector('.dropdown-menu')
let main2list = document.querySelector(".main2list");
let main2list1 = document.querySelector(".main2list1");
let main2list2 = document.querySelector(".main2list2");
let main3list1 = document.querySelector(".main3list1");
let main4list1 = document.querySelector(".main4list1");
let main5list1 = document.querySelector(".main5list1");
let main6list1 = document.querySelector(".main6list1");
console.log(main2list)
// swoper
var swiper = new Swiper('.swiper-container', {
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
});
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
console.log(getCookie('login'));
var myname = document.getElementById('myname');
var loginname = document.querySelector('.loginname');
//    setCookie('login',$("#loginname").val());
var isLogin = getCookie("login") || "";
console.log(isLogin)
if (!isLogin) {
    myname.innerText = "请登录";
    loginname.innerText = "你好![请登录]";
} else {
    myname.innerText = isLogin;
    loginname.innerText = isLogin;
}


//设置默认的页数和每页的数量
// let defaultInfo = {
//     len: 3,
//     num: 5,
// }
//获取列表页
//获取数据
async function getData1() {
    let res = await pAjax({
        url: '../../../php/getData.php',
        data: {
            start:2,
            len:92
            // len: 6
        }
    });
    console.log(res);
    renderHtml(res.list); //调用渲染页面
    
    }
    getData1()

    // 渲染页面
 
    function renderHtml(data) {
        let str1 = '';
        let str2 = '';
        let str3 = '';
        let str4 = '';
        let str5 = '';
        let str6 = '';
        let str7 = '';
        data.forEach((item, index) => {
            console.log(index);
            
            if(index >= 0 && index < 3) {
                str1 += `
            
              <li>
                <a href="./html/detials.html?id=${item.goods_id}"><img src="${item.goods_big_logo}"></a>
                <span>特卖价</span>
                <p>￥${item.goods_price}</p>
              </li>
            `;
            }else if(index >= 3 && index <6 ){
                str2 += `
            
              <li>
                <a href="./html/detials.html?id=${item.goods_id}"><img src="${item.goods_big_logo}"></a>
                <span>特卖价</span>
                <p>￥${item.goods_price}</p>
              </li>
            `;
            }else if(index >= 6 && index <12 ){
                str3 += `
            
              <li>
                <a href="./html/detials.html?id=${item.goods_id}"><img src="${item.goods_big_logo}"></a>
                <span>特卖价</span>
                <p>￥${item.goods_price}</p>
              </li>
            `;
            }else if(index >= 12&&index<32){
                str4 += `
            
                <li>
                   <a href="./html/detials.html?id=${item.goods_id}"> <img src="${item.goods_big_logo}"></a>
                   <a href="./html/detials.html?id=${item.goods_id}">  <h3>${item.goods_name}</h3></a>
                   <p>￥${item.goods_price}</p>
            `;
            }    
            else if(index >=32&&index<52){
                str5 += `
            
                <li>
                   <a href="./html/detials.html?id=${item.goods_id}"> <img src="${item.goods_big_logo}"></a>
                   <a href="./html/detials.html?id=${item.goods_id}">  <h3>${item.goods_name}</h3></a>
                   <p>￥${item.goods_price}</p>
            `;
            } 
            else if(index >=52&&index<72){
                str6 += `
                <li>
                <a href="./html/detials.html?id=${item.goods_id}"> <img src="${item.goods_big_logo}"></a>
                <a href="./html/detials.html?id=${item.goods_id}">  <h3>${item.goods_name}</h3></a>3456789
                <p>￥${item.goods_price}</p>
         `;
            } 
            else if(index >=72&&index<92){
                str7 += `
                <li>
                <a href="./html/detials.html?id=${item.goods_id}"> <img src="${item.goods_big_logo}"></a>
                <a href="./html/detials.html?id=${item.goods_id}">  <h3>${item.goods_name}</h3></a>
                <p>￥${item.goods_price}</p>
         `;
            }   
         
              
    })
    main2list.innerHTML = str1;
    main2list1.innerHTML = str2;
    main2list2.innerHTML = str3;
    main3list1.innerHTML = str4;
    main4list1.innerHTML = str5;
    main5list1.innerHTML = str6;
    main6list1.innerHTML = str7;
}

