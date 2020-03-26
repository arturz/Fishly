<?php
  require_once '../../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $stmt = $pdo->prepare("SELECT ss.set_id as set_id, name, subject FROM `saved_set` ss INNER JOIN `set` s ON ss.set_id = s.set_id WHERE `user_id` = ?");
  $stmt->execute([$user->userId]);

  $sets = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $sets[] = $row;
  }
  
  echo json_encode($sets);
?>