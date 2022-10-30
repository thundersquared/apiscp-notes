---
title: Temporary passwords
tags:
  - auth
  - api
  - cpcmd
emoji: 🔑
---

```php
auth_set_temp_password( string $item, int $duration = 120, string $password = NULL );
```

Generate or assign (`$password`) for a site or named user (`$item`).

```bash
# Set password for site administrator on domain.com
cpcmd auth:set-temp-password domain.com
# Set password for user foo on domain.com
cpcmd -d domain.com auth:set-temp-password foo
# Set password for site administrator on domain.com for 5 minutes
cpcmd auth:set-temp-password domain.com 300
```

A password, unless specified, will be randomly generated. If calling via API `$password` must be set or fetched from OOB messaging in the SOAP headers.
