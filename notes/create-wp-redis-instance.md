---
title: Create Redis instance for WordPress
tags:
  - cpcmd
  - wp-cli
  - redis
  - cache
  - wordpress
emoji: 📰
---

Here's a step-by-step copy-paste tutorial:

```bash
# Create a new Redis instance for benchmark.test named "wp-test" listening on /tmp/redis.sock
cpcmd -d benchmark.test redis:create wp-test '[unixsocket:/var/www/redis.sock,unixsocketperm:0660]'

# Switch to benchmark.test account to configure plugin
su benchmark.test
cd /var/www/html

# Install Redis object cache plugin
wp-cli plugin install --activate redis-cache

# Define Redis path
wp-cli config set WP_REDIS_SCHEME unix
wp-cli config set WP_REDIS_PATH /var/www/redis.sock

# Enable Redis plugin
wp-cli redis enable
# Verify it is running
wp-cli redis status
```

Should you need to delete an existing Redis instance, you can go with:

```bash
cpcmd -d benchmark.test redis:delete wp-test
```

Optionally have some fun:

```bash
# Define key for site
wp-cli config set WP_CACHE_KEY_SALT benchmarktest

# Enable igbinary serializer
wp-cli config set WP_REDIS_IGBINARY true --raw

# Disable plugin banners
wp-cli config set WP_REDIS_DISABLE_BANNERS true --raw
```

Looking for installing `igbinary` PECL module? [Learn how here ↗](/install-php-pecl-modules)
