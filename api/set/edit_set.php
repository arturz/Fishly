<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $userId = $user->userId;

  if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['words']) || !isset($_POST['set_id']))
    throwError('Brakujące dane');

  $setId = $_POST['set_id'];

  $stmt = $pdo->prepare("SELECT created_by FROM `set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  if(intval(($stmt->fetch(PDO::FETCH_ASSOC))['created_by']) !== intval($userId))
    throwError('Nie masz dostępu');
    
  
  $pdo->beginTransaction();

  $stmt = $pdo->prepare("DELETE FROM `set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  $stmt = $pdo->prepare("DELETE FROM `word` WHERE set_id = ?");
  $stmt->execute([$setId]);
 
  $name = mb_substr($_POST['name'], 0, 50);
  $subject = mb_substr($_POST['subject'], 0, 20);
  $words = $_POST['words'];

  $pdo
    ->prepare('INSERT INTO `set` (set_id, created_by, name, subject) VALUES (?,?,?,?)')
    ->execute([$setId, $userId, $name, $subject]);

  foreach($words as $word){
    $pdo
      ->prepare('INSERT INTO word (set_id, original, translated) VALUES (?,?,?)')
      ->execute([$setId, $word['original'], $word['translated']]);
  }

  $pdo->commit();

  echo json_encode([ 'setId' => $setId ]);
?>