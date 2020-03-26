<?php
  require_once '../core.php';

  $userId = $_GET['userId'];

  $user = new User();
  if($user->isLogged() && $user->userId == $userId){
    $stmt = $pdo->prepare("SELECT user_id, firstname, lastname, email, login, status FROM `user` WHERE `user_id` = ?");
    $stmt->execute([$userId]);
  } else {
    $stmt = $pdo->prepare("SELECT user_id, firstname, login, status FROM `user` WHERE `user_id` = ?");
    $stmt->execute([$userId]);
  }

  $account = $stmt->fetch(PDO::FETCH_ASSOC);

  $account['sets'] = [];
  $stmt = $pdo->prepare("SELECT set_id, name, subject FROM `set` WHERE `created_by` = ?");
  $stmt->execute([$userId]);

  while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    $account['sets'][] = $row;
  
  echo json_encode($account);
?>