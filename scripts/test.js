window.onload = function () {
	//创建对象实例：
	var example = new ShowPic();

	// 轮播速度与图片地址参数还没暴露出来，有待修改。
	// 有两个版本，index为简单封装，index1采用了构造函数+原型模式，下方小点效果还有些问题需要修改，主要功能已经实现。

	// 请在此修改移动方向，x为水平，y为垂直，一定要加引号！
	var direction = 'y';

	example.next1(direction);
	example.prev1(direction);
	example.autoPlay(direction);
	example.clickIcon(direction);
}
//定义轮播对象：
function ShowPic() {
	this.list = document.getElementsByClassName('list')[0];
	this.items = document.getElementsByClassName('list-items');
	this.prev = document.getElementById('prev');
	this.next = document.getElementById('next');
	this.imagesBox = document.getElementsByTagName('a');

	// dot
	this.icon = document.getElementsByClassName('icon');

	// 图片个数
	this.len = this.items.length;

	// 计数
	this.num = 0;
}
//下一张
ShowPic.prototype.next1 = function (direction) {
	var This = this;
	this.next.onclick = function () {
		This.num++;
		if (This.num > 3) {
			This.num = 0;
		}

		var newLeft;
		if (direction == 'x') {
			if (This.list.style.left === "-1800px") {
				newLeft = 0;
			} else {
				for (let index = 0; index < This.items.length; index++) {
					This.items[index].style.float = 'left';
				}
				newLeft = parseInt(This.list.style.left) - 600;
			}
			This.list.style.left = newLeft + "px";
			This.icon[This.num].style.backgroundColor = '#336699';
			console.log('LIST.LEFT:' + This.list.style.left);
		} else {
			// 垂直方向
			console.log('y');
			if (This.list.style.top === "-900px") {
				console.log('yes');
				newLeft = 0;
			} else {
				for (let index = 0; index < This.items.length; index++) {
					This.imagesBox[index].style.float = 'none';
					This.imagesBox[index].style.display = 'block'
				}
				newLeft = parseInt(This.list.style.top) - 300;
			}
			console.log('LIST.TOP:' + This.list.style.top);
			This.list.style.top = newLeft + "px";
			This.icon[This.num].style.backgroundColor = '#336699';
		}
	}
}
//上一张
ShowPic.prototype.prev1 = function (direction) {
	var This = this;
	this.prev.onclick = function () {
		This.num--;
		if (This.num < 0) {
			This.num = 3;
		}
		var newLeft;
		if (direction == 'x') {
			if (This.list.style.left === "0px") {
				newLeft = 0;
			} else {
				newLeft = parseInt(This.list.style.left) + 600;
				// This.icon[This.num].style.backgroundColor = '';
			}
			This.list.style.left = newLeft + "px";
		} else {
			if (This.list.style.top < "-900px") {
				newLeft = 0;
			} else {
				for (let index = 0; index < This.items.length; index++) {
					This.imagesBox[index].style.float = 'none';
					This.imagesBox[index].style.display = 'block';
				}
				newLeft = parseInt(This.list.style.top) - 300;
				// This.icon[This.num].style.backgroundColor = '';
			}
			This.list.style.top = newLeft + "px";
			This.icon[This.num].style.backgroundColor = '#336699';
			console.log(This.list.style.top);
		}
	}
}

//autoPlay
ShowPic.prototype.autoPlay = function (direction) {
	var This = this;
	setInterval(function () {
		This.num++;
		if (This.num > 3) {
			This.num = 0;
		}

		var newLeft;
		if (direction == 'x') {
			if (This.list.style.left === "-1800px") {
				newLeft = 0;
			} else {
				for (let index = 0; index < This.items.length; index++) {
					This.items[index].style.float = 'left';
				}
				newLeft = parseInt(This.list.style.left) - 600;
			}
			This.list.style.left = newLeft + "px";
			console.log(This.list.style.left);
		} else {
			// 垂直方向
			console.log('y');
			This.icon[This.num].style.backgroundColor = 'white';
			if (This.list.style.top === "-900px") {
				console.log('yes');
				newLeft = 0;
			} else {
				for (let index = 0; index < This.items.length; index++) {
					This.imagesBox[index].style.float = 'none';
					This.imagesBox[index].style.display = 'block';
				}
				newLeft = parseInt(This.list.style.top) - 300;
				This.icon[This.num].style.backgroundColor = '#336699';
			}
			console.log('top' + This.list.style.top);
			This.list.style.top = newLeft + "px";
		}
	}, 1000);
}

// dot click  这里点击小点切换图片还有点bug
ShowPic.prototype.clickIcon = function (direction) {
	var This = this;
	for (let i = 0; i < 4; i++) {
		this.icon[i].onclick = function () {
			console.log('icon-click');
			for (var j = 0; j < This.len; j++) {
				This.items[j].className = 'list-items';
				This.icon[j].style.backgroundColor = '';
			}
			//将i的值赋值给num:
			This.num = i;
			var newLeft;
			if (direction == 'x') {
				if (This.list.style.left === "0px") {
					newLeft = 0;
				} else {
					newLeft = parseInt(This.list.style.left) + 600 * This.num;
				}
				This.list.style.left = newLeft + "px";
				This.icon[This.num].style.backgroundColor = '#336699';
			} else {
				if (This.list.style.top < "-900px") {
					newLeft = 0;
				} else {
					for (let index = 0; index < This.items.length; index++) {
						This.imagesBox[index].style.float = 'none';
						This.imagesBox[index].style.display = 'block';
					}
					newLeft = parseInt(This.list.style.top) - 300 * This.num;
				}
				This.list.style.top = newLeft + "px";
				This.icon[This.num].style.backgroundColor = '#336699';
				console.log(This.list.style.top);
			}

		}
	}
}