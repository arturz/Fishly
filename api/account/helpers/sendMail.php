<?php
  require_once dirname(__DIR__) . '../../../vendor/autoload.php';

  /**
   * Wysyła wiadomość na podany email, z danym tytułem i daną treścią (może zawierać kod HTML).
   *
   * @param [string] $to
   * @param [string] $title
   * @param [string] $content
   * @return bool
   */
  function sendMail($to, $title, $content){
    $email = new \SendGrid\Mail\Mail(); 
    $email->setFrom(getenv("MAIL_SENDER"), "Fishly");
    $email->setSubject($title);
    $email->addTo($to, "Unverified account");

    $content = <<< END
      <html>
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            h1 {
              font-size: 4rem;
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              font-weight: 300;
              color: #3f51b5;
              margin: 1rem;
            }
          </style>
        </head>
        <body>
          <h1>Fishly</h1>
          $content
        </body>
      </html>
    END;
    $email->addContent("text/html", $content);

    $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));
    try {
      $response = $sendgrid->send($email);
      print $response->statusCode() . "\n";
      print_r($response->headers());
      print $response->body() . "\n";
      return true;
    } catch (Exception $e) {
      echo 'Caught exception: '. $e->getMessage() ."\n";
      return false;
    }
  }
?>