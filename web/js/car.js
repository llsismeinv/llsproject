
let container = document.querySelector('.main2');
//判断登陆

let myname = document.getElementById('myname');


//    setCookie('login',$("#loginname").val());
var isLogin = getCookie("login") || "";
console.log(isLogin)
if (!isLogin) {
    location.href = '../html/login.html';
    localStorage.setItem('url', 'http://eigthweekxiangmu.com/web/html/car.html');
} else {

    let close1 = document.querySelector('.close1');
    close1.innerText = '退出'
    console.log(close1)
    myname.innerText = isLogin;
    close1.onclick = function () {
        delCookie('login')
        location.reload();
    }
}

// 获取用户购物车中的数据
pAjax({
    url:'../../php/getcardata.php',
    data:{username:isLogin}
}).then(res =>{
    // 先把数据存放到本地
    localStorage.setItem('goodsList',JSON.stringify(res));
    renderHtml(res)
    // console.log(res)
})
let main1=document.querySelector('.main1')
let main2=document.querySelector('.main2')
let biaotou=document.querySelector('.biaotou')
let bottonjiesuan=document.querySelector('.bottonjiesuan')

//渲染数据
function renderHtml(data){
    // data 请求出来的数据 有可能一条数据都没有
    if(!data.length){
        container.innerHTML =  ` <div class="main1">
            <div class="emptycar">
                <div></div>
                <div>
                    <h3 style="font-size: 18px;font-weight: bold;margin-top: 20px">购物袋空空如也，</h3>
                    <p style="font-size: 14px">快去抢购心仪商品吧~</p>
                    <p>
                        <a style="text-decoration: none;color:white;font-weight: 400"href="./detials.html"><span style="font-size: 15px; display: inline-block;width: 100px;height: 30px;background: #FA2A83;text-align: center;line-height: 30px">立即抢购</span></a>
                        <span style="font-size: 15px; display: inline-block;width: 100px;height: 30px;background: #FEFEFE;border:#ccc;text-align: center;line-height: 30px">查看菜单</span>
                    </p>
                </div>
            </div>
        </div>`;
        return 
    }
    let allChecked = data.every(item=>{
        return item.is_select == 1;
    });

    let total = shopNum(data);

    biaotou.innerHTML = ` <ul class="biaotou">
    <li class="" style="width: 348px">
        <div>
            <input id='all' ${allChecked?'checked' :''} name="cartList" type="checkbox" value=""style="margin-left: -100px;width: 16px;height:16px">
            <span class="text ">全选</span>
            <span class="text product" style="margin-left:140px">商品</span>
        </div>
    </li>

    <li class="" style="width: 274px">
        <span class="text">单价</span>
    </li>
    <li class="" style="width: 160px">
        <span class="text">数量</span>
    </li>
    <li class="" style="width: 174px">
        <span class="text">操作</span>
    </li>
    </ul>
`;


let str='';
        data.forEach(item=>{
            str += `     <div class="shan"  style="width:957px;height: 100px;border:#E0E0E0 1px solid;margin-bottom: 30px">
            <table style="width:957px;height: 100px;">
                <tbody style="width:957px;height: 100px;">
                    <tr style="width:957px;height: 100px;">
                        <td style="width:334px;height:90px;">
                            <div style="width:100px;float: left">
                                <input name="supplier_id" type="checkbox"  class="sigle" ${item.is_select==1 ?'checked':''} goods_id="${item.goods_id}"
                                    style="width: 16px;height:16px">
                                <a href="" ><img src="${item.goods_small_logo}"
                                        style="width:76px;height:76px"></a>
                            </div>
                            <h4
                                style="position: relative;left:-23px;top:24px;float: right;font-size: 12px;width:200px;">
                                ${item.goods_name}</h4>
                        </td>
                        <td style="width:273px;height:90px;text-align: center">
                            <p>¥${item.goods_price}</p>
                        </td>
                        <td style="width:160px;height:90px;text-align: center">
                            <div class="btn-group" goods_id="${item.goods_id}" role="group" aria-label="..." ">
                                    <button class=" btn btn-default reduce" style="border:1px solid #ccc">-</button>
                                <button class="btn btn-default" style="border:1px solid #ccc">${item.cart_number}</button>
                                <button class="btn btn-default add" style="border:1px solid #ccc">+</button>
                            </div>
                        </td>
                        <td style="width:174px;height:90px;text-align: center">
                            <input type="button" value="删除" class="del" goods_id="${item.goods_id}">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`
        })
        bottonjiesuan.innerHTML=`
        <div style="width:186px;height:112px;float:right;">
            <p style="font-size: 13px;margin-top: 20px">共<span>${total.totalNum}</span>件商品 商品金额 &nbsp;&nbsp;&nbsp;¥${total.totalPrice}</p>
            <p style="font-size: 13px"> 总金额（未含运费）<span style="color: #F10180;font-size: 18px">¥${total.totalPrice}</span></p>

        </div>
        `
        main2.innerHTML =biaotou.innerHTML+ str+bottonjiesuan.innerHTML;

}


