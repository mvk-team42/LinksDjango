from models import Link, Daniel, Publication, Source
from django.contrib import admin

class LinkAdmin(admin.ModelAdmin):
    list_display = ('description', 'href', 'ratingz')
    search_fields =('description','href',)
    ordering = ('description',)

admin.site.register(Link, LinkAdmin)
admin.site.register(Daniel)
admin.site.register(Publication)
admin.site.register(Source)
