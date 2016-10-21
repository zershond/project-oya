


$(function(){
	
	//初始化分类列表，默认第一个分类
	loadClass('推荐分类')
	
//	显示导航按钮
	$('.titleList').click(function(){
		var _class = $('.navmorelist').prop('class');
		if(_class == 'navmorelist hide'){
			$('.navmorelist').removeClass('hide');
		}else{
			$('.navmorelist').addClass('hide');
		}
	})	
	
	//点击分类列表，加载对应分类
	$('.navClass li').click(function(){
		$('.navClass li').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
		
		loadClass($(this).html())
	})
})

//加载分类函数
function loadClass(_class){
	$('.loading').removeClass('hide');
	//ajax请求json数据
	$.get('data/classification.json', function(data){
		$('.loading').addClass('hide');
		$('.className').html(_class);
		//清空classcontent里面的内容
		$('.classContent').html('');
		var len = data[_class].length;
		for (var i = 0; i < len; i ++) {
			var oA = createNode(data[_class][i]);
			$(oA).appendTo('.classContent');
		}
	})
}
//创建a标签节点与里面的图片内容并返回a标签
function createNode(obj){
	var oA = document.createElement('a');
	var oImg = document.createElement('img');
	var oSpan = document.createElement('span');
	$(oImg).prop('src', obj.img).appendTo(oA);
	$(oSpan).html(obj.info).appendTo(oA);
	return oA;
}




