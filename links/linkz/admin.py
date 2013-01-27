from models import Link, Daniel
from django.contrib import admin

class LinkAdmin(admin.ModelAdmin):
    list_display = ('description', 'href', 'ratingz')
    search_fields =('description','href',)
    ordering = ('description',)

admin.site.register(Link, LinkAdmin)
admin.site.register(Daniel)
