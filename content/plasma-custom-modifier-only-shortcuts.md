Title: Custom modifier-only shortcuts in Plasma 5.8
Slug: plasma-custom-modifier-only-shortcuts
Lang: en
Date: 2016-10-07 15:00:00
Category: KDE
Tags: KDE, Plasma, KWin, Linux

The latest release of KDE Plasma (5.8) brought a new feature - it can open the 
desktop menu when the meta (super, Windows...) key is pressed. Like in Windows 
XP, remember? Alas, it's not yet possible to configure this to do something more 
useful in the GUI, however weird this seems in a LTS release. After digging in 
KWin's source code for a while, I found a way to set custom shortcuts in the 
config files.

First, make sure KWin isn't running. I recommend opening a terminal and running 
`killall kwin_x11`. Now let's say we'd like to open krunner when Meta is pressed 
and the desktop menu should be opened with Shift. Edit `~/.config/kwinrc` and 
add the following lines:

~~~~~~~~~~~~~~~~~~
[ModifierOnlyShortuts]
Meta=org.kde.krunner,/App,,display
Shift=org.kde.plasmashell,/PlasmaShell,org.kde.PlasmaShell,activateLauncherMenu
Alt=
Control=
~~~~~~~~~~~~~~~~~~

The double comma in the `Meta` value is not a typo. It means something like that 
the called function is not in a namespace, in contrast to the function in the 
`Shift` value. An empty value means no action will be bound to the modifier.

Now, you just need to run KWin again with `kwin_x11 --replace` and everything 
should work. Note that it should be possible to bind any qdbus call to a 
modifier key like this. Try using `qdbusviewer` to explore the possibilites!
