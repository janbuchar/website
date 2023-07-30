#!/usr/bin/env python
from __future__ import unicode_literals
import os

AUTHOR = 'Jan Buchar'
SITENAME = 'Jan Buchar'
SITEURL = '/'
GOOGLE_ANALYTICS = 'UA-83918237-1'

PATH = 'content'
THEME = 'theme'
PLUGIN_PATHS = ['pelican-plugins']

PLUGINS = [
    'assets', 
    'i18n_subsites'
]

TIMEZONE = 'Europe/Prague'
DEFAULT_LANG = 'en'

I18N_UNTRANSLATED_ARTICLES = 'keep'
I18N_SUBSITES = {
    'cs': {}
}

DATE_FORMATS = { 
    'en': '%d/%m/%y',
    'cs': '%-d.%-m.%Y'
} 

ASSET_SOURCE_PATHS = [
    './',
]

language_map = {
    'en': 'English',
    'cs': 'Čeština'
}

JINJA_ENVIRONMENT = {'extensions': ['jinja2.ext.i18n']}
JINJA_FILTERS = {
    "basename": os.path.basename,
    "lang_name": lambda lang: language_map.get(lang, lang)
}

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Site structure
ARTICLE_URL = 'blog/{slug}.html'
ARTICLE_SAVE_AS = 'blog/{slug}.html'
ARTICLE_LANG_URL = 'blog/{slug}-{lang}.html'
ARTICLE_LANG_SAVE_AS = 'blog/{slug}-{lang}.html'
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

# Sidebar and menu
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
    ('Github', 'https://github.com/janbuchar'),
    ('Linkedin', 'https://www.linkedin.com/in/jan-buchar'),
    ('Stack overflow', 'https://stackoverflow.com/users/2839862/teyras?tab=profile')
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
