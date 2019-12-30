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

  /**
   * Kończy działanie skryptu i wyświetla błąd w formacie JSON { error: $name }
   *
   * @param [string] $name
   * @return void
   */
  function throwError($name){
    die(json_encode([ 'error' => $name ]));
  }

  /**
   * Pozytywnie kończy działanie skryptu i wyświetla JSON { success: true }
   *
   * @param [string] $name
   * @return void
   */
  function success(){
    die(json_encode([ 'success' => true ]));
  }

  /**
   * Zwraca ciąg losowych znaków o podanej długości
   *
   * @param [integer] $length
   * @return string
   */
  function getRandomText($length){
    return bin2hex(random_bytes(intdiv($length, 2)));
  }

  /**
   * Zwraca użytkownika jeśli jest zalogowany i token CSRF się zgadza ($_POST['token']), w przeciwnym wypadku null
   *
   * @return object
   */
  function getUser(){
    if(empty($_SESSION['user']) || empty($_SESSION['token']))
      return null;

    if(empty($_POST['token']) || $_POST['token'] !== $_SESSION['token'])
      throwError('Zły token csrf');

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