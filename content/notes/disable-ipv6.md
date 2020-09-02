---
title: Disabling IPv6
tags:
  - network
emoji: 🔌
---

IPv6 may be managed using `sysctl`:

```bash
cat - > /etc/sysctl.d/ipv6-disable.conf <<EOF
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
EOF

sysctl --system
```

Confirm IPv6 unbound,

```bash
ip -6 addr
# Reports empty
```

Regenerate all configuration,

```bash
upcp -sb
```