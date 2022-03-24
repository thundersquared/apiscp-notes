---
title: Install Podman
tags:
  - podman
  - docker
  - containers
emoji: 🦭
queries:
  - how to install podman
  - how to install docker
---

Podman is the supported drop-in replacement for RHEL 8+.

To install Podman, run the following commands:

```bash
dnf install -y podman
/usr/local/apnscp/bin/scripts/yum-post.php install -d podman siteinfo
systemctl reload fsmount
```

In order for containers to keep running, you need to (tell systemd to linger your user)[https://unix.stackexchange.com/a/403386/187291]:

```bash
loginctl show-user <user> --property Linger
loginctl enable-linger <user>
```
