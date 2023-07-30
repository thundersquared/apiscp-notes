---
title: Install PHP PECL modules
tags:
  - php
  - modules
  - bootstrapper
emoji: 🐘
queries:
  - how to install pecl modules
---

Modules are defined in bootstrapper's scope via `pecl_extensions` var.

```bash
# Get defined PECL modules
cpcmd scope:get cp.bootstrapper pecl_extensions
# Define new PECL modules
cpcmd scope:set cp.bootstrapper pecl_extensions '[imagick,igbinary,redis,memcached]'
```

After setting `pecl_extensions` to be installed, you should *actually* install them.

```bash
# Build all modules
upcp -sb php/install-extensions
# Build all modules for Multi-PHP installs
cd /usr/local/apnscp/resources/playbooks
ansible-playbook bootstrap.yml --tags=php/install-extensions --extra-vars=php_version=7.4 --extra-vars=multiphp_build=true
```
