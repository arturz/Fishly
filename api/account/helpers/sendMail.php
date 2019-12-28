<?php
  function sendMail($to, $title, $content){
    $from = 'admin@fishly.com';

    $headers = "";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: <".$from.">\r\n";

    $message = <<< END
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

    return mail("<$to>", $title, $message, $headers);
  }
?>