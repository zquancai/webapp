/**
 * Created by zqczqc on 2014/12/8.
 */

//(function (win) {
//    console.log('start');
//})(window);

var Scroll = function (ele) {
    var ele_dom, // 滑动的元素
        pageN, // 滑块个数
        cwidth, // 单个页块的宽度
        dwidth, // 设备宽度
        curX = 0, // 当前的x坐标
        startX = 0, // 触摸起始的位置
        curpage = 0, // 当前页面
        dir = 0 // 左右滑，-1左滑
        ;
    function _getPageX(event){
        var a = event.touches[0];
        return a.pageX;
    }
    function _touchstart(event) {
        ele_dom.className = 'scroll';
        startX = _getPageX(event);
    }
    function _touchmove(event) {
        event.stopPropagation();
        curX = _getPageX(event);
        _setX(curX - startX - curpage * dwidth);
    }
    function _touchend(event) {
        var move = curX - startX;
        if(Math.abs(move) >= 50) {
            dir = move < 0 ? -1 : 1;
            if (dir == -1) {
                curpage = (curpage == pageN - 1 ? curpage : curpage + 1);
                _moveTo(curpage);
            }
            else {
                curpage = (curpage == 0 ? curpage : curpage - 1);
                _moveTo(curpage);
            }
        }
        else{
            _moveTo(curpage);
        }
    }
    function _getWidth() { // 获取设备宽度
        return document.body.clientWidth || window.innerWidth;
    }
    function _setX(x) { // 设置x坐标
        ele_dom.style.transform = 'translateX(' + x + 'px)';
        ele_dom.style.webkitTransform = 'translateX(' + x + 'px)';
        ele_dom.style.oTransform = 'translateX(' + x + 'px)';
        ele_dom.style.mozTransform = 'translateX(' + x + 'px)';
    }
    function _moveTo(index) {
        ele_dom.className += ' scroll-other'; // 设置时间
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
        pageN = ele_dom.childElementCount || ele_dom.children.length; // 滑块数量
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