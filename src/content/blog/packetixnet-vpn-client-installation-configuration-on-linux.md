---
publishDate: 2009-10-31T00:00:00
title: PacketiX.NET Vpn Client Installation & Configuration on Linux
---

嗯…huntxu又说我无聊乱折腾了…

为啥突然想起来捣鼓vpn呢？想起来的确很无聊，只是为了用上twitterfeed post
to facebook的功能…之前用gapp/your-freedom/opera
mini都没成功，极度不爽，翻过强了竟然还有不能做的事?!
不死心，决定试下vpn。

以前用过hotspot
shield，挺好。可是我在学校用不了校园网的时候，白痴地把机器抱去网络中心，光头老师发现了我的虚拟网卡，卸掉了hotspot
shield…我后悔去了。在学校，上网有问题，一定不能找网络中心的人。

so I googled and found this [japenese
vpn](http://www.packetix.net/en/secure/install/) . one of the important
feature of PacketiX.NET vpn is that it supports ssl, and it doesn’t
require registration.

在win7下安装顺利+使用顺利+网速比之前用过的翻墙工具快+成功设置了twitterfeed…
因此想试试在linux下配置。

so I googled again and found
[this](http://wan.pengganas.net/entry/packetix-net-vpn-installation-on-linux/)
recent post from which I stoled the title, sorry about that.
[官方manual](http://www.plathome.com/products/packetix/manual/html/7-3.htm)
也有说到如何在linux下安装，可配置没讲清楚(我没看明白)…

参考了以上文章，下面列出安装与配置该client的具体步骤(很具体):

-   when using ur default connection, mark down/memorize ur dns
    server(cat /etc/resolv.conf)
-   head to [official
    website](http://www.packetix.net/en/secure/install/) (not blocked)
    to download the linux package and an exported connection setting
    file (secure.vpn)
-   tar the package, cd to the directory and mv secure.vpn here
-   su and make (if failed, check dependencies)
-   ./vpnclient start
-   ./vpncmd, choose 2.Management of VPN client, when prompted “Input
    destination”, enter localhost. now ur connected to VPN client
-   (updated) KeepSet /HOST:keepalive.se2.softether.com:80 /PROTOCOL:tcp
    /INTERVAL:50 then KeepEnable /\*actually after I wrote this little
    post I tested again according to the procedure I laid out here and
    BANG! the connection broke down. I was frustrated after many failed
    attempts. when I looked into the log fies and compared them with
    those generated in win, I learned that the essential element of
    successful connection is the Keep-Alive function which is not
    enabled by default in linux version. we have to manually enable
    keepalive using configuration
    [here](http://www.plathome.com/products/packetix/manual/html/3-3.htm#vpn_3_3_13)
    to guarantee a continuous connection to the vpnserver\*/
-   AccountImport secure.vpn, then AccountList to confirm
-   AccountConnect secure, AccountList to confirm connection
-   open another terminal, su and ifconfig to confirm vpn\_vpn(or
    something like it) is there
-   dhclient vpn\_vpn to get ip, ifconfig vpn\_vpn to confirm
-   cat /etc/resolv.conf to see change of dns, u may wan to cat
    /proc/net/route
-   now u can surf freely

to disconnect:

-   in Management of VPN Client mode,  AccountDisconnect secure
-   quit Management of VPN Client mode, ./vpnclient stop
-   modify /etc/resolv.conf as superuser to change dns back to the
    original(u marked down/memorized)
-   ifconfig and cat to re-check everything, then ur done

official manual provides a script to set vpnclient as daemon but I don’t
think that’s necessary for me. I do everything in the directory
vpnclient as superuser. the steps above may still be unclear though I
tried my best, u see that I’m just a linux newbie…

