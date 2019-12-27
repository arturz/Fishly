<?php
  require_once 'utils/captcha.php';
  header('Content-type: text/plain; charset=utf-8');

  if(!isValidCaptcha($_POST['captcha'])){
    die(json_encode(['error' => 'Zła captcha']));
  }

  
?>