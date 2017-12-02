window.lt = {};
lt.getDataByUrl = function(){
    var search = location.search;
    var params = {};
    if(search){
        search = search.substr(1);
        console.log(search);
        var searchArr = search.split("&");
        searchArr.forEach(function(item,i){
            var itemArr = item.split("=");
            params[itemArr[0]] = decodeURI(itemArr[1]);
        });
        return params;
    }
}