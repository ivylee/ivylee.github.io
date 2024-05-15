---
publishDate: 2009-08-10T23:52:00
title: Awesome 3.3.1!
---

第一次接触tiling…

装awesome 3.3.1的过程还好，因为找到个
[ppa](https://launchpad.net/~akos-ladanyi/+archive/ppa "ppa for awesome 3.3.1")
(for ubuntu 9.04 & 9.10)

装完之后痛苦了….

建立两个文件：.xinitrc & .xsession to use awesome with gnome

编辑rc.lua & theme.lua

一定要仔细看 [awesome wiki](http://awesome.naquadah.org/wiki/Main_Page)
，因为里面一些example适用于旧版本的awesome，据说awesome更新喜欢用新语言（3.x是lua）写配置文件，郁闷得很….有个
[中文笔记](http://confusedfly.yo2.cn/articles/tag/awesome)
（貌似唯一的）适合学习， [ubuntu
wiki](http://wiki.ubuntu.org.cn/Awesome) 上是同一个人写的，连贯性较好

折腾了两天，没啥进展，截图如下 [![awesome
3.3.1](http://u1.ipernity.com/12/26/54/5492654.0bb52cd7.500.jpg)](http://www.ipernity.com/doc/sychopx/5492654)
要注意的是改变theme文件（夹）路径时要及时更改两个配置文件中的path。我的Mod4+ctrl+r无法restart
awesome…只能在menu里按restart(bug?)…如果重新进x发现awesome不正常，记得ctrl+alt+f1看.xsession-errors；awesome
-k file只能检查设置文件的明显的syntax error，基本没啥用…

好习惯：每次修改完rc.lua restart awesome之前backup
–\>rc.lua\~，若awesome不正常，ctrl+alt+f1 用备份文件restore rc.lua

好在3.x有debian-menu，不然麻烦死…勉强能用，现在还有好多问题，好惨…

awesome wiki上有好多牛配置，在deviantart上也有一些比较好看的，still a
long way to go\~

\*cpu 貌似大部分时间\<=5%，厉害，记得以前用gnome一般都在15％～25%

\*key bindings弄好啦\~

\*tag names 搞定～

wallpaper有点问题，貌似和gnome冲突，每次restart
awesome壁纸就不见剩一片蓝灰…
