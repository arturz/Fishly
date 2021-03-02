<?php
  include_once 'utils.php';
  include_once 'User.php';

  $db_url_env = getenv("CLEARDB_DATABASE_URL"); 

  // eg. 'http://localhost/Fishly', domain that will be used in production
  $url = getenv("URL"); 
  
  if($db_url_env == false || $url == false){
    $url = 'http://localhost/Fishly';
    $dbhost = 'localhost';
    $dbname = 'fishly';
    $dbuser = 'root';
    $dbpassword = '';
  } else {
    $parsed_db_url = parse_url($db_url_env);
    $dbhost = $parsed_db_url["host"];
    $dbname = substr($parsed_db_url["path"], 1);
    $dbuser = $parsed_db_url["user"];
    $dbpassword = $parsed_db_url["pass"];
  }  

  header('Content-type: text/plain; charset=utf-8');

  try {
    $pdo = new PDO("mysql:host=".$dbhost.";dbname=".$dbname.";charset=utf8", $dbuser, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

?>