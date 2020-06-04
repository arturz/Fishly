<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $userId = $user->userId;

  if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['words']))
    throwError('Brakujące dane');

  $name = mb_substr($_POST['name'], 0, 50, "utf-8");
  $subject = mb_substr($_POST['subject'], 0, 20, "utf-8");
  $words = $_POST['words'];

  $pdo->beginTransaction();

  $pdo
    ->prepare('INSERT INTO `set` (created_by, name, subject) VALUES (?,?,?)')
    ->execute([$userId, $name, $subject]);
  $setId = $pdo->lastInsertId();

  foreach($words as $word){
    $pdo
      ->prepare('INSERT INTO word (set_id, original, translated) VALUES (?,?,?)')
      ->execute([$setId, mb_substr($word['original'], 0, 32), mb_substr($word['translated'], 0, 32)]);
  }

  $pdo->commit();

  echo json_encode([ 'setId' => $setId ]);
?>