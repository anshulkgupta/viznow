
from django.conf.urls import patterns, include, url
from mhacks import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'mhacks.views.enter_page'),
    url(r'^home/?$', 'mhacks.views.home_page'),
    url(r'^upload/?$', 'mhacks.views.upload_page'),
    url(r'^page/(?P<id>[A-Za-z0-9-_]+)/*$', 'mhacks.views.upload_unique_page'),
    url(r'^page/(?P<page>[A-Za-z0-9-_]+)/(?P<id>[0-9]+)/?$', 'mhacks.views.visualization_page')
)