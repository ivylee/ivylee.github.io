---
publishDate: 2012-10-22T10:00:00
title: Working With SAS on Columbia Unix Server
---

I’m taking two courses that use SAS this semester because SAS is rather
widely used in industry. But it’s expensive and few students taking the
same classes ever talked about buying the licence. So I have to use SAS
on unix server, and this is rather painful experience.

1.  SSH into unix server is not a problem, but Kerberos authentication
    keeps asking for password whenever a connection is made, which means
    when SSH into the unix server and exchanging files between remote
    and local. having to type password over and over again is nightmare.
2.  SAS version on unix server is quite old, 9.1.3 compared to 9.2 in
    computer labs.
3.  the GUI of SAS unix can be launched by ssh -X, but it depends on the
    xserver of local, and I don’t like the experience.
4.  some command line options better be added when running SAS on
    remote, to suppress unnecessary logging.
5.  the SAS licence own by Columbia is expiring in about a month, SAS
    keeps popping warning messages in log file and there is no way to
    suppress them.

To address problem 1, solution I found so far is to obtain a Kerberos
ticket valid for 10 hours so one does not have to enter password for a
period of time, but it’s not a thorough solution due to the nature of
Kerberos, there’s no way to avoid entering password forever.

The following is only tested on Mac OS X 10.8.2, solution should be
similiar on Unix/Linux machines.

    $ scp [uni]@cunix.cc.columbia.edu:/etc/krb5.conf ~/

    $ sudo mv ~/krb5.conf /etc/
    $ sudo vim /etc/krb5.conf
        # add the following in [libdefaults] section
        forward = true
        forwardable = true
        renewable = true
      :wq

    $ vim ~/.ssh/config
        # add the following lines
        GSSAPIAuthentication yes
        GSSAPIDelegateCredentials yes
      :wq

    $ kinit [uni] # enter password
    $ klist # to check ticket status
    $ ssh [uni]@cunix.cc.columbia.edu # should connect without prompting password

To make life easier, add some shortcuts

    $ vim ~/.bashrc
        alias cussh='ssh [uni]@cunix.cc.columbia.edu'
        export unixhome=[uni]@cunix.cc.columbia.edu:[$home location]
      :wq

    # login to remote server
    $ cussh
    # uploading
    $ scp [local files] $unixhome/[remote location]
    # downloading
    $ scp $unixhome/[remote files] [local]

Each ticket is only valid for 10 hrs, which is a parameter set on
Kerberos server. Ticket can be renewed before expiration by

    $ kinit -R

Ref & further info:

-   [Kerberos
    doc](http://web.mit.edu/kerberos/krb5-current/doc/krb_users/tkt_mgmt.html)
-   [Kerbenize ssh
    client](https://weblion.psu.edu/trac/weblion/wiki/KerberizeYourSshClient)
-   [kinit automatically when
    necessary](http://www.ugcs.caltech.edu/Kerberized_SSH.xhtml)
-   [Kerberos with PAM under
    Lion](http://coxmanagement.wordpress.com/2012/05/07/kerberos-authentication-under-lion/)

For problem 2 and 3, stop by computer labs to use SAS 9.2 on Windows
machine with GUI.

Some options to supply on command line:

    sas -nodms -nonews [program.sas]

Other options to put in \*.sas file:

    options nodate nonumber nocenter ls=70 ps=80;

As for problem 5, hopefully Columbia will upgrade SAS to 9.2 or 9.3.
Just see what happens.

