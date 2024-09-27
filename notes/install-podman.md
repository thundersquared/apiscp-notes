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

<Warning>

Podman interferes with typical ApisCP behaviour, changing firewall rules to accomodate container routing definitions.

A side-effect of this behaviour manifests with containers becoming unresponsive when accessing exposed ports form the host or outside world, as firewall rules are refreshed on the panel's side efectively removing Podman-added rules.

Docker is a preferred alternative in this case.

</Warning>

Podman is the supported drop-in replacement for RHEL 8+.

To install Podman, run the following commands:

```bash
dnf install -y podman
/usr/local/apnscp/bin/scripts/yum-post.php install -d podman siteinfo
systemctl reload fsmount
```

In order for containers to keep running, you need to [tell systemd to linger your user](https://unix.stackexchange.com/a/403386/187291):

```bash
loginctl show-user <user> --property Linger
loginctl enable-linger <user>
```
