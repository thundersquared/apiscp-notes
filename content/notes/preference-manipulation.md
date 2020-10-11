---
title: Preference manipulation
tags:
  - api
  - cpcmd
emoji: 🗳️

---

```php
common_load_preferences(): array;
common_save_preferences(array $prefs): bool;
```

Masquerade as a specific site (`-d domain`) and/or user (`-u user`) to retrieve the user preferences as JSON (`-o format`). Manipulate using `jq`, then save the preferences back declaring source input format (`-i format`) as JSON. 

```bash
# jq isn't always installed
yum install -y jq
# set nexus.notify-create value to 1
cpcmd -i json common:save-preferences "$(cpcmd -o json common:load-preferences | jq -r '.nexus["notify-create"]=1')"
```
It's also possible to use PHP's serialize (`serialize()`/`unserialize()`) if the format is changed from `json` to `serialize`. 

```bash
cpcmd -i serialize common:save-preferences "$(cpcmd -o serialize common:load-preferences | php -r '$prefs = unserialize(file_get_contents("php://stdin")); $prefs["nexus"]["notify-create"] = 1; echo serialize($prefs);')"
```

However it's clear to see JSON has its terse advantages.

## See also

- [Collections](https://docs.apiscp.com/admin/cpcmd-examples/#collections), covers `jq` examples (docs.apiscp.com)
- [jq Tutorial](https://stedolan.github.io/jq/tutorial/) (stedolan.github.io)

