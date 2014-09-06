
from django.conf.urls import patterns, include, url
from mhacks import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'mhacks.views.enter_page'),
    url(r'^home/?$', 'mhacks.views.home_page'),
    url(r'^upload/?$', 'mhacks.views.upload_page')
)