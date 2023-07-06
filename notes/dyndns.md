---
title: DynDNS
tags:
  - dns
  - api
emoji: 🦙
---

DynDNS can be used by periodically calling `dns:update($hostname, $ip = null)`. `$hostname` may be "home.example.com", which will be decomposed into subdomain/domain automatically. If $ip is omitted, `REMOTE_ADDR` is used.
