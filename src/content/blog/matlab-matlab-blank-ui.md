---
publishDate: 2009-07-29T00:00:00
title: Matlab! 界面白色！
---

杯具！

中午出去吃完kfc，饱死…

准备做题，谁知道matlab 打开一片白色，只能看到几个label(workspace,
current directory, etc.)…

一定是awesome弄的！

Logout, choose gnome session，awesome还在，覆盖在gnome
panel上，开matlab效果一样…

胡乱google了一下之后才明白matlab是用java作界面，想起awesome
wiki好像有讲到java的问题，终于找到solution:

[GUI Java apps appear as a gray
screen!](http://awesome.naquadah.org/wiki/FAQ#GUI_Java_apps_appear_as_a_gray_screen.21 "from awesome wiki")

down了 [wmname](http://tools.suckless.org/wmname "wmname")
源码，懒得编译，直接到synaptic search
dwm-tools，装埋个dwm也不是很大，或许以后有用…

哇哈哈，在terminal

> wmname LG3D matlab

搞定！

简单的方法还是在.xinitrc里加入wmname LG3D，以后不用烦恼哈

从1点多荒废到2点半…做题！

