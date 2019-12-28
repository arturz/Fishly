<?php
  require_once '../core.php';

  if(empty($_GET['hash']))
    throwError('Nie ma hasha');

  $hash = $_GET['hash'];

  $stmt = $pdo->prepare('SELECT user_id FROM registration_confirm_hash WHERE hash = ?');
  $stmt->execute([$hash]);
  $row = $stmt->fetch();
  
  if(!$row)
    throwError('Nie ma takiego hasha');

  $userId = $row['user_id'];

  $status = array_search('user', $userStatuses);
  $pdo
    ->prepare('UPDATE user SET status = ? WHERE user_id = ?')
    ->execute([$status, $userId]);

  $pdo
    ->prepare('DELETE FROM registration_confirm_hash WHERE hash = ?')
    ->execute([$hash]);

  success();
?>