---
title: Apache2 tips and tricks
tags:
  - apache2
  - websockets
emoji: 🦅
---

These are some of the most useful .htaccess rules you'd need.

## Rules

Enable caching
```
UnsetEnv no-cache
```

Prevents page not found on vanilla installs
```
DirectoryIndex disabled
```

Redirect HTTP to HTTPS
```
RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R,L]
```

Proxy websocket requests
```
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteRule ^ ws://127.0.0.1:40001%{REQUEST_URI} [P,L]
```
> Note that 40001 is the port your app is listening to locally.

Proxy generic HTTP requests
```
RewriteRule ^ http://127.0.0.1:40001%{REQUEST_URI} [P,L,QSA]
```
> Note that 40001 is the port your app is listening to locally.

Using results in RewriteRules
```
RewriteRule ^(.*)$ http://127.0.0.1:40001/api/$1 [P,L,QSA]
```
> Note that a request to `/example` will be proxied to `http://127.0.0.1:40001/api/example`.

## Usage

Here's an example of a fully fledged .htaccess proxying HTTP and WebSocket requests to a service **exposed locally** on port 40001:

```
DirectoryIndex disabled
UnsetEnv no-cache
RewriteEngine On

# Redirect HTTP to HTTPS
RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R,L]

# Proxy websocket requests
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteRule ^ ws://127.0.0.1:40001%{REQUEST_URI} [P,L]

# Proxy generic HTTP requests
RewriteRule ^ http://127.0.0.1:40001%{REQUEST_URI} [P,L,QSA]
```
