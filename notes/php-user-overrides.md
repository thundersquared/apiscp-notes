---
title: PHP User Overrides
tags:
  - php
  - memory
  - upload
  - overrides
emoji: 🐘
link: https://docs.apiscp.com/admin/PHP-FPM/#user-overrides
queries:
  - how to increase php memory
  - how to increase upload size
prev:
  text: Profiling with Xdebug
  link: /xdebug-usage
next:
  text: Install PHP PECL moduels
  link: /install-php-pecl-modules
---

PHP-FPM uses `.user.ini` in each document root to set PHP configuration at runtime. [Learn more here ↗](https://docs.apiscp.com/admin/PHP-FPM/#user-overrides)

## Increasing PHP memory

To increase the memory limit, you can define a new limit as follows:

```ini
memory_limit = 128M
```

::: warning
Make sure cgroups allocated memory is equal or more than you set in the override.
:::

::: warning
This can only be applied to PHP CLI. Use policy maps to change PHP FPM's memory limit instead. [Learn more here ↗](https://docs.apiscp.com/admin/PHP-FPM/#policy-maps)
:::

## Increasing upload size

To increase the upload size limit, you can raise the limit as follows:

```ini
upload_max_filesize = 32M
post_max_size = 32M
```
