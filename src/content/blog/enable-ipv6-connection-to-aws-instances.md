---
publishDate: "2024-04-17"
title: Enable IPv6 connection to AWS instances
---

I was planning to create an AWS instance to host my new project - Signals Talk. I noticed AWS is going to [charge for public IPv4 addresses](https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/). On AWS Lightsail, IPv4 instances will be [$2-$4 more expensive](https://aws.amazon.com/blogs/compute/announcing-ipv6-instance-bundles-and-pricing-update-on-amazon-lightsail/) than IPv6-only instances. I decided to try and get an IPv6-only instance working for my application.

IPv6 only networking type is only selectable for Operation System (OS) only blueprint. So I chose Ubuntu 22.04 LTS. Also note that browser-based SSH client is not available - that means I will have to SSH from my local laptop. There’s another note: “An IPv6-only instance cannot be the origin for a distribution”, which does not affect my application.

After the instance is running, I tried SSH from my local:

```bash
$ ssh -i [secret.pem] ubuntu@[ipv6_address]
... No route to host
```

“No route to host”!? I wondered what that means… I searched around and suspected something’s not quite right in my setup. I went to [https://test-ipv6.com](https://test-ipv6.com/) and voila - I do not have an IPv6 address!

![test-ipv6-error](/test-ipv6-error.png)

The last green check says my DNS server appears to have IPv6 internet access, so then I looked into my router (TP-Link Archer A7) configuration - Indeed IPv6 was enabled but **Internet Connection Type** was not selected! So I selected Dynamic IP (SLAAC/DHCPv6), got an IPv6 address, and hit **Save**.

![router-ipv6-configuration](/router.png)

I tested again at [https://test-ipv6.com](https://test-ipv6.com/), this time scoring 10/10!

![test-ipv6-success](/test-ipv6-success.png)

I tested SSH again and connected successfully. Similar to IPv4 connections, adding the following configuration to `~/.ssh/config` also works:

```bash
Host myinstance
Hostname [IPv6 Address]
User ubuntu
IdentityFile [secret.pem]
```

Now I can get on with installing my application on the IPv6-only instance. 🙂
