/**
 * Created by zqczqc on 2014/12/8.
 */

//(function (win) {
//    console.log('start');
//})(window);

var Scroll = function (ele, raw_classn) {
    var ele_dom, // 滑动的元素
        pageN, // 滑块个数
        cwidth, // 单个页块的宽度
        dwidth, // 设备宽度
        curX = 0, // 当前的x坐标
        curY = 0, // 当前的y坐标
        startX = 0, // 触摸起始的位置
        startY = 0, // 触摸起始的位置
        curpage = 0, // 当前页面
        dir = 0, // 左右滑，-1左滑
        scroll_lr = false, // 左右滑动
        moveready = false // 滑动开始
        ;
    function _getPageXY(event,type){
        var a = event.touches[0];
        return a[type];
    }
    function _touchstart(event) {
        ele_dom.className = raw_classn;
        scroll_lr = true;
        moveready = false;
        startX = _getPageXY(event,'pageX');
        startY = _getPageXY(event,'pageY');
    }
    function _touchmove(event) {
        if (!scroll_lr)
            return;
        curX = _getPageXY(event,'pageX');
        curY = _getPageXY(event,'pageY');
        if(moveready) {
            event.preventDefault(); // 阻止默认的触摸操作
            event.stopPropagation();
            _setX(curX - startX - curpage * cwidth);
        }
        else{
            if(Math.abs(curX - startX) > 5){
                event.preventDefault();
                event.stopPropagation();
                moveready = true;
            }
            else if (Math.abs(curY - startY) > 5)
                scroll_lr = false;
        }
    }
    function _touchend(event) {
        if (!scroll_lr || !moveready)
            return;
        var move = curX - startX;
        if(Math.abs(move) >= 100) {
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
        ele_dom.style.transform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.oTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.mozTransform = 'translate3d(' + x + 'px,0,0)';
    }
    function _moveTo(index) {
        ele_dom.className += ' scroll-other'; // 设置时间
        _setX(-index * cwidth);
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
        cwidth = ele_dom.firstElementChild.offsetWidth; // 获取子元素的宽度
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

var ScrollImg = function (ele, raw_classn) {
    var ele_dom, // 滑动的元素
        pageN, // 滑块个数
        cwidth, // 单个页块的宽度
        dwidth, // 设备宽度
        curX = 0, // 当前的x坐标
        curY = 0, // 当前的y坐标
        startX = 0, // 触摸起始的位置
        startY = 0, // 触摸起始的位置
        curpage = 1, // 当前页面
        dir = 0, // 左右滑，-1左滑
        scroll_lr = false, // 左右滑动
        moveready = false, // 滑动开始
        that = this
        ;
    function _getPageXY(event,type){
        var a = event.touches[0];
        return a[type];
    }
    function _touchstart(event) {
        ele_dom.className = raw_classn;
        scroll_lr = true;
        moveready = false;
        startX = _getPageXY(event,'pageX');
        startY = _getPageXY(event,'pageY');
    }
    function _touchmove(event) {
        if (!scroll_lr)
            return;
        curX = _getPageXY(event,'pageX');
        curY = _getPageXY(event,'pageY');
        if(moveready) {
            event.preventDefault(); // 阻止默认的触摸操作
            event.stopPropagation();
            _setX(curX - startX - curpage * cwidth);
        }
        else{
            if(Math.abs(curX - startX) > 5){
                event.preventDefault();
                event.stopPropagation();
                moveready = true; // 开始滑动
            }
            else if (Math.abs(curY - startY) > 5)
                scroll_lr = false;
        }
    }
    function _touchend(event) {
        if (!scroll_lr || !moveready)
            return;
        var move = curX - startX;
        if(Math.abs(move) >= 100) {
            dir = move < 0 ? -1 : 1;
            if (dir == -1) {
                if(curpage == pageN - 2){
                    _moveTo(curpage + 1);
                    curpage = 1;
                }
                else {
                    curpage += 1;
                    _moveTo(curpage);
                }
            }
            else {
                if(curpage == 1){
                    _moveTo(curpage - 1);
                    curpage = pageN - 2;
                }
                else{
                    curpage -= 1;
                    _moveTo(curpage);
                }
            }
        }
        else{
            _moveTo(curpage);
        }
    }
    function _click(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    function _getWidth() { // 获取设备宽度
        return document.body.clientWidth || window.innerWidth;
    }
    function _setX(x) { // 设置x坐标
        ele_dom.style.transform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.oTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.mozTransform = 'translate3d(' + x + 'px,0,0)';
    }
    function _moveTo(index) {
        ele_dom.className += ' scroll-other'; // 设置时间
        _setX(-index * cwidth);
    }
    this.init = function () { // 初始化
        var that = this;
        if(typeof ele === 'string'){
            ele_dom = document.getElementById(ele) || document.querySelector(ele);
        }
        else{
            console.error('无法识别输入值ele');
            return false;
        }
        dwidth = _getWidth();
        cwidth = ele_dom.firstElementChild.offsetWidth; // 获取子元素的宽度
        _setX(-curpage * cwidth);
        pageN = ele_dom.childElementCount || ele_dom.children.length; // 滑块数量
        ele_dom.addEventListener('touchstart', that, false);
        ele_dom.addEventListener('touchmove', that, false);
        ele_dom.addEventListener('touchend', that, false);
    };
    this.handleEvent = function (event) { // 隐式调用响应事件
        console.log(event.type);
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

var Tab = function (ele) {
    var ele_dom, // 滑动的元素
        ele_par,
        elewidth, // 滑动元素宽度
        mwidth, // 显示宽度
        mdis, // 最大滑动距离
        curX = 0, // 当前的x坐标
        curY = 0, // 当前的y坐标
        startX = 0, // 触摸起始的位置
        thatX = 0, // 停止位置
        tempX = 0, // 过度位置
        startY = 0, // 触摸起始的位置
        curpage = 0, // 当前页面
        dir = 0, // 左右滑，-1左滑
        scroll_lr = false, // 左右滑动
        moveready = false // 滑动开始
        ;
    function _getPageXY(event,type){
        var a = event.touches[0];
        return a[type];
    }
    function _touchstart(event) {
        ele_dom.className = 'tab-b1';
        startX = _getPageXY(event,'pageX');
        tempX = 0;
        moveready = false;
    }
    function _touchmove(event) {
        event.preventDefault();
        moveready = true;
        curX = _getPageXY(event,'pageX');
        tempX = thatX + curX - startX;
        var tempdis = Math.abs(curX - startX);
        if(tempX >= 0) {
            ele_par.style.boxShadow = 'inset 30px 0 ' + (tempdis <= 30 ? tempdis : 30) + 'px -30px black';
            ele_par.style.transition = '';
        }
        else if(tempX <= -mdis){
            ele_par.style.boxShadow = 'inset -30px 0 ' + (tempdis <= 30 ? tempdis : 30) + 'px -30px black';
            ele_par.style.transition = '';
        }
        else
            _setX(tempX);
    }
    function _touchend(event) {
        if(!moveready)
            return;
        if(tempX >= 0){
            _setX(0);
            ele_par.style.boxShadow = '';
            ele_par.style.transition = 'box-shadow 3s cubic-bezier(0,0,0.25,1)';
            thatX = 0;
        }
        else if(tempX <= -mdis){
            _setX(-mdis);
            ele_par.style.boxShadow = '';
            ele_par.style.transition = 'box-shadow 3s cubic-bezier(0,0,0.25,1)';
            thatX = -mdis;
        }
        else{
            thatX = tempX;
        }
    }
    function _click(event){
        event.preventDefault();
        event.stopPropagation();
    }
    function _setX(x) { // 设置x坐标
        ele_dom.style.transform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.oTransform = 'translate3d(' + x + 'px,0,0)';
        ele_dom.style.mozTransform = 'translate3d(' + x + 'px,0,0)';
    }
    this.init = function () { // 初始化
        var that = this;
        if(typeof ele === 'string'){
            ele_dom = document.getElementById(ele) || document.querySelector(ele);
            ele_par = ele_dom.parentNode;
        }
        else{
            console.log('无法识别输入值ele');
            return false;
        }
        mwidth = ele_dom.offsetWidth;
        console.log(mwidth);
        ele_dom.style.position = 'absolute';
        elewidth = ele_dom.offsetWidth;
        ele_dom.style.position = '';
        console.log(elewidth);
        mdis = elewidth - mwidth <= 0 ? 0 : elewidth - mwidth;
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

var scroll = new Scroll('scroll','scroll');
scroll.init();

var img_scroll = new ScrollImg('img-scroll','img-scroll');
img_scroll.init();

var tab_b = new Tab('tab-b1');
tab_b.init();