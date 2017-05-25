<?php
  header("Access-Control-Allow-Origin: *");
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $body = json_decode(file_get_contents("php://input"));
    $userName = $body->userName;
    $password = $body->password;
    if ($userName == 'renhanquan' && $password == '19940227'){
      session_start();
      $_SESSION['loginAlready'] = true;
      $result = array('loginSuccess' => true);
    } else {
      $result = array('loginSuccess' => false);
    }
    echo json_encode($result);
  }
?>
