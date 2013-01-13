from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^lemonparty/template/(?P<low_prime>\d+)/(?P<high_prime>\d+)/$', 'lemonparty.views.template'),
    url(r'^lemonparty/primes/(?P<prime_ceiling>\d+)/$', 'lemonparty.views.primes'),
    url(r'^admin/', include(admin.site.urls)),
)