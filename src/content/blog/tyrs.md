---
publishDate: 2011-11-07T00:00:00
title: Tyrs
---

came across this great ncurses twitter client from hackernews feed which
i just subscribed few days ago.

it’s like bitlbee+irssi, it’s like TTYtter and it’s not.

[![](http://sychopx.files.wordpress.com/2011/11/2011-11-07-220506_1280x800_scrot.png?w=300 "2011-11-07-220506_1280x800_scrot")](http://sychopx.files.wordpress.com/2011/11/2011-11-07-220506_1280x800_scrot.png)

i think it’s much more elegant, functional and user-friendly.

it’s developed by a french guy who uses arch linux. WE ARCHERS can get
tyrs by firing up yaourt -S tyrs :) available on other major linux
distributions as well. fairly thorough documentation, easy to start.

this nice french guy introduced tyrs on his
[blog](http://www.nicosphere.net/tyrs-a-microblogging-client-based-on-ncurses-2534/ "Tyrs")
/ *seems beyond the wall, u know* / and started a discussion
[thread](https://bbs.archlinux.org/viewtopic.php?id=119588) on arch
linux forum which he does follow closely and reply and
[here](http://tyrs.nicosphere.net/index.html) is project homepage with
the link to github repo

alrite. Chinese style of using tyrs:

oauth: ssh\>socks proxy\>proxychains tyrs

use polipo to turn socks5 proxy into http proxy.

setup tyrs proxy: (it’s implemented in the latest release version of
tyrs, instruction not on docs yet)

edit \~/.config/tyrs/tyrs.cfg

in section [params], add

> proxy = [http\_proxy\_address]:[port]

or

> proxy = [username]:[password]@[http\_proxy\_address]:[port]

note: do not prefix “http://” in the address

issues regarding the wall, the obstacle to twitter should be gone now.

bunch of things u can customize, layouts, colors, keybindings etc. one
particular nice idea of tyrs is its activity bar, showing new tweet
counts in home tab, mention tab etc., good visual notification.

i believe adding support for twitter api proxy is possible tho
personally i’m not interested. i think requesting api support is too
much for non Chinese developers. tyrs comes with support for identica,
worth trying with twitter api.

tyrs has the greatest potential of becoming my favourite twitter desktop
client. it’s neat, simplistic, elegant and fully functional,
customizable. hope more ppl will see the beauty of it.

