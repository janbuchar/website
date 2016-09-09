#!/usr/bin/env python
from __future__ import unicode_literals

AUTHOR = 'Jan Buchar'
SITENAME = 'Jan Buchar'
SITEURL = '/'

PATH = 'content'
THEME = 'theme'
PLUGIN_PATHS = ['pelican-plugins']

PLUGINS = ['assets']

TIMEZONE = 'Europe/Prague'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Site structure
ARTICLE_URL = 'blog/{slug}.html'
ARTICLE_SAVE_AS = 'blog/{slug}.html'
CATEGORY_URL = 'blog/category/{slug}.html'
CATEGORY_SAVE_AS = 'blog/category/{slug}.html'
CATEGORIES_URL = 'blog/category/'
CATEGORIES_SAVE_AS = 'blog/category/index.html'
TAG_URL = 'blog/tag/{slug}.html'    
TAG_SAVE_AS = 'blog/tag/{slug}.html'    
TAGS_URL = 'blog/tag/'  
TAGS_SAVE_AS = 'blog/tag/index.html'
ARCHIVES_SAVE_AS = 'blog/archives/archives.html'
ARCHIVES_URL = 'blog/archives/archives.html'
AUTHOR_SAVE_AS = 'blog/{slug}.html'
AUTHORS_SAVE_AS = 'blog/authors.html'
PAGE_SAVE_AS = '{slug}.html'
PAGE_URL = '{slug}.html'
INDEX_SAVE_AS = 'blog/index.html'

DISPLAY_RECENT_POSTS_ON_SIDEBAR = True
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

MENUITEMS = (
    ('Blog', 'blog/'),
)

# Blogroll
LINKS = []

# Social widget
SOCIAL = (
    ('Github', 'https://github.com/Teyras'),
    ('Linkedin', 'https://www.linkedin.com/profile/view?id=285045605'),
    ('Stack overflow', 'https://stackoverflow.com/users/2839862/teyras?tab=profile')
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
