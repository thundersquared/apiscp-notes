---
title: Install Memcached
tags:
  - php
  - cache
  - memcached
  - optimizations
link: https://github.com/thundersquared/apiscp-memcached
queries:
  - how to install memcached
---

You can install Memcached via addin.

```bash
cd /usr/local/apnscp/resources/playbooks
git clone https://github.com/thundersquared/apiscp-memcached.git addins/apiscp-memcached
ansible-playbook addin.yml --extra-vars=addin=apiscp-memcached
```

You should then (re)build your PECL packages. [Learn how here](./install-php-pecl-modules)

To start using your freshly installed `memcached`:

```bash
memcached -l 127.0.0.1 -p 40010 -m 128
```

::: warning
**Do not run** memcached without binding locally or to a unix-domain socket (`-s /path/to/socket`). See also [Memcached DDoS explained](https://www.akamai.com/us/en/resources/our-thinking/threat-advisories/ddos-reflection-attack-memcached-udp.jsp).
:::
