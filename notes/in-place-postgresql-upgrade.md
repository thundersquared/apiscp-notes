---
title: In-place PostgreSQL upgrade
tags:
  - postgres
  - database
  - systemd
emoji: 🐘
queries:
  - in-place postgres upgrade
---

<Warning>

WIP: this is a **draft guide**. Make sure you know what you're doing before following this guide as **it's NOT a supported procedure**.

</Warning>


<Warning>

This procedure is **highly discouraged** as it may lead to serious data loss. Upgrades are one-way procedures. PostgreSQL upgrades are significantly more challenging than MariaDB/MySQL upgrades.

</Warning>

<Note>

Take advantage of the [zero downtime migration tool](https://docs.apiscp.com/admin/Migrations%20-%20server/#migration-components) to get those sites over that need the newer PostgreSQL release while evaluating the impact it can have.

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
# Change this to new PostgreSQL major version
PG_TO_VERSION="16"

# Auto-discover old PostgreSQL version
PG_FROM_VERSION="$(echo "SELECT CAST(setting AS integer) / 10000 FROM pg_settings WHERE name = 'server_version_num';" | psql -tA template1)"
PG_UPGRADE_TIME=$(date +%F-%T)
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"

# XXX XXX XXX XXX XXX
# XXX  IMPORTANT  XXX
# XXX XXX XXX XXX XXX
# 
# Optionally perform a backup of all databases
# Any failure at this step will also result in a failure with pg_upgrade
pg_dumpall > "/home/pg-all-$PG_UPGRADE_TIME.sql"

# Set new Postgres version
cpcmd scope:set cp.bootstrapper pgsql_version "$PG_TO_VERSION"

# Temporarily disable Monit, old PostgreSQL service
systemctl stop monit.service postgresql-${PG_FROM_VERSION}.service postfix.service

# Clear old PostgreSQL release metadata
rpm -e pgdg-redhat-repo

# Install new packages
upcp -sbf packages/install pgsql/install

# XXX XXX XXX XXX XXX
# XXX  IMPORTANT  XXX
# XXX XXX XXX XXX XXX
#
# TimescaleDB extension must match previous version!
dnf install -y "timescaledb-2-postgresql-${PG_TO_VERSION}-$(rpm -q --queryformat="%{VERSION}" timescaledb-2-postgresql-${PG_FROM_VERSION})"

# Remove "root" created during upcp routine
sudo -u postgres dropuser root

# Stop new cluster
systemctl stop postgresql

# cwd requires read-write permissions for user postgres
cd /tmp

# Perform actual database migration
sudo -u postgres -- /usr/pgsql-$PG_TO_VERSION/bin/pg_upgrade -b /usr/pgsql-$PG_FROM_VERSION/bin -B /usr/pgsql-$PG_TO_VERSION/bin -d /var/lib/pgsql/$PG_FROM_VERSION/data -D /var/lib/pgsql/$PG_TO_VERSION/data -j "$(nproc)"

# Restore any failed services
systemctl reset-failed

# Start Monit service again, Postfix + panel frontend will be restarted next check
systemctl start monit.service

# Remove backup if things look good
rm -f "/home/pg-all-$PG_UPGRADE_TIME.sql"

# Remove old database RPMs
rpm -qa | grep -E "postgresql-?${PG_FROM_VERSION}\\b" | xargs -t rpm -e

# Finally, purge old data directory
rm -rf "/var/lib/pgsql/${PG_FROM_VERSION}/{data,initdb.log}"
```

<Warning>

In case anything goes wrong, **after switching back version and reinstalling packages**, you can try restoring the databases with the following command: `psql --clean -f "/home/pg-all-$PG_UPGRADE_TIME.sql" postgres`

</Warning>
