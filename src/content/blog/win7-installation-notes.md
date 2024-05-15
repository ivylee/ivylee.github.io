---
publishDate: 2009-10-01T00:00:00
title: Win7 Installation Notes
---

放假前两天，因为给断网弄疯了，心血来潮要把vista杀掉，装个win7。

用的是英文版ultimate 16835，我啥都没准备，用alcohol 52
mount了之后就一路走下去，本以为安装过程中的重启会出现问题，因为重启后虚拟光驱就没了，才知道安装前把所需文件都copy到机器上了，非常顺利，不到半小时就装完了。

重启一下，grub自然是不见了，安装过程中win7和vista并存时用的是windows
boot
manager(如果没记错)。因为我选择的是全新安装，所以安装完成后vista会消失，留下一个20G巨大的windows.old，delete之。重启进入win7，显示正常，wifi
正常，连我的acer crystal
camera也正常，驱动有问题的是synaptics的scrolling用不了，fingerprint
sensor识别出来了，联网后windows update提供了fingerprint sensor的驱动，nv
corresponding
驱动在optional里面，我还手动装了synaptics的驱动，能找到的驱动都装好后device
manager里面还有4个设备没能正常工作，待查。

在执行windows
update前需要联网，在学校用个dr.com真是痛苦。首先要将dr.com的安装文件和winpcap的安装文件设置成以vista兼容模式运行，在安装dr.com完成提示装winpcap
4.0的时候，取消并安装winpcap 4.1 beta，因为winpcap
4.0貌似封装在dr.com的安装程序里，直接安装会有错误，运行模式不知道在哪里改。成功安装dr.com后，为保证顺利运行，先disable掉无线网卡，因为多网卡有可能引起dr.com找不到服务器，好鬼烦！

弄好dr.com，可以正常连接网络，可是频繁断网的问题未解决，solution是装arp防火墙，可是我找来找去没找到好的，试了一下360arp防火墙，结果它把整个360卫士都装了，恶心…希望能找到国外的软件，干净高效的。

在win7 装了chrome, pidgin, mplayer, tm2009 beta,
thunder…都能正常运行，我想如果有错误一般用兼容模式运行就没问题了。差点忘了那个XE的crack\~

至此win7没啥好折腾的了哈哈

399RMB的系统今天上市

