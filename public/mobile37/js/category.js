$(function(){
	getFirstCategoryData(function(data){
	$(".cate_left ul").html(template("firstTemp",data));
	var firstCategoryId = data.rows[0].id;
	getSecondCategoryData({
		id:firstCategoryId
	},function(data){
		$(".cate_right ul").html(template("secondTemp",data));
	});
});
	$(".cate_left").on("tap","ul li a",function(){
		$(this).parent().parent().find("a").removeClass("active");
		$(this).addClass("active");
		var firstId = $(this).data("id");
		getSecondCategoryData({
			id:firstId
		},function(data){
			$(".cate_right ul").html(template("secondTemp",data));
		});
	})
})
function getFirstCategoryData(callback){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        data:{},
        dataType:"json",
        success:function(data){
        	callback && callback(data);
        }
    });
}
function getSecondCategoryData(parmas,callback){
	$.ajax({
		type:"get",
		url:"/category/querySecondCategory",
		data:parmas,
		dataType:"json",
		success:function(data){
			callback && callback(data);
		}
	});
}