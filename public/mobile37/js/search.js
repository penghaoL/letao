$(function(){
   var ltHuistoryStor = localStorage.getItem("lt_history") || "[]";
   var historyList = JSON.parse(ltHuistoryStor);
   $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    $(".history_b ul").on("tap","ul li span",function(){
        var index = $(this).data("index");
        console.log(index);
        historyList.splice(index,1);
        console.log(JSON.stringify(historyList));
        localStorage.setItem("lt_history",JSON.stringify(historyList));
        $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    })
    $(".search_center input").val("");
    $(".search_center a").on("tap",function(){
        var key = $.trim($(".search_center input").val());
        if(!key){
            mui.toast("请输入商品");
            return;
        }
        //将记录储存到本地
        addHistory(key);
        //跳转页面
        location.href = "searchlist.html?key=" + encodeURIComponent(key);
    });
    $(".history_b .lt_clear").on("tap",function(){
        historyList = [];
        $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    });
    $(".history_b").on("tap","ul li a",function(){
        location.href = "searchlist.html?key=" + encodeURIComponent($(this).data("key"));
    });
    function addHistory(key){
        var isSame = false;
        var sameIndex = null;
        $.each(historyList,function(i,item){
            if(key == item){
                isSame = true;
                sameIndex = i;
            }
        });
        if(isSame){
            historyList.splice(sameIndex,1);
            historyList.push(key);
        }else{
            historyList.push(key);
            if(historyList.length > 10){
                historyList.splice(0,historyList.length-10);
            }
        }
        localStorage.setItem("lt_history",JSON.stringify(historyList));
        $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    }
})