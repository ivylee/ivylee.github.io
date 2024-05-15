---
publishDate: 2010-02-22T00:00:00
title: Tircd--tweet From Irssi!
---

actually, it’s nothing new, for anyone outside china.

i found this [tircd](http://code.google.com/p/tircd/ "tircd") several
months ago when googling for command line twitter clients. there are
many apps out there, but all without the feature of api proxy, which is
a fatal defect for chinese users since…well, the GFW. so i gave up on
looking for clients that support api proxy, instead, i tried global
proxy.

here i recommend [Paperbus](http://paperb.us/ "Paperbus") , the forever
free proxy service, which profits from occasinally popped-up sponsor
ads. though it had been blocked by GFW, the team got it back to work in
reasonable time. keep fighting with GFW!

setting global proxy is rather simple, using Paperbus for example:

open \~/.bashrc with your favourite editor, add

> export http\_proxy=http://127.0.0.1:3998

save, logout and then login.

pay attention to those perl modules tircd depends on when installing. in
my case i feel blessed that it’s in the aur. oh i love arch…

after installation,

> cp /etc/tircd.cfg \~/.tircd

now .tircd contains the config of tircd, modify if needed.

> tircd

starts the server. then in irssi,

> /server localhost PORT TWITTER\_PASSWORD TWITTER\_ACCOUNT

wait for the welcome message,

> /join \#twitter

wait for a little longer then you can start tweeting :) your followings
will be users in the channel and your latest tweet will be the topic.
it’s perfect for those who love chatting on IRC.

ps: oauth support for tircd can be found
[here](http://code.google.com/p/tircd/issues/detail?id=72 "oauth support tircd")
.

