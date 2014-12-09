/**
 * Created by zqczqc on 2014/12/8.
 */

//(function (win) {
//    console.log('start');
//})(window);

var Scroll = function (ele) {
    var cwidth,dwidth,ele_dom;
    function _touchstart() {
        console.log(event.pageX);
    }
    function _touchmove() {

    }
    function _touchend() {

    }
    this.init = function () { // 初始化
        var that = this;
        if(typeof ele === 'string'){
            ele_dom = document.getElementById(ele) || document.querySelector(ele);
        }
        else{
            console.log('无法识别输入值ele');
            return false;
        }
        ele_dom.addEventListener('click', that.handleEvent, false);
        ele_dom.addEventListener('touchmove', that.handleEvent, false);
        ele_dom.addEventListener('touchend', that.handleEvent, false);
    };
    this.handleEvent = function (event) { // 隐式调用响应事件
        console.log(event.type);
        switch(event.type){
            case 'touchstart':
                _touchstart();
                break;
            case 'touchmove':
                _touchmove();
                break;
            case 'touchend':
                _touchend();
                break;
        }
    };
    
};

var scroll = new Scroll('scroll');
scroll.init();