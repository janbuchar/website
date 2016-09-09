Title: My web development setup with uWSGI
Slug: web-development-setup-with-uwsgi
Date: 2016-09-05 21:05:00
Category: Web development
Tags: uwsgi, nginx, linux, web, python, php

Until recently, I've used pretty much the same LAMP environment I installed when 
I started with GNU/Linux. It had many drawbacks, the most important being 
cryptic configuration (hello, mod_rewrite) and the need to edit files as root 
when adding new applications using VirtualHosts. Also, running Python 
applications is quite a pain with Apache and mod_wsgi - most of the time, I just 
went with whatever development server my framework offered.

Then I stumbled upon uWSGI. I was blown away with how versatile this web 
application server is - it supports a plethora of programming languages, has a 
powerful routing system and loads of other features. I experimented with it for 
some time and this is the result - a flexible web development environment using 
uWSGI and Nginx.

## Pluggable applications with uWSGI

First, we'll start uWSGI in Emperor mode. It will monitor a path and make sure 
that all uWSGI configuration files found there are running. It also reloads the 
applications when their configuration changes. We'll be putting our applications 
in `~/WWW`, with the following structure:

~~~~~~~~~~~~~~
~/WWW
├── app1
│   ├── app1.ini
│   ├── file1
│   └── file2
└── app2
    ├── app2.ini
    ├── file1
    └── file2
~~~~~~~~~~~~~~

As we see, there is a folder for each application that contains its sources and 
also a uWSGI configuration file. The name of this file is used as the vassal 
name by the Emperor. We'll start the Emperor now:

~~~~~~~~~~~~~~{.shell}
uwsgi --emperor "~/WWW/*/*.ini" \
      --emperor-on-demand-directory /tmp/uwsgi/ \
      --logto %h/WWW/uwsgi.log \
      --vassals-set socket-chmod=666 \
      --vassals-set idle=900 \
      --vassals-set die-on-idle=1

~~~~~~~~~~~~~~

The `--emperor-on-demand-directory` flag tells the Emperor to make a UNIX domain 
socket for each application (named `<vassal_name>.socket`) in given directory 
and activate the application when someone connects to that socket. When we 
combine this with `--idle` and `--die-on-idle` on the vassals, we get a 
webserver that automatically stops unused applications and their daemons. 

We also need nginx to have read and write access to the sockets - that's why we 
set their permissions to 666. If we wanted to be a bit more strict, we could 
make a group for our user and nginx and `chown` the sockets to this group.

Now, let's add an application! This one will be in PHP, but use whatever you 
feel like. First, the "application" itself:

~~~~~~~~~~~~~~{.php}
# ~/WWW/testapp/index.php
<?php
echo "Hello from uWSGI";
~~~~~~~~~~~~~~

Now, we'll write the configuration file that tells uWSGI how to run it. 

~~~~~~~~~~~~~~{.ini}
# ~/WWW/testapp/testapp.ini
[uwsgi]
chdir = %d

# PHP settings
plugin = 0:php
php-docroot = %d
check-static = %d
php-app = %d/index.php
~~~~~~~~~~~~~~

Noticed the `0:` in the `plugin` option? This little detail is actually really 
important - it tells uWSGI to route HTTP requests to the PHP plugin. For more 
details, see the documentation for `modifier1`.

The Emperor should now notice the configuration file and run our application. 
It is however bound to a UNIX domain socket - to access it, we need a 
webserver to forward actual HTTP requests to it.

## Nginx - the fixed part

Nginx will serve as a gateway to our applications. It should pass requests to 
subdomains on localhost to corresponding UNIX domain sockets that belong to the 
uWSGI vassals - requests on `myapp.localhost` will be passed to 
`/tmp/uwsgi/myapp.socket`.

~~~~~~~~~~~~~~{.nginx}
# nginx.conf
http {
        server {
                listen 80;
                server_name ~^(?<app>[^.]+)\.localhost;

                location / {
                        include uwsgi_params;
                        uwsgi_pass unix:/tmp/uwsgi/$app.socket;
                }
        }
}
~~~~~~~~~~~~~~

This is not a complete configuration file - I only included the relevant parts. 
That being said, you should now be able to open `testapp.localhost` in a web 
browser and see the output!

## Bonus - running uWSGI with systemd

If you're running a recent GNU/Linux distribution, it's likely that you use 
systemd. One of its better features is that it lets users run their own services 
without any special privileges. We'll use that to make sure our uWSGI Emperor is 
always running. First, we create a systemd unit file:

~~~~~~~~~~~~~~{.ini}
# ~/.config/systemd/user/uwsgi-emperor.service
[Unit]
Description=uWSGI Emperor

[Service]
ExecStartPre=/usr/bin/mkdir -p /tmp/uwsgi/
ExecStartPre=/usr/bin/chmod 777 /tmp/uwsgi/
ExecStart=/usr/bin/uwsgi \
          --emperor "%h/WWW/*/*.ini" \
          --emperor-on-demand-directory /tmp/uwsgi/ \
          --logto %h/WWW/uwsgi.log \
          --vassals-set socket-chmod=666 \
          --vassals-set idle=900 \
          --vassals-set die-on-idle=1

[Install]
Alias=default.target

~~~~~~~~~~~~~~

Now we'll make sure that the uWSGI Emperor starts when we log in:

~~~~~~~~~~~~~~{.shell}
$ systemctl --user daemon-reload
$ systemctl --user enable uwsgi-emperor
$ systemctl --user start uwsgi-emperor
~~~~~~~~~~~~~~

## Conclusion

We have set up a development environment where we can program in Python, Ruby, 
PHP and tons of other languages (I also used it to run Pelican when I wrote this 
post). All our code runs under a regular user (if that wasn't enough, uWSGI can 
sandbox it using lxc). The applications are accessible with pretty URLs on the 
standard HTTP port, which makes it easy to test them on various devices.
