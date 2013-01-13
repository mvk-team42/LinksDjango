from django.db import models


class Link(models.Model):
    """Describes a link"""
    href = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    pub_date = models.DateTimeField(u'date published')
    RATING = (
        (u'5', u'*****'),
        (u'4', u'****'),
        (u'3', u'***'),
        (u'2', u'**'),
        (u'1', u'*'),
    )
#    creator = models.ForeignKey(models.User)

    def __unicode__(self):
        return self.description
