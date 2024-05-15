---
publishDate: "2024-04-17"
title: Installing Ghost on IPv6-only server
---

In general, the [Ghost official installation guides](https://ghost.org/docs/install/) are pretty good. Here are the key changes to make it work on an IPv6-only server:

1. Instead of creating an A record pointing your domain to the server’s IPv4 address, create an AAAA record pointing to your server’s IPv6 address.
2. `ghost install` requires accessing several [github.com](http://github.com) endpoints, which do not support IPv6 yet. GitHub is [working on it](https://www.githubstatus.com/incidents/5y8b8lsqbbyq). Until GitHub officially supports IPv6, here’s the workaround: add the following entry to `/etc/hosts` on the sever before running `ghost install` :
    
    ```bash
    2a01:4f8:c010:d56::2 github.com
    2a01:4f8:c010:d56::3 api.github.com
    2a01:4f8:c010:d56::4 codeload.github.com
    2a01:4f8:c010:d56::5 objects.githubusercontent.com
    2a01:4f8:c010:d56::6 ghcr.io
    2a01:4f8:c010:d56::7 pkg.github.com npm.pkg.github.com maven.pkg.github.com nuget.pkg.github.com rubygems.pkg.github.com
    ```
    
    The IPv6 proxy server is provided by [Daniel Winzen](https://danwin1210.de/github-ipv6-proxy.php) 🙏!
    
3. `ghost setup ssl` will fail. Instead, follow the [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=pip) guide to provision and auto-renew SSL certificate. Note: `nginx` on `Ubuntu 20` combo does not work on IPv6 because the [snap store APIs do not support IPv6](https://bugs.launchpad.net/snapstore-server/+bug/1710022).
