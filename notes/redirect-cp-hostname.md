---
title: Force CP hostname redirect
tags:
  - frontend
emoji: ↪️
---

Redirect all hostnames to the panel hostname (`cpcmd scope:get net.hostname`) using a mod_rewrite redirect. 

Add the following to `/usr/local/apnscp/config/httpd-custom.conf`

```
<Directory ${APNSCP_ROOT}/public>
RewriteEngine on
RewriteOptions inherit
RewriteCond %{HTTP_HOST} ^([^:]+)
RewriteCond "%1 %{ENV:HOSTNAME}" "!(^[^ ]*) \1"
RewriteRule ^(.*)$ %{REQUEST_SCHEME}://%{ENV:HOSTNAME}:%{SERVER_PORT}/$1 [R,L]
</Directory>
```

Then restart ApisCP,

```bash
systemctl restart apiscp
```
