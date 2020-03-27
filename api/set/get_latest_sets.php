<?php
  require_once '../core.php';

  $stmt = $pdo->query("SELECT set_id, name, subject FROM `set` ORDER BY created_at DESC LIMIT 3");

  $sets = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $sets[] = $row;
  }
  
  echo json_encode($sets);
?>