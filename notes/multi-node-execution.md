---
title: Multi-node commands
tags:
  - ansible
  - playbook
  - multi-host
  - inventory
emoji: 🕸
---

To quickly run commands across a pool of nodes, you can take advange of Ansible and build a local inventory bringing command execution across nodes.

## Inventory

Start by creating your local project folder.

```bash
mkdir panel-management
cd panel-management
```

Then you can build your `inventory.yml` as follows:

```yaml
---
all:
  hosts:
    web1.example.com:
    web2.example.com:
    web3.example.com:
    web4.example.com:
    web5.example.com:
    web6.example.com:
  vars:
    ansible_user: 'root' # Works, but you can *try* unprivileged users too
    ansible_ssh_private_key_file: '~/.ssh/id_ed25519' # Path to your SSH identity for password-less access

```

<Note>

[Create an identity](https://www.ssh.com/academy/ssh/keygen) and [use `ssh-copy-id`](https://www.ssh.com/academy/ssh/copy-id) to distribute your pubkey across your nodes. Not using key-based authentication will result in Ansible **asking for a password** at each command invokation.

</Note>

<Card title="Ansible inventory parameters" icon="toolbox" color="#5bbdbf" href="https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters">

Learn more about customizing your inventory parameters.

</Card>

## Ansible configuration

At this point, you'll have to manually tell `ansible` which inventory file to use like so:

```bash
ansible all -i inventory.yml -m ping
```

Avoid this by changing the default configuration in `ansible.cfg` as follows:

```ini
[defaults]
inventory = inventory.yml

# optional
[ssh_connection]
transfer_method = scp

```

You should now be able to omit `-i inventory.yml` as follows:

```bash
ansible all -i inventory.yml -m ping
```

## Shell shortcut

You can create a function for your shell to automatically execute ansible command in this context, sending a shell command to your nodes.

In your `~/.functions` file or in your shell's profile (it be `.bash_profile`, `.bashrc`, `.zprofile`, `.zshrc`) add the following snippet, **changing the path** to your above created project folder:

```bash
function apiscps() {(                                                   
  cd /path/to/panel-management # <- change this
  echo "ansible all -m shell -a $@"
  ansible all -m shell -a "$@"
)}
```

<Note>

An absolute path is preferred—run `readlink -f .` to get your current absolute path, then copy-paste it as needed in the function above.

</Note>

<Tip>

If you don't have one, you can create a `~/.functions` file then source it in your shell's profile with `source ~/.functions`.

</Tip>

You should now be able to source your profile again, and run commands across nodes as follows:

```bash
source ~/.functions
# or your shell
# source ~/.bashrc
apiscps 'uname -a'
```

<Warning>

The command to be run by ansible **has to be a string** which mean that **all quotes have to be escaped**, or it won't work.

</Warning>

```bash
# Get all panels' version
apiscps 'cpcmd misc:cp_version'

# Query bord status
apiscps 'borgmatic info'

# Escape quoted values
apiscps "cpcmd scope:set cp.nightly-updates 'Mon..Fri 20:00'"

#Shell interpolation
apiscps 'dnf remove $(rpm -qa kernel-ml)'
```