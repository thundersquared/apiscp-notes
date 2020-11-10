---
title: Pulled back packages
tags:
  - yum
emoji: 🐶
---

It may occur for some repositories to pull back a package. It's a problem with maintainers and **can alert you of potential issues**.

When that happens, you may receive notifications such as the following:

```
/etc/cron.hourly/0yum-hourly.cron: 

Not using downloaded mariadb/repomd.xml because it is older than what we have: 
Current : Sat Nov 7 01:11:35 2020 
Downloaded: Tue Nov 3 16:06:32 2020 
```

To fix this you should assess the state of the repository, then simply clean `yum`'s cache to avoid receiving a ton of notifications.

```bash
yum clean all
```
