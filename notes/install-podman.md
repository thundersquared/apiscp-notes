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

<Error>

Podman interferes with typical ApisCP behaviour, changing firewall rules to accomodate container routing definitions.

</Error>

<Note>

A side-effect of this behaviour manifests with containers becoming unresponsive when accessing exposed ports form the host or outside world, as firewall rules are refreshed on the panel's side efectively removing Podman-added rules.

</Note>

<Warning>

Docker is a preferred alternative in this case.

</Warning>

## Installing Podman

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

## Switching from Podman back to Docker

Switching back is quite an easy process:

```bash
# Remove podman or other docker-related packages
dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine podman runc

# Add Docker CE repo
dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo

# Install docker-ce package
dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Stop unit for reconfiguration
systemctl stop docker

# Fix ExecStart definition with a unit override
mkdir -p /etc/systemd/system/docker.service.d
cat << EOF > /etc/systemd/system/docker.service.d/override.conf
[Service]
# This clears any ExecStart= inherited from docker.service
ExecStart=
ExecStart=/usr/bin/dockerd --containerd=/run/containerd/containerd.sock
EOF

# Reload systemd daemon
systemctl daemon-reload

# Docker group should be created by default, but just in case
groupadd --system docker

# Allow docker to be accessible under /.socket
echo -e '{\n\t"hosts": ["unix:///var/run/docker.sock", "unix:///.socket/docker.sock"],\n\t"group": "docker"\n}' > /etc/docker/daemon.json

# Enable and start the unit
systemctl enable --now docker

# Check if this returns an empty list of containers. If it returns an error, investigate.
docker ps
```

<Check>

If you have systemd-backed container definitions you will need to recreate containers in Docker via `docker run` or `docker-compose`.

</Check>
