---
publishDate: 2010-07-14T00:00:00
title: Base64 Encrypted Pac File on Opera
---

as an enthusiast of the sport *climbing over the wall* as well as an
opera fans, it puzzled me greatly when i found out opera on linux cannot
use the latest autoproxy.pac from the familiar
[autoproxy2pac](http://autoproxy2pac.appspot.com/) . i tried to open
with vim and compare the old and new pac files, found out that the old
one was clearly structured, recognizable while the new one was a bunch
of weird code. i had absolutely no idea what the new one was about.

so for a long time, i stuck with the old pac file and of course that
wasn’t convenient at all cuz the gfw team kept working so should the pac
file be updating.

lately when i was trying to modify the old pac file, i googled and found
[this](http://bbs.operachina.com/viewtopic.php?f=30&t=78095) post. yep,
now the problem is quite clear! the new pac file is base64 encrypted! so
to get the new pac file working on opera for linux,

> vim autoproxy.pac

delete everything before and including

> ﻿﻿﻿﻿﻿decode64(”

and

> ”))

at the end of the pac file. then :wq(save and exit). in terminal,

> base64 -d autoproxy.pac \> autoproxy\_new.pac

then opera for linux can read autoproxy\_new.pac :)

\*opera for win can read the new pac file without any problem. opera for
win also cannot read encrypted pac file.

