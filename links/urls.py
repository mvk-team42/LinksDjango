from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^lemonparty/$', 'lemonparty.views.index'),
    url(r'^lemonparty/time$', 'lemonparty.views.current_datetime'),
    url(r'^admin/', include(admin.site.urls)),
)