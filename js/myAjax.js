/**
 * Created by Administrator on 2017/8/11.
 */
/*请求与响应至少有中个方面的操作不一样
* 1.请求方式
* 2.请求url
* 3.请求所传递的参数
* 4.接收数据之后的渲染处理方式*/

/*1.第一个封装形式*/
/*function myajax(type,url,data,callback){

}*/
/*缺点：
* 1.参数数量固定：不方便用户的调用
* 2.参数的顺序固定：不方便用户的调用
* 不方便调用，也不方便扩展*/

/*2.使用对象
* type:请求方式
* url:请求ur
* data:请求所传递的参数
* callback:接收数据之后的渲染处理方式*/
/*function myajax(option){

}
function get(option){

}
function post(option){

}*/
/*缺点：
* 1.函数定义在全局，会造成全局污染
* 2.函数如果数量增加，会造成代码混乱，不方便管理*/

/*使用对象*/
var $ = { //以后是到构造函数的原型
    /*{"name":"jack","age":20} >> ?name=jack&age=20*/
    getData:function(data){
        var str = "";
        for(var key in data){
            str = str + key + "=" + data[key] + "&";
        }
        return str.slice(0,-1);
    },
    /*请求与响应至少有中个方面的操作不一样
     * 1.请求方式：type
     * 2.请求url:url
     * 3.请求所传递的参数:data:{"name":"jack","age":20} >> ?name=jack&age=20
     * 4.接收数据之后的渲染处理方式:success*/
    ajax:function(option){
        if(!option || typeof option !="object"){
            return;
        }

        /*接收参数*/
        var type = option.type || 'get';
        /*pathname:当前页面的路径*/
        var url = option.url || location.pathname;
        var data = option.data || null;
        /*获取拼接之后的参数*/
        data = this.getData(data);
        var success = option.success || null;

        /*发送请求*/
        var xhr = new XMLHttpRequest();
        /*设置请求行*/
        if(type == 'get') {
            if(data){
                url = url  + "?"+ data;
                data= null;
            }
        }
        xhr.open(type,url);
        /*设置请求头*/
        if(type=="post"){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        /*设置请求体*/
        /*get 有参  01-json.php?name=jack&age=20
        * get 无参 ""   01-json.php  ""
        *
        * post 有参  01-json.php     data="name=jack&age=20"
        * post 无参   01-json.php  data=""*/
        xhr.send(data);

        /*接收响应*/
        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState ==4){
                /*判断返回值的类型*/
                var rt = xhr.getResponseHeader("Content-Type");

                var result = null;
                if(rt.indexOf("xml") != -1){ //说明中xml
                    result = xhr.responseXML;
                }
                else if(rt.indexOf("json") != -1){
                    result = JSON.parse(xhr.responseText);
                }else{
                    result = xhr.responseText;
                }
                /*渲染*/
                success && success(result);
            }
        }
    },
    get:function(option){
        option.type= 'get';
        this.ajax(option);
    }

};