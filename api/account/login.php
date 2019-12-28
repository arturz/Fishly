<?php
  session_start();
  require_once '../core.php';
  require_once './helpers/password.php';

  if(empty($_POST['login']))
    throwError('Nie ma loginu');

  if(empty($_POST['password']))
    throwError('Nie ma hasła');

  $login = $_POST['login'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare('SELECT hashed_password FROM user WHERE login = ?');
  $stmt->execute([$login]);
  $row = $stmt->fetch();
  if(!$row || !verifyPassword($password, $row['hashed_password']))
    throwError('Złe dane');
  
  $stmt = $pdo->prepare('SELECT * FROM user WHERE login = ?');
  $stmt->execute([$login]);
  $row = $stmt->fetch();

  $user = [
    'userId' => $row['user_id'],
    'login' => $row['login'],
    'email' => $row['email'],
    'firstname' => $row['firstname'],
    'lastname' => $row['lastname'],
    'status' => $userStatuses[$row['status']]
  ];

  $_SESSION['user'] = $user;
  echo json_encode($user);
?>