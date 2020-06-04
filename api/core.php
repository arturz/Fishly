<?php
  include_once 'utils.php';
  include_once 'User.php';

  $url = 'http://localhost/projekt';
  $dbhost = 'localhost';
  $dbname = 'fishly';
  $dbuser = 'root';
  $dbpassword = '';

  header('Content-type: text/plain; charset=utf-8');

  try {
    $pdo = new PDO("mysql:host=".$dbhost.";dbname=".$dbname.";charset=utf8", $dbuser, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

?>