

var listGlobal = {
	scroll: '',
	page:0,
	idArray:[],
}


$(function(){
//	createItem({imgSrc:'img/56.jpg',info:'00000',price:120},0)
	
	//分类按钮
	$('#classBtn').click(function(){
		if($(this).attr('show') == 'show'){
			$('.classify').removeClass('hide');
			$(this).attr('show', 'hide');
		}else{
			$('.classify').addClass('hide');
			$(this).attr('show', 'show');
		}
	})
	//分类列表函数
	$('.level1 li').click(function(){
		$('.level3 ul').addClass('hide');
		$('.level1 li').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		var _class = $(this).attr('next');
		_class = '.' + _class;
		$('.level2 ul').addClass('hide');
		$(_class).removeClass('hide');
	});
	$('.level2 li').click(function(){
		$('.level2 li').each(function(){
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		var _class = '.' + $(this).attr('next');
		$('.level3 ul').addClass('hide');
		$(_class).removeClass('hide');
	});
	
	//品牌按钮
	$('#brandBtn').click(function(){
		if($(this).attr('show') == 'show'){
			$('.brand').removeClass('hide');
			$(this).attr('show','hide');
		}else{
			$('.brand').addClass('hide');
			$(this).attr('show','show');
		}
		
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
	
	//点击进入详情页
	$('.listContainer').click(function(evt){
		var target = evt.target;console.log(target);
		if($(target).closest('div').prop('class') == 'listItem'){
			localStorage.setItem('goodId',$(target).closest('div').attr('goodId'));
			window.location.href = 'goodInfo.html';
		}
	})
})


window.onload = function(){
	//初始化iscroll插件
	initScroll(listGlobal.scroll);

	
}







//滚动插件函数
function initScroll(myScroll){
	myScroll = new IScroll('.listContainer', {
		mouseWheel: true,
    	scrollbars: true
	})
	myScroll.options.preventDefault = false;
	
	myScroll.on('scrollEnd', function(){
		if(myScroll.y == myScroll.maxScrollY){
			listGlobal.page++;
			loadItem(listGlobal.page, myScroll);
		}
	})
	
}


function loadItem(page,scroll){
	if(page >= 9){
		return ;
	}
	$('.loading').removeClass('hide');
	$.get('data/listItem.json', function(data){
		$('.loading').addClass('hide');

		var len = data.goods[page].length;
		for (var i = 0; i < len; i++) {
			if(page == 0 && i == 0){
				createItem(data.goods[page][i], 0);
				continue;
			}
			createItem(data.goods[page][i]);
		}
		
		if(scroll){
			scroll.refresh();
		}
	})
}

function createItem(obj, _delete){
	var oItem = $('.listItem').eq(0).clone(true);
	$('img', oItem).prop('src', obj.imgSrc);
	$('.listInfo', oItem).html(obj.info);
	$('span', oItem).html(obj.price);
	oItem.appendTo('.list');
	
	if(_delete == 0){
		$('.listItem').eq(0).remove();
	}
	
}
