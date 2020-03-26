<?php
  require_once '../../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  if(empty($_POST['setId']))
    throwError('Brakujące dane');

  $userId = $user->userId;
  $setId = $_POST['setId'];

  $stmt = $pdo->prepare("SELECT * FROM `saved_set` WHERE user_id = ? AND set_id = ?");
  $stmt->execute([$userId, $setId]);

  if($stmt->fetch()){
    $pdo
      ->prepare('DELETE FROM `saved_set` WHERE user_id = ? AND set_id = ?')
      ->execute([$userId, $setId]);

    die(json_encode([ 'toggled' => false ]));
  }

  if($pdo->query("SELECT COUNT(*) FROM `saved_set` WHERE user_id = '$userId'")->fetchColumn() > 20){
    throwError("Za dużo zapisanych fiszek");
  }

  $stmt = $pdo->prepare("INSERT INTO `saved_set` (user_id, set_id) VALUES (?, ?)");
  $stmt->execute([$userId, $setId]);

  die(json_encode([ 'toggled' => true ]));
?>