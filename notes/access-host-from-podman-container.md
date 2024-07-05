---
title: Accessing Host from Podman Containers
tags:
  - postgres
  - database
  - podman
  - docker
  - network
emoji: 🐳
queries:
  - access host fom container
---

Accessing host resources and ports from a Docker/Podman container can be done in two ways:
- exposing the network on a host-level (using `--net host` param or similar);
- routing through gateway.

## Basic Gateway Routing

While exposing host ports for the container may be an easier choice, it's better to properly isolate it and use the gateway routing instead.

However, this will not work out-of-the-box as Postgres (or some other service) by default bind to localhost addesses only (`127.0.0.1, ::1`).

To overcome this, you can use `pgsql.remote-access` Scope to enable remote access to the service.

```bash
cpcmd scope:set pgsql.remote 1
```

<Warning>

Enabling remote access **will also impact your firewall rules** to do so, opening external access to the system.

</Warning>

## Better Gateway Routing

In the case of containers running on localhost, allowing remote access is most likely unneccessary and will only introduce other things to worry about such as the firewall.

A better solution in this case is to use the gateway routing, properly configuring target service and keeping it local.

In this case, Podman will publish a network similar to `10.89.0.1/24` where `.1` will be the host.

### Enabling Postgres Access

The first thing we need to do is whitelist `10.89.0.1/24` network for users accessing Postgres, by editing our `pg_hba.conf` adding the following lines:

```txt
# nano /var/lib/pgsql/16/data/pg_hba.conf
host    all             all             10.89.0.1/24            trust
host    replication     all             10.89.0.1/24            trust
```

### Binding to Podman Network

We can now add `10.89.0.1` to the list of addresses Postgres will bind to.

```bash
cpcmd scope:set cp.bootstrapper pgsql_bind_address '127.0.0.1, ::1, 10.89.0.1'
```

<Warning>

**`pgsql_bind_address` requires a string**, so the value passed to the scope shoul be **a comma-separated list as a string**.

</Warning>

We now need to apply the changes by invoking a Postgres reconfiguration via Ansible, to write the new bind definition on the config file and restart the process, including our `pg_hba.conf` changes.

```bash
upcp -sb pgsql/install
```

After playbooks completes all actions, Podman containers will be able to access Host Postgres via:
- `host.containers.internal:5432`
- `host.docker.internal:5432`