// 全选

main2.onclick = function(){
    let e = window.event;
    // 全选
    if(e.target.id == 'all'){
        console.log(1)
        let data = JSON.parse(localStorage.getItem('goodsList'));
        data.forEach(item=>{
            e.target.checked ? item.is_select = 1:item.is_select = 0
        });
        localStorage.setItem('goodsList',JSON.stringify(data));
        renderHtml(data);
    }

    //单选

    if(e.target.className == 'sigle'){
        let id = e.target.getAttribute('goods_id');
        let data = JSON.parse(localStorage.getItem('goodsList'));
        data.forEach(item=>{
            if(item.goods_id == id){
                item.is_select = e.target.checked ? 1 :0;
            }
        })
        // 需要把 修改够的数据存储本地存储中
        localStorage.setItem('goodsList',JSON.stringify(data));
        renderHtml(data);
    }
//删除

    if(e.target.classList.contains('del')){
        // 删除数据库中 和 本地存储中对应的数据 
        console.log(1)
        let id = e.target.getAttribute('goods_id');
        pAjax({
            url:'../../../php/removecardata.php',
            data:{
                username:isLogin,
                goods_id:id
            }
        }).then(res=>{
            console.log(res)
            if(res.code){
                // 先获取本地存储中的数据
               let data = JSON.parse(localStorage.getItem('goodsList'));
                data= data.filter(item=>{
                    return item.goods_id != id;
                });
                localStorage.setItem('goodsList',JSON.stringify(data));
                 renderHtml(data);
             
            }
        })
    
}


    //减少
    if(e.target.classList.contains('reduce')){
        // 进行数量减法
        console.log(1)
        let data = JSON.parse( localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');
       console.log(id)
        let obj = data.filter(item=>{
            return item.goods_id == id
        })[0];
        let num = obj.cart_number *1;
        if(num <= 1){
            num = 1
        }else{
            num--
        }
        pAjax({
            url:'../../../php/upcardata.php',
            data:{
                username:isLogin,
                goods_id:id,
                goods_num:num
            }
        }).then(res=>{
            console.log(res)
            if(res.code){
                obj.cart_number = num;
                localStorage.setItem('goodsList',JSON.stringify(data));
                 renderHtml(data);
            }
        })
    }



// 加法

    if(e.target.classList.contains('add')){
        // 进行数量加法
        let data = JSON.parse( localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');
        let obj = data.filter(item=>{
            return item.goods_id == id
        })[0];
        console.log(obj.cart_number)
        console.log(obj.goods_number)

        let carnum = obj.cart_number *1;
        let goodsnum = obj.goods_number*1;
        if(carnum >= goodsnum){
            carnum=goodsnum
        }else{
             carnum++
        }
        pAjax({
            url:'../../php/upcardata.php',
            data:{
                username:isLogin,
                goods_id:id,
                goods_num:carnum
            }
        }).then(res=>{
            console.log(res)
            if(res.code){
                obj.cart_number = carnum;
                localStorage.setItem('goodsList',JSON.stringify(data));
                 renderHtml(data);
            }
        })
    }
}





function shopNum(goods){
    let res = goods.filter(item=>{
        return item.is_select == 1
        })

        // 计算选中商品的数量
        //reduce是累加器，第一个参数是初始值，第二个是当前元素
        // arr.reduce(callback,[initialValue])
        //     callback:函数中包含四个参数
        // - previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
        // - currentValue （数组中当前被处理的元素）
        // - index （当前元素在数组中的索引)
        // - array （调用的数组）
        // initialValue（ 作为第一次调用 callback 的第一个参数。）
        let totalNum = res.reduce((pre, item) => {
            return pre + item.cart_number * 1
        }, 0);


    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre,item)=>{
        return pre + item.goods_price * item.cart_number
    },0);

    return {
        totalNum,
        totalPrice
    }
}



