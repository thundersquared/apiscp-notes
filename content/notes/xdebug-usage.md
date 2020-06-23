---
title: Profiling with Xdebug
tags:
  - php
  - modules	
  - bootstrapper
emoji: 🐛
---

Xdebug generates profiling data compatible with Cachegrind. [KCacheGrind](https://kcachegrind.github.io/) (Linux, KDE), [QCacheGrind](http://sourceforge.net/projects/qcachegrindwin/) (Windows), or [WebGrind](https://github.com/jokkedk/webgrind). Change `force_module_rebuild` to `true` to overwrite xdebug.ini configuration, if present, in FST/siteinfo/etc/phpXX.d/. 

```bash
cd /usr/local/apnscp/resources/playbooks

ansible-playbook bootstrap.yml  --tags=php/install-pecl-module,apnscp/php-filesystem-template --extra-vars=pecl_extensions='{"name":"xdebug","zend":true,"extension":"https://github.com/xdebug/xdebug/archive/2.9.6.tar.gz"}' --extra-vars=force_module_rebuild=false
```

Add Xdebug profiling support to PHP. Depending upon [configuration visibility](https://docs.apiscp.com/admin/PHP-FPM/#override-precedence), siteXX/fst/etc/phpXX.d/ or .user.ini are preferred.

```ini
xdebug.profiler_enable_trigger=1
xdebug.profiler_enable_trigger_value=mykey
; May want to change this...
xdebug.profiler_output_dir=/tmp
```

Restart the pool (or all pools) using `systemctl restart php-fpm`. Users may restart via **Web** > **PHP Pools**.

Visit site with `?XDEBUG_PROFILE=mykey` at the end of the request URI to generate a profile at the end of the request.

systemd prefers private /tmp directories, which locates the generated `cachegrind.*`  files in `/tmp/systemd-private-HASH-php-fpm-siteXX.../tmp/`. A web-accessible directory can be used instead. 

`PrivateTmp=no` may be added to the systemd service as an [override](https://docs.apiscp.com/admin/PHP-FPM/#overriding-service-definitions).

```bash
mkdir /var/www/html/profiler
chmod 777 /var/www/html/profiler
```

Adjust `xdebug.profiler_output_dir` accordingly.