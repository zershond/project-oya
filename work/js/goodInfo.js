
var commentGlobal = {
	page:0,
	scroll:'',
}


$(function(){
	
	loadGoodInfo();
	
//	初始化评论
	initComment();
//	
	//初始化轮播图
	zerSwiper('.swiper-container');
	
	calculateCount();
	
//	切换评论和商品详情
	$('.detail').click(function(){
		$('.comment').removeClass('active');
		$(this).addClass('active');
		$('#commentContainer').addClass('hide');
	})
	$('.comment').click(function(){
		$('.detail').removeClass('active');
		$(this).addClass('active');
		$('#commentContainer').removeClass('hide');
		commentGlobal.scroll.refresh();
	})
	
	
	//	显示导航按钮
	$('.titleList').click(function(){
		var _class = $('.navmorelist').prop('class');
		if(_class == 'navmorelist hide'){
			$('.navmorelist').removeClass('hide');
		}else{
			$('.navmorelist').addClass('hide');
		}
	})
	
	//加入购物车
	$('.addCar').click(function(){
		setLocal($('#zer-mainBody').attr('goodId'));
		calculateCount();
	})
})


function loadGoodInfo(){
	var goodId = localStorage.getItem('goodId');
	$('#zer-mainBody').attr('goodId', goodId);
}

function zerSwiper(id){
	var MySwiper = new Swiper (id, {
	    loop: true,
	    spaceBetween:30,
	    centeredSlides:true,
	    autoplayDisableOnInteraction: false,
		pagination : '.swiper-pagination',
		paginationClickable :true,
	})        
}

function initComment(){
	loadComment(commentGlobal.page);
	commentGlobal.page++;
}

//load评论
function loadComment(page){
	$('.loading').removeClass('hide');
	$.get('data/comment.json', function(data){
		$('.loading').addClass('hide');
		var len = data.goods[page].length;
		for (var i = 0; i < len; i++) {
			createItem(data.goods[page][i]);
		}
		if(page == 0){
			$('.commentItem').eq(0).remove();
			initScroll();
		}
		commentGlobal.scroll.refresh();
	})
}
//创建节点
function createItem(obj){
	var oItem = $('.commentItem').eq(0).clone(true);
	$('img', oItem).prop('src', obj.icon);
	$('.userName', oItem).html(obj.userName);
	$('.buyDate', oItem).html(obj.buyDate);
	$('.commentContent', oItem).html(obj.comment);
	oItem.appendTo('.commentContainer');
}

//初始化iscroll插件
function initScroll(){
	commentGlobal.scroll = new IScroll('#commentContainer', {
		mouseWheel: true,
    	scrollbars: true
	})
	commentGlobal.scroll.on('scrollEnd', function(){
		if(commentGlobal.scroll.y == commentGlobal.scroll.maxScrollY){
			loadComment(commentGlobal.page);
			commentGlobal.page++;
		}
	})
}


function setLocal(id){
	var idArray = localStorage.getItem('mallCar') ? JSON.parse(localStorage.getItem('mallCar')) : [];
	var item = {};
	for(var i = 0; i < idArray.length; i++){
		if(id == idArray[i]){
			window.alert('您已添加');
			return ;
		}
	}
	idArray.push(id);
	var j = JSON.stringify(idArray);
	localStorage.setItem('mallCar',j);
	window.alert('添加成功');
}


function calculateCount(){
	if(localStorage.getItem('mallCar')){
		var len = JSON.parse(localStorage.getItem('mallCar')).length;
	}else{
		var len = 0;
	}
	
	$('.itemCount').html(len)
}




