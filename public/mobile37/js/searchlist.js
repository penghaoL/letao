//初始化插件
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
});
var urlData = lt.getDataByUrl();
console.log(urlData);
$(".list_inp").val(urlData.key);
window.key = urlData.key;
window.page = 1;
console.log(key);
//点击搜索商品
$(".search_center a").on("tap",function(){
    var seaVal = $.trim($(".search_center input").val());
    if(seaVal){
        window.key = seaVal;
    }else{
        mui.toast("请输入商品名");
    }
});
//点击切换按钮逻辑
$(".lt_seatchlist_nav ul li a").on("tap",function(e){
    var $orderSpan = $(this).find(".fa");
    if($(this).hasClass("now")){
        if($orderSpan.hasClass("fa-angle-down")){
            $orderSpan.removeClass("fa-angle-down");
            $orderSpan.addClass("fa-angle-up");
        }else{
            $orderSpan.removeClass("fa-angle-up");
            $orderSpan.addClass("fa-angle-down");
        }
    }else{
        $(".lt_seatchlist_nav ul li a").removeClass("now");
        $(this).addClass("now");
    }
});
//下拉刷新
mui.init({
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback:function(){
                var that = this;
                window.page = 1;
                getProductDate(function(data){
                    console.log(data);
                    $(".lt_product_box").html(template("temp_list",data));
                    that.endPulldownToRefresh();
                    that.refresh(true);
                });
            }
        },
        up : {
            callback:function(){
                var that = this;
                window.page ++;
                getProductDate(function(data){
                    $(".lt_product_box").append(template("temp_list",data));
                    if(data.data && data.data.length){
                        that.endPullupToRefresh();
                    }else{
                        that.endPullupToRefresh(true);
                    }
                });
            }
        }
    }
});
//获取数据
function getProductDate(callback){
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:{
            proName:window.key,
            page:window.page,
            pageSize:4
        },
        dataType:"json",
        success: function(data){
            setTimeout(function(){
                callback && callback(data);
            },500)
    }
    });
}
$(".list_search").on("tap",function(){
    var key = $.trim($(".search_center input").val());
    if(key){
        window.key = key;
    }else{
        return;
        mui.toast("请输入商品名");
    }
    //getProductDate(function(data){
    //        console.log(data);
    //        $(".lt_product_box").html(template("temp_list",data));
    //    }
    //);
    mui('#refreshContainer').pullRefresh().pulldownLoading();
});