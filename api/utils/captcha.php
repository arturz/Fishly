<?php
  $captchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
  $captchaSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

  function isValidCaptcha($captcha){
    global $captchaUrl;
    global $captchaSecret;

    if(empty($captcha)){
      return false;
    }

    $content = http_build_query([
      'secret' => $captchaSecret,
      'response' => $captcha
    ]);

    $opts = [
      'http' => [
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $content
      ]
    ];

    $context = stream_context_create($opts);
    $result = (array)json_decode(file_get_contents($captchaUrl, false, $context));
    try {
      return $result['success'];
    } catch (Exception $e) {
      return false;
    }
  }
?>