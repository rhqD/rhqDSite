<?php
  header("Access-Control-Allow-Origin: *");
  $result = array('loginAlready' => $SESSION['loginAlready']);
  echo json_encode($result);
?>
