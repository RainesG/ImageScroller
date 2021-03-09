function Cycle(imgSrc,direction,ifAutoPlay,speed){
    var wrap = document.querySelector(".wrap");
    var next = document.querySelector(".arrow_right");
    var prev = document.querySelector(".arrow_left");
    var images = wrap.getElementsByTagName('img');
    var imagesBox = wrap.getElementsByTagName('a');
    for (let index = 0; index < images.length; index++) {
        images[index].src = imgSrc[index];
    }
    
    next.onclick = function () {
        next_pic();
    }
    
    prev.onclick = function () {
        prev_pic();
    }
    
    function next_pic() {
        index++;
        if (index > 3) {
            index = 0;
        }
        showCurrentDot();
        var newLeft;
        if (direction == 'x') {
            console.log('x');
            if (wrap.style.left === "-1800px") {
                newLeft = 0;
            } else {
                for (let index = 0; index < images.length; index++) {
                    imagesBox[index].style.float = 'left';
                }
                newLeft = parseInt(wrap.style.left) - 600;
            }
            wrap.style.left = newLeft + "px";            
        }else{
            // 垂直方向
            console.log('y');
            if (wrap.style.top === "-900px") {
                console.log('yes');
                newLeft = 0;
            } else {
                for (let index = 0; index < images.length; index++) {
                    imagesBox[index].style.float = 'none';
                    imagesBox[index].style.display = 'block'
                }
                newLeft = parseInt(wrap.style.top) - 300;
            }
            console.log('top'+wrap.style.top);
            wrap.style.top = newLeft + "px";
        }

    }
    
    function prev_pic() {
        index--;
        if (index < 0) {
            index = 3;
        }
        showCurrentDot();
        var newLeft;
        if (direction == 'x') {
            if (wrap.style.left === "0px") {
                newLeft = 0;
            } else {
                newLeft = parseInt(wrap.style.left) + 600;
            }
            wrap.style.left = newLeft + "px";            
        }else{
            if (wrap.style.top === "0px") {
                newLeft = 0;
            } else {
                newLeft = parseInt(wrap.style.top) + 600;
            }
            wrap.style.top = newLeft + "px";
        }

    }
    var timer = null;
    
    function autoPlay() {
        timer = setInterval(function () {
            next_pic();
        }, speed);
    }

    if (ifAutoPlay) {
        console.log('true');
        autoPlay();
    }else{console.log('false');}
    
    var container = document.querySelector(".container");
    container.onmouseenter = function () {
        clearInterval(timer);
    }
    container.onmouseleave = function () {
        autoPlay();
    }
    
    var index = 0;
    var dots = document.getElementsByTagName("span");
    
    function showCurrentDot() {
        for (var i = 0, len = dots.length; i < len; i++) {
            dots[i].className = "";
        }
        dots[index].className = "on";
    }
    
    for (var i = 0, len = dots.length; i < len; i++) {
        (function (i) {
            dots[i].onclick = function () {
                var dis = index - i;
                if (index == 4 && parseInt(wrap.style.left) !== -1800) {
                    dis = dis - 5;
                }
                if (index == 0 && parseInt(wrap.style.left) !== 0) {
                    dis = 5 + dis;
                }
                wrap.style.left = (parseInt(wrap.style.left) + dis * 600) + "px";
                index = i;
                showCurrentDot();
            }
        })(i);
    }
}

var imgSrc = [
    './images/porsche-panamera.webp',
    './images/porsche-911.webp',
    './images/porsche-718.webp',
    './images/pagati.png',
];

function gett(){
    var direction = document.getElementById('direction').value;
    var choice = document.getElementById('ifAuto').value;
    Cycle(imgSrc,direction,choice,2000);
}
var btn = document.getElementsByTagName('button')[0];
btn.onclick=gett;