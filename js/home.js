/**
 * Created by zqczqc on 2014/12/8.
 */

//(function (win) {
//    console.log('start');
//})(window);

var Scroll = function (ele) {
    var ele_dom, // 滑动的元素
        cwidth, // 单个页块的宽度
        dwidth, // 设备宽度
        curX = 0, // 当前的x坐标
        startX = 0, // 触摸起始的位置
        curpage = 0,
        dir = 0 // 左右滑，-1左滑
        ;
    function _getPageX(event){
        var a = event.touches[0];
        return a.pageX;
    }
    function _touchstart(event) {
        startX = _getPageX(event);
    }
    function _touchmove(event) {
        curX = _getPageX(event);
        _setX(curX - startX);
    }
    function _touchend(event) {
        dir = curX - startX < 0 ? -1 : 1;
        console.log(curX - startX);
        if(dir == -1) {
            curpage ++;
            _moveTo(curpage);
        }
        else{
            curpage = curpage != 0 ? curpage - 1: curpage;
            _moveTo(curpage);
        }
    }
    function _getWidth() { // 获取设备宽度
        return document.body.clientWidth || window.innerWidth;
    }
    function _setX(x) { // 设置x坐标
        ele_dom.style.webkitTransform = 'translateX(' + x + 'px)';
    }
    function _moveTo(index) {
        ele_dom.className += ' scroll-other';
        _setX(-index * dwidth);
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
        dwidth = _getWidth();
        ele_dom.addEventListener('touchstart', that, false);
        ele_dom.addEventListener('touchmove', that, false);
        ele_dom.addEventListener('touchend', that, false);
    };
    this.handleEvent = function (event) { // 隐式调用响应事件
        //console.log(event.type);
        switch(event.type){
            case 'touchstart':
                _touchstart(event);
                break;
            case 'touchmove':
                _touchmove(event);
                break;
            case 'touchend':
                _touchend(event);
                break;
        }
    };
    
};

var scroll = new Scroll('scroll');
scroll.init();