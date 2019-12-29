<?php
  $url = 'http://localhost/projekt';
  $dbhost = 'localhost';
  $dbname = 'fishly';
  $dbuser = 'root';
  $dbpassword = '';

  session_start();
  header('Content-type: text/plain; charset=utf-8');

  try {
    $pdo = new PDO("mysql:host=".$dbhost.";dbname=".$dbname, $dbuser, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  function throwError($name){
    die(json_encode([ 'error' => $name ]));
  }

  function success(){
    die(json_encode([ 'success' => true ]));
  }

  function getUser(){
    if(empty($_SESSION['user']))
      return null;

    return $_SESSION['user'];
  }

  $userStatuses = [
    'registration_not_confirmed',
    'user',
    'admin',
    'head_admin',
    'banned',
    'deleted'
  ];
?>