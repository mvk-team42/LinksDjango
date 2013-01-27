from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
import linkz


# Uncomment the next two lines to enable the admin:
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'linkz.views.home', name='home'),
    url(r'^fudge/(.*)$', 'linkz.views.super_slide'),
    url(r'^daniel$', 'linkz.views.daniel'),
    url(r'^search$', 'linkz.views.search'),
    # url(r'^links/', include('links.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
