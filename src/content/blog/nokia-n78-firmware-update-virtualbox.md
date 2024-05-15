---
publishDate: 2009-09-01T00:00:00
title: Nokia N78 在 VirtualBox 下成功刷机
---

艰难啊！

上一次刷机大约是2月份左右，本想刷出FM，未果，只修正了music
library的刷新问题。

这次本想在vista下刷，Nokia PC Suite 和NSS都安装好了，用NSS
scan的时候总是error，可能是上次刷机未果的后遗症(后来发现NSS不支持FP2的机型)。不爽之下决定在VirtualBox的xp试下。奇怪的usb总是用不了，害我重装了VirtualBox，总结一下关键在于fstab和新建一个empty
filter…

刷机前先用PC Suite backup，刷机过程参考了：

[凤凰刷机2009教程](http://www.dos60.com/thread-377-1-1.html)

[诺基亚刷机\_凤凰刷机工具2008详细教程](http://www.shuaji.net/sjjc/nokia/2009/121/091829G78AFE5G5K40GI_2.shtml)

用的Firmware是

[N78 RM-235 APAC 30.011 V7.0](http://www.dos60.com/thread-97-1-2.html)

刷机成功，出现FM transmitter 的菜单，可是music library
的刷新问题又出现了，想用PC Suite的Nokia Music看看，竟然装不上…..

额…不管Music
Manager了，原来把存储卡里乱码的目录删了就能正常刷新…搞定哈哈

