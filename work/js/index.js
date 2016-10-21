
var indexGlobal = {
	page: 1,
	indexSwiper:'',
	myScroll:'',
}

$(function(){
	//初始化swiper插件
	zerSwiper('.swiper-container', indexGlobal.indexSwiper);

	//搜索按钮
	$('#searchBtn').click(function(){
		$('#zer-searchContainer').removeClass('hide');
		$('#searchContent').focus();
	})
	$('#zer-searchContainer .close').click(function(){
		$('#zer-searchContainer').addClass('hide');
	})
	
	
	
})

window.onload = function(){
	//初始化滚动插件
	initScroll(indexGlobal.myScroll);
}

function zerSwiper(id, name){
	name = new Swiper (id, {
	    loop: true,
	    spaceBetween:30,
	    centeredSlides:true,
	    autoplay: 2500,
	    autoplayDisableOnInteraction: false,
		pagination : '.swiper-pagination',
		paginationClickable :true,
	})        
}

//滚动插件函数
function initScroll(myScroll){
	myScroll = new IScroll('#zer-mainBody', {
		mouseWheel: true,
    	scrollbars: true
	})
//	myScroll.options.preventDefault = false;
	myScroll.on('scrollEnd',function(){
		if(myScroll.y == myScroll.maxScrollY){
			loadMoreItem(myScroll, indexGlobal.page);
			indexGlobal.page++;
		}
		
		if(myScroll.y <= -550){
			showBackToTop(true);
		}else{
			showBackToTop(false);
		}
		
		//backtotop按钮
		$('.backToTop').click(function(){
			myScroll.scrollTo(0,0,1000,IScroll.utils.ease.circular )
		})
	})

}


function loadMoreItem(myScroll,page){
	$('.loading').removeClass('hide');
	$.get('data/indexItem.json',function(data){
		$('.loading').addClass('hide');
//		console.log(data);
		var count = data.goods.length;
		if(page >= count){
			return ;
		}
		var len = 10;
		for(var i = 0; i < len; i++){
			createItem(data.goods[page][i]);
		}
		myScroll.refresh();
	})
}

function createItem(obj){
	var oItem = $('.item').eq(1).clone(true);
	$('img', oItem).prop('src',obj.imgSrc);
	$('.itemInfo', oItem).html(obj.info);
	$('span', oItem).html(obj.price);
	oItem.appendTo('.zer-itemlist');
}


//初始化lazyload
function initLazyload(){
	
}


function showBackToTop(operation){
	if(operation){
		$('.backToTop').removeClass('hide');
	}else{
		$('.backToTop').addClass('hide');
	}
	
	
}




