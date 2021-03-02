# Fishly

## Stack

- Back-end: PHP, MySQL
- Front-end: React, TypeScript

## Requirements

- PHP 7.3.0+
- Composer

## Development

With `XAMPP`: place root folder inside htdocs and run `npm run watch`

You have to import tables structure from fishly.sql on your own and, if needed, change **developmental** credentials inside `api/core.php`.

## Production

### Vars

- _MySQL_: **CLEARDB_DATABASE_URL**
- _mail provider_: **SENDGRID_PASSWORD**, **SENDGRID_USERNAME**
- _full link to domain_ (e.g. `https://domain.com`): **URL**
- _verification mails sender address_ (e.g. `verify@domain.com`): **MAIL_SENDER**
- _ReCAPTCHA v2 pair_: **CAPTCHA_SITE_KEY**, **CAPTCHA_SECRET_KEY**

You can generate reCAPTCHA pair [here](http://www.google.com/recaptcha/admin).

## Build

`npm run build`

## License

MIT
