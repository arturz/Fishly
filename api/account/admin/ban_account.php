<?php
  include_once '../../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  if(User::getStatusName($user->status) !== 'admin' && User::getStatusName($user->status) !== 'head_admin')
    throwError('Nie masz uprawnień');

  if(!isset($_POST['userId']))
    throwError('Brakujące dane');

  $stmt = $pdo->prepare('UPDATE user SET status = ? WHERE user_id = ?');
  $stmt->execute([UserStatuses::getStatusIndex('banned'), $_POST['userId']]);

  success();
?>