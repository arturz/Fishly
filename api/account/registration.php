<?php
  require_once '../core.php';
  require_once './helpers/isValidCaptcha.php';
  require_once './helpers/sendMail.php';
  require_once './helpers/password.php';

  if(empty($_POST['captcha']) || !isValidCaptcha($_POST['captcha']))
    throwError('Zła captcha');

  if(empty($_POST['login']))
    throwError('Brakujący login');

  if(empty($_POST['password']))
    throwError('Brakujące hasło');

  if(empty($_POST['email']))
    throwError('Brakujący e-mail');

  if(empty($_POST['firstname']))
    throwError('Brakujące imię');

  if(empty($_POST['lastname']))
    throwError('Brakujące nazwisko');

  $login = $_POST['login'];
  $password = $_POST['password'];
  $email = $_POST['email'];
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $status = array_search('registration_not_confirmed', $userStatuses);
  
  $stmt = $pdo->prepare('SELECT * from user where login = ?');
  $stmt->execute([$login]);
  if($stmt->fetch())
    throwError('Ten login jest już zajęty');

  $stmt = $pdo->prepare('SELECT * from user where email = ?');
  $stmt->execute([$email]);
  if($stmt->fetch())
    throwError('Ten email jest już zajęty');

  $registrationConfirmHash = bin2hex(random_bytes(16));
  $message = "
    Kliknij, aby aktywować swoje konto Fishly: <a href=$url/api/account/registration_confirm.php?hash=$registrationConfirmHash target=__blank>Aktywuj konto</a>
  ";

  if(!sendMail($email, 'Aktywacja konta Fishly', trim($message)))
    throwError('Nie można wysłać linku aktywacyjnego');

  $hashedPassword = hashPassword($password);
  $pdo
    ->prepare('INSERT INTO user (login, hashed_password, email, firstname, lastname, status, registration_ip) VALUES (?,?,?,?,?,?,?)')
    ->execute([$login, $hashedPassword, $email, $firstname, $lastname, $status, $_SERVER['REMOTE_ADDR']]);

  $userId = $pdo->lastInsertId();

  $pdo
    ->prepare('INSERT INTO registration_confirm_hash (user_id, hash) VALUES (?,?)')
    ->execute([$userId, $registrationConfirmHash]);

  success();
?>