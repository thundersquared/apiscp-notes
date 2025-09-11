---
title: In-place MariaDB upgrade
tags:
  - mariadb
  - database
  - systemd
emoji: 🦭
queries:
  - in-place mariadb upgrade
---

<Warning>

This procedure is **highly discouraged** as it may lead to serious data loss.

</Warning>

<Note>

Take advantage of the [zero downtime migration tool](https://docs.apiscp.com/admin/Migrations%20-%20server/#migration-components) to get those sites over that need the newer MariaDB release while evaluating the impact it can have.

</Note>

<Warning>

If you still chose to proceed with an in-place migration, **make sure your data is backed up before proceeding.**

</Warning>

## Checklist
- [ ] Set maintenance window
- [ ] upcp -sb 1 hour before maintenance, to make sure everything works
- [ ] Do all steps in exact order
- [ ] Take notes on behaviour


## Procedure

```bash
# Temporarily disable Monit
systemctl stop monit.service

# Set new MariaDB version
cpcmd scope:set cp.bootstrapper mariadb_version "10.11"

# Make a copy of the repo definition
mysql --version
cat /etc/yum.repos.d/mariadb.repo
mv /etc/yum.repos.d/mariadb.repo{,.bak}

# Install new MariaDB version
upcp -sb

dnf update -y

# Perform a backup of all databases
mysqldump --opt --all-databases --routines --events -r /home/all-$(date +%F-%T).sql

# Stop MariaDB service
systemctl stop mariadb.service

# Look up newest MariaDB-server version, and install it
rpm -e $(rpm -qa | grep -i '^MariaDB-server')
dnf install MariaDB-server-10.11.2-1.el8.x86_64 -y

# Fix logs permissions
chown mysql /var/log/mysql

# Start MariaDB service again
systemctl start mariadb.service

# Perform the upgrade using MariDB's utility
mysql_upgrade
mysql_upgrade -f -k --upgrade-system-tables

# Make sure the service is properly running
systemctl status mariadb.service
```
