---
title: Logging subjects
tags:
  - postfix
  - mail
emoji: 🔎
---

Add a header check with a `WARN` disposition for subjects.

Edit `/etc/postfix/header_checks`. Add:

```
/^([Ss]ubject):/ WARN
```

Then update the database, `postmap /etc/postfix/header_checks`. Subjects will be logged by the cleanup daemon in `/var/log/maillog`.

```
Jan  8 12:06:35 jib postfix/cleanup[9584]: D833F2C1C5E: warning: header Subject: Earn a $25 statement credit after you spend $500 or more from mta3.member.americanexpress.com[136.147.130.158]; from=<bounce-21_HTML-62395388-1626587-7201782-591@bounce.member.americanexpress.com> to=<user@foo.com> proto=ESMTP helo=<mta3.member.americanexpress.com>
```