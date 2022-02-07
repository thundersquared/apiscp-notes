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
---

PHP-FPM uses `.user.ini` in each document root to set PHP configuration at runtime. [Learn more here ↗](https://docs.apiscp.com/admin/PHP-FPM/#user-overrides)

## Increasing PHP memory

To increase the memory limit, you can define a new limit as follows:

```ini
memory_limit = 128M
```

⚠️ Make sure cgroups allocated memory is equal or more than you set in the override.

## Increasing upload size

To increase the upload size limit, you can raise the limit as follows:

```ini
upload_max_filesize = 32M
post_max_size = 32M
```
