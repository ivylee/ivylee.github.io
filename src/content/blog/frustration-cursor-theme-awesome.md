---
publishDate: 2009-10-07T00:00:00
title: Frustration! 纠结！
---

满心欢喜地怂恿小hunt用awesome-git，被问到鼠标问题解决没，额…

话说用了awesome，xcursor theme一直很怪，具体症状如下：

-   在qt程序中十分正常
-   在xterm正常
-   在gtk程序中，只在某些区域正常
-   除上述情况，xcursor 总是原始状态，简陋的小黑

为了解决鼠标主题问题，努力google，找到的基本上是安装配置xcursor
theme的方法，在
[archwiki](http://wiki.archlinux.org/index.php/X11_Cursors "X11 Cursors")
里已经讲得很详细了。无非就是解压放到.icons/或/usr/share/icons/，然后在.Xresources里指定，再在.xinitrc里调用.Xresources，最多再ln
-s一下设成default，gtk的在gtkrc-2.0里加一句gtk-cursor-theme-name =
“theme\_name”…

神啊！为什么我弄来弄去还是原样呢…告诉我这是个BUG，让我死心吧…

