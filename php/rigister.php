
<?php
    // 获取前端提交的数据
    $username = $_GET["username"];
    $password = $_GET["password"];

    // 连接数据库
    $conn = mysqli_connect("localhost", "root", "123456", "rigister");

    // 定义sql语句
    $sql = "INSERT INTO `zhuce` ( `username`, `password`) VALUES ( '$username', '$password')";


    // 执行sql语句
    $res = mysqli_query($conn, $sql);

    if ( !$res ) {
        die( '数据库出错' . mysqli_error( $conn ) );
    }
    
    if ( $res ) {
        // {code:1, mgs:'添加成功'}
        $arr = array('code'=>1, 'msg'=>'数据添加成功' );
        print_r( json_encode( $arr, JSON_UNESCAPED_UNICODE ) );
    }
?>
