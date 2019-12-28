<?php
  header('Content-type: text/plain; charset=utf-8');

  $url = 'http://localhost/projekt';

  $dbhost = 'localhost';
  $dbname = 'fishly';
  $dbuser = 'root';
  $dbpassword = '';

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

  $userStatuses = [
    'registration_not_confirmed',
    'user',
    'admin',
    'head_admin',
    'banned',
    'deleted'
  ];
?>