<?php
  require_once '../core.php';
  require_once './helpers/isValidCaptcha.php';
  require_once './helpers/sendMail.php';
  require_once './helpers/hashPassword.php';

  if(empty($_POST['captcha']) || !isValidCaptcha($_POST['captcha']))
    throwError('Zła captcha');

  if(empty($_POST['login']) || mb_strlen($_POST['login']) < 3)
    throwError('Zły login');

  if(empty($_POST['password']) || mb_strlen($_POST['password']) < 3)
    throwError('Złe hasło');

  if(empty($_POST['email']) || mb_strlen($_POST['email']) < 3 || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
    throwError('Zły e-mail');

  if(empty($_POST['firstname']) || mb_strlen($_POST['firstname']) < 3)
    throwError('Złe imię');

  $login = mb_substr($_POST['login'], 0, 16, "utf-8");
  $password = $_POST['password'];
  $email = mb_substr($_POST['email'], 0, 32, "utf-8");
  $firstname = mb_substr($_POST['firstname'], 0, 16, "utf-8");
  $lastname = empty($_POST['lastname'])
    ? ''
    : mb_substr($_POST['lastname'], 0, 24, "utf-8");
  
  $stmt = $pdo->prepare('SELECT * FROM user WHERE login = ? AND status <> ?');
  $stmt->execute([$login, UserStatuses::getStatusIndex('deleted')]);
  if($stmt->fetch())
    throwError('Ten login jest już zajęty');

  $stmt = $pdo->prepare('SELECT * FROM user WHERE email = ? AND status <> ?');
  $stmt->execute([$email, UserStatuses::getStatusIndex('deleted')]);
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
    ->execute([$login, $hashedPassword, $email, $firstname, $lastname, UserStatuses::getStatusIndex('registration_not_confirmed'), $_SERVER['REMOTE_ADDR']]);

  $userId = $pdo->lastInsertId();

  $pdo
    ->prepare('INSERT INTO registration_confirm_hash (user_id, hash, created_at) VALUES (?,?,NOW())')
    ->execute([$userId, $registrationConfirmHash]);

  success();
?>