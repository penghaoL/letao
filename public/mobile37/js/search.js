$(function(){
   var ltHuistoryStor = localStorage.getItem("lt_history") || "[]";
   var historyList = JSON.parse(ltHuistoryStor);
   $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    console.log(historyList);
    $(".history_b ul").on("tap","ul li span",function(){
        var index = $(this).data("index");
        console.log(index);
        historyList.splice(index,1);
        console.log(JSON.stringify(historyList));
        localStorage.setItem("lt_history",JSON.stringify(historyList));
        $(".history_b ul").html(template("ltHistoryTemp",{list:historyList}));
    })
})