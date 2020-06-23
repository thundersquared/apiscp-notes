---
title: Unblocking addresses
tags:
  - firewall
emoji: 🔥
link: https://github.com/thundersquared/unblocking-addresses
---

`rampart:unban()` without an address unbans the connected client address in the following resolution order:

-  ENV: `APNSCP_CLIENT_IP`
- HTTP: `X-Forwarded-For` (requires [core] => http_trusted_forward)
- HTTP:`REMOTE_ADDR`
- ENV: `SSH_CLIENT`

```bash
# Check self is banned
cpcmd rampart:is-banned
# Unban self
cpcmd rampart:unban
# Get ban reason from fail2ban
cpcmd rampart:ban-reason
```

Problem fat-fingering passwords + dynamic IP? Use `cp.whitelist-access true` to always permit panel access even if banned. Only `rampart:blacklist` has precedence when set.

