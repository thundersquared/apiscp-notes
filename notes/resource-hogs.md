---
title: Locating resource hogs
tags:
  - cgroups
  - resources
emoji: 🐷
---

## CPU/memory

`systemd-cgtop` provides a top-like interface for all control groups. Processes spawned within the context of a site are governed by resource limits assigned in `cgroup` service class.

| Hotkey | Sort field        |
| ------ | ----------------- |
| m      | Memory            |
| c      | CPU               |
| t      | Tasks (PID count) |

## Per process

Run `top`. Behaves similarly to `systemd-cgtop`.

| Hotkey    | Sort field      |
| --------- | --------------- |
| shift + M | Memory          |
| shift + P | CPU             |
| shift + T | Cumulative time |

## Bandwidth

`admin:get-usage('bandwidth')` returns bandwidth for all sites in their respective usage periods. `jq` can be used to sort output.

```bash
# Sort bandwidth by sum of in + out
cpcmd -o json admin:get-usage bandwidth | jq 'to_entries | sort_by(.value.sum)'
```

## Storage

```bash
repquota -g $(findmnt -no SOURCE --target /home/virtual) | sort -n --key=3
```

If on a single mount, `$(...)` can be replaced with `/` or to report quotas for all mounts, using `-a`.

`admin:get-usage('storage')` works similarly as the bandwidth example above.

```bash
# Sort bandwidth by sum of in + out
cpcmd -o json admin:get-usage storage | jq 'to_entries | sort_by(.value.qused)'
```

`qused` is storage blocks used in 4 KB units. `fused` is inode usage.
