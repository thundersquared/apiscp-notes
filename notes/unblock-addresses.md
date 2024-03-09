---
title: Unblocking addresses
tags:
  - firewall
  - network
emoji: 🔥
queries:
  - how to unblock ip
  - use rampart to whitelist your ip
  - how to unban ip
---

`rampart:unban()` without an address unbans the connected client address in the
following resolution order:

| Layer | Variable                                                    |
| ----- | ----------------------------------------------------------- |
| ENV   | `APNSCP_CLIENT_IP`                                          |
| HTTP  | `X-Forwarded-For` (requires [core] => http_trusted_forward) |
| HTTP  | `REMOTE_ADDR`                                               |
| ENV   | `SSH_CLIENT`                                                |

```bash
# Check self is banned
cpcmd rampart:is-banned
# Unban self
cpcmd rampart:unban
# Get ban reason from fail2ban
cpcmd rampart:get-reason
```

All commands above can be also run against a specific IP e.g.
`cpcmd rampart:is-banned 1.2.3.4`.

Problem fat-fingering passwords + dynamic IP? Use `cp.whitelist-access true` to
always permit panel access even if banned. Only `rampart:blacklist` has
precedence when set.

## Temporarily whitelist IP for inbound email

Temporarily whitelisting a blocked IP (i.e.: listed at spamcop.net) can be achived by adding the IP to `/etc/postfix/postscreen_access.cidr`, either IP or in CIDR notation (`1.2.3.4/24`), then applying via `postmap`:

```bash
postmap /etc/postfix/postscreen_access.cidr
```
