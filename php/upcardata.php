<?php
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $goods_num = $_GET['goods_num'];

    // $username = '婧婧';
    // $goods_id = 5;
    // $goods_num = 7;
    $con = mysqli_connect('localhost','root','123456','rigister');

    $sql = "UPDATE `car` SET `goods_num` = ' $goods_num' WHERE `goods_id` = '$goods_id' AND `username` = '$username'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        // die('error for mysqli' . mysqli_error());
        echo json_encode(array("code"=>0,"msg"=>"修改数据失败"));
    }else{
        echo json_encode(array("code"=>$res,"msg"=>"修改数据成功"));
    }
?>