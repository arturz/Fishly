<?php
  include_once 'utils.php';
  //7 days
  ini_set('session.gc_maxlifetime', 604800);
  ini_set('session.cookie_lifetime', 604800);
  session_start();

  abstract class UserStatuses {
    protected static $statuses = ['registration_not_confirmed','user','admin','head_admin','banned','deleted'];

    public static function getStatusIndex($status){
      return array_search($status, UserStatuses::$statuses);
    }

    public static function getStatusName($statusIndex){
      return UserStatuses::$statuses[$statusIndex];
    }
  }

  class User extends UserStatuses {
    public $userId;
    public $login;
    public $email;
    public $firstname;
    public $lastname;
    public $status;

    function __construct(){
      if($this->isLogged())
        $this->setUserData($_SESSION['userData']);
    }

    function isLogged(){
      if(empty($_SESSION['userData']) || empty($_SESSION['token']))
        return false;

      if($_SERVER['REQUEST_METHOD'] === 'POST' && (empty($_POST['token']) || $_POST['token'] !== $_SESSION['token']))
        return false;

      return true;
    }

    protected function setUserData($userData){
      $this->userId = $userData['userId'];
      $this->login = $userData['login'];
      $this->email = $userData['email'];
      $this->firstname = $userData['firstname'];
      $this->lastname = $userData['lastname'];
      $this->status = $userData['status'];
    }

    function getUserData(){
      return $_SESSION['userData'];
    }

    function logUser($row){
      $statusName = $this->getStatusName($row['status']);

      if($statusName === 'registration_not_confirmed')
        throwError('Na adres '.$row['email'].' został wysłany link do aktywacji konta (sprawdź spam)');

      if($statusName === 'banned')
        throwError('Zostałeś zbanowany.');

      $userData = [
        "userId" => $row['user_id'],
        "login" => $row['login'],
        "email" => $row['email'],
        "firstname" => $row['firstname'],
        "lastname" => $row['lastname'],
        "status" => $row['status']
      ];

      $_SESSION['userData'] = $userData;

      $this->setUserData($userData);
      $this->generateToken();
      
      return json_encode([ 'user' => $this->getUserData(), 'token' => $this->getToken() ]);
    }

    protected function generateToken(){
      $token = getRandomText(16);
      $_SESSION['token'] = $token;
      return $token;
    }
    public function getToken(){
      return $_SESSION['token'];
    }
  }
?>