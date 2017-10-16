/*
* @Author: Administrator
* @Date:   2017-10-14 01:11:29
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-16 10:16:14
*/
var omyTab=document.getElementById('myTab');
var aLi=omyTab.getElementsByTagName('li');
var omyTabBox=omyTab.getElementsByTagName('div')[1];
var aBox=omyTabBox.getElementsByTagName('div');
for(var i=0;i<aLi.length;i++){
    aLi[i].index=i;
    aLi[i].onmouseover=function(){
	    for(var j=0;j<aLi.length;j++){
	    	console.log(this.index)
	    	aLi[j].className='';//取消菜单样式
	       	aBox[j].className='hide';//隐藏所有的myTabDiv
	    }
	    aLi[this.index].className='selected';
	    aBox[this.index].className='';
    }
}

	var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    function animate(offset) {
    	console.log("hello");
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        if(newLeft<-5800){
		    list.style.left = -725 + 'px';
		}else if(newLeft>-725){
		    list.style.left = -5800 + 'px';
		}else{
        	list.style.left = newLeft + 'px';
		}
		console.log(newLeft);
    }

    prev.onclick = function() {             
        animate(725);
    }
    next.onclick = function() {  
        animate(-725);
    }

    var timer;
	function play() {
	    timer = setInterval(function () {
	        next.onclick()
	    }, 1500)
	}
	play();

	var carousel = document.getElementById('carousel');
    function stop() {
        clearInterval(timer);
    }
    carousel.onmouseover = stop;
    carousel.onmouseout = play;

    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;

    function buttonsShow() {
        //这里需要清除之前的样式
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        //数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
    }

    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 8;
        }
        buttonsShow();
        animate(725);
    }
    next.onclick = function() {
        //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
        index += 1;
        if (index > 8) {
            index = 1;
        }
        buttonsShow();
        animate(-725);
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            // 在浏览器的控制台打印一下，看看结果
            console.log(i);

            /* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
            /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
            var clickIndex = parseInt(this.getAttribute('index'));
            console.log(index);
            var offset = 725 * (index - clickIndex);
            animate(offset); //存放鼠标点击后的位置，用于小圆点的正常显示 
            index = clickIndex;
            buttonsShow();
        }
    }