---
title: Additional appliance admins
tags:
  - user
emoji: 👥
---

Appliance administrators are stored in `/etc/opcenter/webhost/passwd` using a shadow-like format.

Duplicate the existing line, change the first colon-delimited value. This field is the username. Next run `cpcmd -u NEWUSER auth:change-password 'NEWPASSWORD'` to update this new user's password.

Only 1 email address may be configured as admin. If multiple contacts are desired then this email should be an alias that forwards to multiple email addresses.
