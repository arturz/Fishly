<?php
  include_once '../../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  if(User::getStatusName($user->status) !== 'admin' && User::getStatusName($user->status) !== 'head_admin')
    throwError('Nie masz uprawnień');

  $stmt = $pdo->query("SELECT user_id, login, status FROM `user`");

  $accounts = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $accounts[] = $row;
  }
  
  echo json_encode($accounts);
?>