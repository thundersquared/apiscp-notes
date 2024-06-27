---
title: Local Development on ARM based Macs
tags:
  - development
  - mac
emoji: 💻
---

1. Install [UTM](https://mac.getutm.app/)
2. Set up an **emulated** x86 Rocky Linux 8 VM with UTM & QEMU. ([You can loosely follow along here](https://docs.getutm.app/basics/basics/))
3. Set Networking to Emulated VLAN and port forwarded the following ports via TCP:
   
| VM Port | Forwarded Port |
| ------- | -------------- |
| 22      | 2222           |
| 2082    | 2082           |
| 2083    | 2083           |

5. Enter the shell of your VM with `ssh root@localhost -p 2222` and [install and configure Apiscp as you would normally](https://docs.apiscp.com/INSTALL/#bootstrapper).
6. Login via [http://localhost:2082](http://localhost:2082)

## Additional Tips
If using VIM or Neovim, you can edit apiscp directly by:
1. Copying your keys over to your vm: `ssh-copy-id -p 2222 root@localhost`
2. Starting neovim/vim in scp mode for NetRW `nvim scp://root@localhost:2222//usr/local/apnscp/` or `vim scp://root@localhost:2222//usr/local/apnscp/`
