
var mallCar = {
	sumPrice: 0,
}


$(function(){
	
	loadMallCar();
	
	$('#zer-footer .mallCar').click(function(){
		if($('i', $(this)).prop('class') == 'fa zer-circle fa-circle-o'){
			$('i', $(this)).removeClass('fa-circle-o').addClass('fa-check-circle');
			$('.fa-circle-o', $('.goodItem')).click();
		}else{
			$('i', $(this)).addClass('fa-circle-o').removeClass('fa-check-circle');
			$('.isCheck').click();
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
	
	//弹出支付方式窗口
	$('.addCar').click(function(){
		$('.paymentContainer').removeClass('hide');
	})
	//隐藏支付方式窗口
	$('.paymentContainer li').click(function(){
		$('.paymentContainer').addClass('hide');
	})
	
	$('.shoppingCar').click(function(evt){
		var target = evt.target;
		if($(target).prop('id') == 'removeItem'){
			removeItem(target);
		}else if($(target).prop('class') == 'fa fa-plus'){
			addCount(target,1);
			calculate();
		}else if($(target).prop('class') == 'fa fa-minus'){
			addCount(target,0);
			calculate();
		}else if($(target).prop('class') == 'isCheck fa zer-circle fa-2x fa-circle-o' || $(target).prop('class') == 'isCheck fa zer-circle fa-2x fa-check-circle'){
			checked(target);
			checkAll();
			calculate();
		}
	})
})

//初始化购物车
function loadMallCar(){
	$('.loading').removeClass('hide');
	var idArray = localStorage.getItem('mallCar') ? JSON.parse(localStorage.getItem('mallCar')) : [];
	$.get('data/mallCar.json', function(data){
		var len = data.mallCar.length;
		var _len = idArray.length;
		for (var i = 0; i < len; i++) {
			for(var n = 0; n < _len; n++){
				if(data.mallCar[i].id == idArray[n]){
					createItem(data.mallCar[i],idArray[n]);
				}
			}
			
		}
		$('.goodItem').eq(0).remove();
		$('.loading').addClass('hide');
	})
}


function createItem(obj,id){
	var oItem = $('.goodItem').eq(0).clone(true);
	oItem.attr('goodId', id);
	$('img', oItem).prop('src', obj.imgSrc);
	$('.infoTitle', oItem).html(obj.title);
	$('.price span', oItem).html(obj.price);
	$('.countNum', oItem).html(obj.count);
	oItem.appendTo('.shoppingCar');
}

//删除购物车里面的对应项目
function removeItem(element){
	$(element).parent().parent().parent().parent().remove();
	var id = $(element).parent().parent().parent().parent().attr('goodId');
	var idArray = JSON.parse(localStorage.getItem('mallCar'));
	for (var i = 0; i < idArray.length; i++) {
		if(id == idArray[i]){
			idArray.splice(i,1);
		}
	}
	localStorage.setItem('mallCar', JSON.stringify(idArray))
}
//增加或减少商品数量
function addCount(element,operation){
	var oNum = $('.countNum', $(element).parent().parent().parent().parent());
	var num = oNum.html();
	if(operation == 1){
		num++
		oNum.html(num);
	}else{
		num--;
		oNum.html(num);
	}
}
//勾选购物车商品
function checked(element){
	var oCheck = $('.isCheck', $(element).parent().parent());
	if(oCheck.prop('class') == 'isCheck fa zer-circle fa-2x fa-circle-o'){
		oCheck.removeClass('fa-circle-o').addClass('fa-check-circle');
	}else{
		oCheck.addClass('fa-circle-o').removeClass('fa-check-circle');
	}
}
//
function checkAll(){
	var checkAll = true;
	$('.isCheck').each(function(){
		if($(this).prop('class') == 'isCheck fa zer-circle fa-2x fa-circle-o'){
			checkAll = false;
		}
	});
	if(checkAll){
		$('i', $('#zer-footer .mallCar')).removeClass('fa-circle-o').addClass('fa-check-circle');
	}else{
		$('i', $('#zer-footer .mallCar')).addClass('fa-circle-o').removeClass('fa-check-circle');
	}
}

function calculate(){
	var sum = 0;
	$('.shoppingCar .fa-check-circle').closest('.goodItem').each(function(){
		var price = $('.price span',$(this)).html();
		var count = $('.countNum', $(this)).html();
		sum = sum + (parseFloat(price) * parseFloat(count));
	});
	mallCar.sumPrice = sum;
	$('.buyNow span').html(mallCar.sumPrice);
}
