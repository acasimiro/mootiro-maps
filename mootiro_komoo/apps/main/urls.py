#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # unicode by default
from django.conf.urls.defaults import *


urlpatterns = patterns('main.views',
    url(r'', 'root', name='root'),
)
