// 轮播图
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
// 下拉刷新
mui.init({
    pullRefresh : {
        indicators: false,
        container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback:function(){
                var that = this;
                setTimeout(function(){
                    that.endPulldownToRefresh();
                    that.refresh(true);
                },1000);
            }
        }
    }
  });
// span点击颜色高亮
$(".lt_prosize span").on("tap",function(){
    $(".lt_prosize span").removeClass("now");
    $(this).addClass("now");
});
//获取数据
function getProData(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetail",
            data:"",
        });
}