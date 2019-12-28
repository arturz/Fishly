<?php
  function hashPassword($password): string {
    return password_hash($password, PASSWORD_ARGON2ID);
  }

  function verifyPassword($password, $hash): bool {
    return password_verify($password, $hash);
  }
?>