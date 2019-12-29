<?php
  session_start();
  include_once '../core.php';

  if(!isset($_SESSION['user']))
    throwError('Nie jesteś zalogowany');

  if(!isset($_POST['userId']))
    throwError('Brakujący id');

  $userIdToDelete = $_POST['userId'];
  $user = $_SESSION['user'];

  /**
   * Użytkownik usuwa sam siebie.
   */
  if($user['id'] === $userIdToDelete){
    $stmt = $pdo->prepare('UPDATE user SET status = ? WHERE user_id = ?');
    $stmt->execute([array_search('deleted', $userStatuses), $userIdToDelete]);
    if($stmt->rowCount() === 0)
      throwError('Nie można usunąć');
      
    success();
  }
  
  /**
   * Admin usuwa użytkownika - trzeba sprawdzić czy jest adminem i usunąć link aktywacyjny użytkownika (jeśli użytkownik nie jest aktywowany).
   */
  if($user['status'] === array_search('admin', $userStatuses) || $user['status'] === array_search('head_admin', $userStatuses)){
    $stmt = $pdo->prepare('UPDATE user SET status = ? WHERE user_id = ?');
    $stmt->execute([array_search('deleted', $userStatuses), $userIdToDelete]);
    if($stmt->rowCount() === 0)
      throwError('Nie można usunąć');

    $pdo
      ->prepare('DELETE FROM registration_confirm_hash WHERE user_id = ?')
      ->execute([$userIdToDelete]);

    success();
  }

  throwError('Nie masz uprawnień');
?>