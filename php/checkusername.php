<?php
    // 获取前端提交的数据
    $username = $_GET["username"];

    // 连接数据库
    $conn = mysqli_connect("localhost", "root", "123456", "rigister");

    // 定义sql语句
    $sql = "SELECT * FROM `zhuce` WHERE username='$username'";


    // 执行sql语句
    $result = mysqli_query($conn, $sql);

    // 获取查询到的数据的条数
    $num = mysqli_num_rows($result);

    // 判定
    if ($num == 0) {
        echo json_encode(array("error" => 0, "data" => '恭喜可以使用'),JSON_UNESCAPED_UNICODE );
    } else {
        echo json_encode(array("error" => 1, "data" => '用户名已被占用',JSON_UNESCAPED_UNICODE ));
    }
?>