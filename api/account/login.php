<?php
  require_once '../core.php';
  require_once './helpers/password.php';

  if(empty($_POST['login']))
    throwError('Nie ma loginu');

  if(empty($_POST['password']))
    throwError('Nie ma hasła');

  $login = $_POST['login'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare('SELECT hashed_password FROM user WHERE login = ? AND status <> ?');
  $stmt->execute([$login, array_search('deleted', $userStatuses)]);
  $row = $stmt->fetch();
  if(!$row || !verifyPassword($password, $row['hashed_password']))
    throwError('Złe dane');
  
  $stmt = $pdo->prepare('SELECT * FROM user WHERE login = ? AND status <> ?');
  $stmt->execute([$login, array_search('deleted', $userStatuses)]);
  $row = $stmt->fetch();

  $status = $userStatuses[$row['status']];

  if($status === 'registration_not_confirmed')
    throwError('Na adres '.$row['email'].' został wysłany link do aktywacji konta (sprawdź spam)');

  if($status === 'banned')
    throwError('Zostałeś zbanowany.');
  
  $user = [
    'userId' => $row['user_id'],
    'login' => $row['login'],
    'email' => $row['email'],
    'firstname' => $row['firstname'],
    'lastname' => $row['lastname'],
    'status' => $userStatuses[$row['status']]
  ];
  $token = getRandomText(16);

  $_SESSION['user'] = $user;
  $_SESSION['token'] = $token;
  echo json_encode([
    'user' => $user,
    'token' => $token
  ]);
?>