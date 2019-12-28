<?php
  session_start();

  if(isset($_SESSION['user'])){
    $user = $_SESSION['user'];
  } else {
    $user = null;
  }
?>
<!doctype html>
<html lang="en">
  <head>
    <title>Fishly</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="app/assets/css/app.css" type="text/css">
  </head>
  <script type="text/javascript">
    var STATIC_URL = 'http://localhost/projekt';
    var app = { user: <?php echo json_encode($user); ?> };
  </script>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="./app/assets/bundle/main.bundle.js" ></script>
  </body>
</html>
