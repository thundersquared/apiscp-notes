---
title: Apache tips and tricks
tags:
  - apache
  - rewriterules
  - websockets
emoji: 🦅
outline: deep
---

These are some of the most useful .htaccess rules you'd need.

## Rules

Enabling RewriteEngine and setting RewriteBase
```
RewriteEngine On
RewriteBase /
```

<Warning>

Setting the RewriteBase **is required** due to rule inheritance with synthetic addon domains and subdomains. [Learn more here](https://github.com/apisnetworks/httpd-apache/blob/master/SOURCES/httpd-apnscp-rewrite-map.conf)

</Warning>

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
RewriteCond %{HTTP:Upgrade} =websocket [NC]
RewriteCond %{HTTP:Connection} =upgrade [NC]
RewriteRule ^ ws://127.0.0.1:40001%{REQUEST_URI} [P,L]
```
<Note>Note that 40001 is the port your app is listening to locally.</Note>

Proxy generic HTTP requests
```
RewriteRule ^ http://127.0.0.1:40001%{REQUEST_URI} [P,L,QSA]
```
<Note>Note that 40001 is the port your app is listening to locally.</Note>

Using a match result in a RewriteRule
```
RewriteRule ^(.*)$ http://127.0.0.1:40001/api/$1 [P,L,QSA]
```
<Info>

A request to `/example` will be proxied to `http://127.0.0.1:40001/api/example`.

</Info>

## Usage

Here's an example of a fully fledged .htaccess proxying HTTP and WebSocket requests to a service **exposed locally** on port 40001:

```
DirectoryIndex disabled
UnsetEnv no-cache

RewriteEngine On
RewriteBase /

# Redirect HTTP to HTTPS
RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R,L]

# Proxy websocket requests
RewriteCond %{HTTP:Upgrade} =websocket [NC]
RewriteCond %{HTTP:Connection} =upgrade [NC]
RewriteRule ^ ws://127.0.0.1:40001%{REQUEST_URI} [P,L]

# Proxy generic HTTP requests
RewriteRule ^ http://127.0.0.1:40001%{REQUEST_URI} [P,L,QSA]
```
