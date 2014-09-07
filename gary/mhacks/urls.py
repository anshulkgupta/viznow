
from django.conf.urls import patterns, include, url
from mhacks import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'mhacks.views.enter_page'),
    url(r'^trial/?$', 'mhacks.views.airline_page'),
    url(r'^home/?$', 'mhacks.views.home_page'),
    url(r'^uber/?$', 'mhacks.views.uber_page'),
    url(r'^page/Custom/fileupload/Bubble/YES/?$', 'mhacks.views.bubble_page'),
    url(r'^page/Custom/fileupload/Globe/YES/?$', 'mhacks.views.globe_page'),
    url(r'^page/Custom/fileupload/Chloropleth/YES/?$', 'mhacks.views.chloropleth_page'),
    url(r'^page/Custom/fileupload/Chord/YES/?$', 'mhacks.views.chord_page'),
    url(r'^page/Custom/fileupload/Line/YES/?$', 'mhacks.views.line_page'),
    url(r'^page/(?P<page>[A-Za-z0-9-_]+)/fileupload/(?P<id>[A-Za-z0-9-_]+)/?$', 'mhacks.views.fileupload_page'),
    url(r'^page/(?P<page>[A-Za-z0-9-_]+)/fileupload/(?P<id>[A-Za-z0-9-_]+)/final?$', 'mhacks.views.final_custom_page'),
    url(r'^upload/?$', 'mhacks.views.upload_page'),
    url(r'^upload/submit/?$', 'mhacks.views.handle_upload'),
    url(r'^page/(?P<id>[A-Za-z0-9-_]+)/*$', 'mhacks.views.upload_unique_page'),
    url(r'^page/(?P<page>[A-Za-z0-9-_]+)/(?P<id>[A-Za-z0-9-_]+)/?$', 'mhacks.views.visualization_page')
)