---
publishDate: 2009-10-05T00:00:00
title: 无聊.搞定awesome-git
---

无聊自虐… 小hunt放假在折腾dr.com…不跟我玩… 无聊死决定捣鼓下awesome-git。
其实以前也试过，只是当时没时间认真看配置，就抛弃了。 这次比较成功哈哈。
git下来后，用上自带的zenburn theme，然后开始改rc.lua，主要是参照anrxc的
[rc.lua](http://git.sysphere.org/awesome-configs/tree/rc.lua)
，还用了好方便的 [obvious
widgets](http://awesome.naquadah.org/wiki/Obvious)
，现在感觉有用的widget只有volume control 和
battery了。在默认的rc.lua的基础上，要customize的如下：

-   tags & layouts
-   widgets(obvious)
-   keybindings for certain applications
-   app rules(auto-tagging/floating/…)
-   autostart
-   remove gaps at the bottom

My new rc.lua is 200 lines shorter than the old one, primarily because
obvious is such a foolproof widget library, u just require the widget
and add it to ur wibox; and secondly app rules provide a table to
specify settings for each app, saving lots of lines.

[![screenshot](http://u1.ipernity.com/12/92/47/6189247.6e739712.500.jpg)](http://www.ipernity.com/doc/sychopx/6189247)

my
[rc.lua](http://dl.getdropbox.com/u/444191/app/awesome/awesome-git/rc.lua)
(sorry don’t know how to git)

