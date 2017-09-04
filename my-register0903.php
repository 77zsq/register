<?php
    header('Content-type:text/html;charset=utf-8');

    /* 规定用GET方式请求 */

    /* 如果有flag标记  */
    if(array_key_exists('flag',$_GET)){
        
        $flag = $_GET['flag']; /* ??每一个操作都有flag这个key  会不会混？ */
        /*flag =1 的操作 验证用户名是否存在 */
       
        if($flag == 1){
            $value = $_GET['key'];
            /* 模拟数据 */
            // $arr = array('jack','rose');
            // if(in_array($value,$arr)){
            //     echo '用户名已经存在';
            // }
            /* 读取文件 */
            $dataStr = file_get_contents('data.json');
            /* 转换成数组  需要做的数组成员的name属性是否是指定的用户名 */
           $dataArr = json_decode($dataStr);
           /* 遍历 */
           for($i=0;$i<count($dataArr);$i++){
               if($dataArr[$i] -> name == $_GET['key']){
                   echo '用户名已经存在了';
                   return;
               }
           }
        /*flag =2的操作 获取验证码 */    
        }else if($flag == 2){
            $arr = array('123','456','789','741','852','963');
            $index = array_rand($arr);
            $yzm = $arr[$index];
            echo  $yzm ;
        
        /*flag =3的操作 实现注册 */    
        }else if($flag == 3){
            
           $name = $_GET['name'];
           $pass = $_GET['pass'];

           /* 先在数组中存值  再把数组写到文件 */
           $obj = array(
               'name' => $name,
               'pass' => $pass
           );
          

           $arr = file_get_contents('data.json');
           $dataArr = json_decode($arr);

           array_push($dataArr,$obj);
           $result = json_encode($dataArr);
           file_put_contents('data.json',$result);
        }
    }

