function Zoom(dom, zidingyishuzu){
    this.dom = dom;
    this.zidingyishuzu = zidingyishuzu;
    this.datu = document.createElement('div');
    this.xiaotu = document.createElement('div');
    this.tubiao = document.createElement('ul');
    this.zhezhao = document.createElement('div');
    this.smalltu = document.createElement('img');
    this.bigtu = new Image();
    // this.bigtu = document.createElement('img');
    this.tubiaotu = zidingyishuzu.map(function(value){
        var li = document.createElement('li');
        var img = new Image();
        img.src = value.tubiao;
        // img.style.width = (this.dom.clientHeight - this.dom.clientWidth) * .7 + 'px';
        // img.style.height = (this.dom.clientHeight - this.dom.clientWidth) * .7 + 'px';
        
        
        //列表图片大小--------------------------------------------------
        // img.style.width = this.dom.clientHeight * .07 + 'px';
        // img.style.height = this.dom.clientHeight * .07 + 'px';

        img.style.width = '62px';
        img.style.height = '62px';

        li.appendChild(img);
        return li;
    }.bind(this))
    this.load();
}
Zoom.prototype = {
    constructor: Zoom,
    init:function(){
        this.zuhe();
        this.tianjiayangshi();
        this.shijian()
    },
    load:function(){
        var img = new Image();
        img.src = this.zidingyishuzu[0].bigtu;
        img.onload = function(){
            this.width = img.width;
            this.height = img.height;
            // console.log(this);
            var zhezhaoWidth = this.dom.clientWidth / img.width * this.dom.clientWidth;
            this.init();
            this.r = (img.width - this.dom.clientWidth) / (this.dom.clientWidth - zhezhaoWidth);
            // this.r2 = (img.height - this.dom.clientHeight) / (this.dom.clientHeight - zhezhaoHeight);

        }.bind(this)
    },
    zuhe:function(){
        this.dom.appendChild(this.xiaotu);
        this.dom.appendChild(this.datu);
        this.dom.appendChild(this.tubiao);
        this.xiaotu.appendChild(this.smalltu);
        this.xiaotu.appendChild(this.zhezhao);
        this.datu.appendChild(this.bigtu);
        this.tubiaotu.forEach(function(value){
            this.tubiao.appendChild(value);
        }.bind(this))
    },
    tianjiayangshi:function(){
        this.xiaotuyangshi();
        this.datuyangshi();
        this.liebiaoyangshi();
    },
    xiaotuyangshi:function(){
        var obj = {
            width:'100%',
            height:this.dom.clientWidth + 'px',
            position:'relative' ,
            
            
            zIndex: 1000,
        }
        for(var i in obj){
            this.xiaotu.style[i] = obj[i];
        }
        this.smalltu.src = this.zidingyishuzu[0].smalltu;
        this.smalltu.style.width = this.xiaotu.clientWidth + 'px';
        this.smalltu.style.height = this.xiaotu.clientHeight + 'px';
        
        var zhezhaoObj ={
            width:this.dom.clientWidth / this.width * this.dom.clientWidth + 'px',
            // width:this.dom.clientWidth / img.width * this.dom.clientWidth + 'px',
            height:this.dom.clientWidth / this.width * this.dom.clientWidth + 'px',
            backgroundColor:'rgba(200, 200, 200 , 0.3)',
            position:'absolute',
            top:0,
            left:0,
            display:'none'
        }
        for(var i in zhezhaoObj){
            this.zhezhao.style[i] = zhezhaoObj[i];
        }
    },
    datuyangshi:function() {
        var obj ={
            width: this.dom.clientWidth + 'px',
            height: this.dom.clientWidth + 'px',
            position: 'absolute',
            // left: '110%',
            left:0,

            top:0,
            overflow: 'hidden',
            display: 'none'
        }
        for(var i in obj){
            this.datu.style[i] = obj[i];
        }
        this.bigtu.style.position = 'absolute';
        this.bigtu.src = this.zidingyishuzu[0].bigtu;
    },
    liebiaoyangshi:function(){
        var obj = {
            width:'100%',
            // height:this.dom.clientHeight - this.dom.clientWidth + 'px',
            // height:'50px',


            //列表区域大小-------------------------------------------
            // height: this.dom.clientHeight * .1 + 'px',

            height:'64px',
            marginBottom: 0,
            listStyle: "none",
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'space-around'
        }
        for(var i in obj){
            this.tubiao.style[i] = obj[i];
        }
        var liStyle = {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'transparent'
        }
        for(var i in liStyle){
            this.tubiaotu.forEach(function(value){
                value.style[i] = liStyle[i];
            })
        }
        this.tubiaotu[0].style.borderColor = 'red'
    },
    shijian: function(){
        this.mouseEnter();
        this.mouseLeave();
        this.mouseMove();
        this.mouseClick();
    },
    mouseEnter:function(){
        this.xiaotu.onmouseenter = function(){
            this.zhezhao.style.display = 'block';
            
            this.datu.style.display = 'block';
            
            
            this.smalltu.style.opacity = '0';
        }.bind(this);
    },
    mouseLeave:function(){
        this.xiaotu.onmouseleave = function(){
            this.zhezhao.style.display = 'none';
            this.datu.style.display = 'none';
            
            
            this.smalltu.style.opacity = '1';
        }.bind(this);
    },
    mouseMove: function(){
        this.xiaotu.onmousemove = function(e){
            var x = e.pageX;
            var y = e.pageY;
            var x1 = Zoom.offset(this.xiaotu).left;
            var y1 = Zoom.offset(this.xiaotu).top;
            var x2 = x - x1 - this.zhezhao.clientWidth / 2;
            var y2 = y - y1 - this.zhezhao.clientHeight / 2;
            if(x2 < 0){
                x2 = 0;
            }else if(x2 > this.xiaotu.clientWidth - this.zhezhao.clientWidth){
                x2 = this.xiaotu.clientWidth - this.zhezhao.clientWidth;
            }
            if(y2 < 0){
                y2 = 0;
            } else if(y2 > this.xiaotu.clientHeight - this.zhezhao.clientHeight){
                y2 = this.xiaotu.clientHeight - this.zhezhao.clientHeight
            }
            this.zhezhao.style.left = x2 +'px';
            this.zhezhao.style.top = y2 + 'px';
            this.bigtu.style.left = -x2 * this.r + 'px';
            this.bigtu.style.top = -y2 * this.r + 'px';
        }.bind(this);
    },
    // mouseClick: function(){
    //     this.tubiaotu.forEach(function(value,index){
    //         value.onclick = function(value){
    //             this.tubiaotu.forEach(function(value){
    //                 value.style.borderColor = 'transparent'
    //             }.bind(this))
    //             value.style.borderColor = 'red';
    //             this.smalltu.src = this.zidingyishuzu[index].smalltu;
    //             this.bigtu.src = this.zidingyishuzu[index].bigtu;
    //         }.bind(this)
    //     }.bind(this))
    // }
    mouseClick: function() {
		this.tubiaotu.forEach((value, index) => {
			value.onclick = () => {
				this.tubiaotu.forEach(function(value) {
					value.style.borderColor = "transparent"
				})
				value.style.borderColor = "red";
				this.smalltu.src = this.zidingyishuzu[index].smalltu;
				this.bigtu.src = this.zidingyishuzu[index].bigtu;
			}
		})
	}
}

Zoom.offset = function(dom) {
	var obj = {
		left: 0,
		top: 0
	};
	// 判定是否是IE8 
	var isIE8 = false;
	// 如果 不为-1 说明包含该字符串 说明就是IE8
	if (window.navigator.userAgent.indexOf("MSIE 8") != -1) {
		isIE8 = true;
	}
	// 计算过程
	// 先算dom到dom.offsetParent的距离  再算 dom.offsetParent 到 dom.offsetParent.offsetParent的距离 再...
	while (dom != document.body) {
		if (isIE8) {
			obj.left += dom.offsetLeft ;
			obj.top += dom.offsetTop;
		} else {
			obj.left += dom.offsetLeft + dom.clientLeft ;
			obj.top += dom.offsetTop + dom.clientTop;
		}
		dom = dom.offsetParent;
	}

	// 返回obj
	return obj;

}