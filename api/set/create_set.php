<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $userId = $user->userId;

  if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['words']))
    throwError('Brakujące dane');

  $name = $_POST['name'];
  $subject = $_POST['subject'];
  $words = $_POST['words'];

  $pdo
    ->prepare('INSERT INTO `set` (created_by, name, subject) VALUES (?,?,?)')
    ->execute([$userId, $name, $subject]);
  $setId = $pdo->lastInsertId();

  foreach($words as $word){
    $pdo
      ->prepare('INSERT INTO word (set_id, original, translated) VALUES (?,?,?)')
      ->execute([$setId, $word['original'], $word['translated']]);
  }

  echo json_encode([ 'setId' => $setId ]);
?>