---
title: Tips on Cloning WordPress
tags:
  - wordpress
  - php
  - wp-cli
emoji: 📰
link: https://developer.wordpress.org/cli/commands/search-replace/
---

- Test first to see what you're going to do: **always** run the commands with `--dry-run` first.

- Make sure to update old to new domain. The following command is a bit slower than argument-less alternative, but will use PHP and should give you better results.
  ```bash
  wp-cli search-replace olddomain.com newdomain.com --precise --skip-columns=guid
  ```

- Update all paths to your new WordPress root for all plugins that do store such _constant_.
