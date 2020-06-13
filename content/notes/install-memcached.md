---
title: Install Memcached
tags:
  - cache
  - memcached
  - optimizations
link: https://github.com/thundersquared/apiscp-memcached
---

You can install Memcached via addin.

```bash
cd /usr/local/apnscp/resources/playbooks
git clone https://github.com/thundersquared/apiscp-memcached.git addins/apiscp-memcached
ansible-playbook addin.yml --extra-vars=addin=apiscp-memcached
```

You should then (re)build your PECL packages:

```bash
upcp -sb php/install-pecl-module
```

And if you're using Multi-PHP, (re)build PECL packges for that too:

```
cd /usr/local/apnscp/resources/playbooks
ansible-playbook bootstrap.yml --tags=php/install-pecl-module --extra-vars=php_version=7.4 --extra-vars=multiphp_build=true
```

Then start using your freshly installed `memcached`:

```bash
memcached -p 40010 -m 128
```