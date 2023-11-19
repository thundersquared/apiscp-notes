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

## Custom build flags

There may be some cases that require custom build flags to be used during build, such as compiling `redis` with `igbinary` compatibility (required i.e. when using Object Cache Pro on WordPress).

To build PECL modules with custom flags, you'll have to use the dense format as scope input:

```bash
cpcmd scope:set cp.bootstrapper pecl_extensions '["imagick","igbinary","zstd",'\''{"name":"redis","flags":"--enable-redis-igbinary --enable-redis-zstd","extension":"redis"}'\'']'
```

Specifically, the chosen configuration for the `redis` module is:

```json
{
	"name": "redis",
	"flags": "--enable-redis-igbinary --enable-redis-zstd",
	"extension": "redis"
}
```

This will result in `redis` being built with `igbinary` as a serializer, and `zstd` as a compression algorithm.

<Warning>

Escaping quotes can become elaborate very quickly. Refer to [original docs for guidelines](https://docs.apiscp.com/admin/PHP-FPM/#dense-extension-format) and pay maximum attention.

</Warning>

Once the extensions to be installed are defined, proceed with building the modules or rebuilding them if previously build:

```bash
upcp -sb php/install-extensions
upcp -sbf php/install-extensions # Force / rebuild
```
<Card title="Installing PHP modules" icon="book" color="#169c86" href="https://docs.apiscp.com/admin/PHP-FPM/#dense-extension-format">

Learn more about dense format option.

</Card>
