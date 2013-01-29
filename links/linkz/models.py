from django.db import models


class Link(models.Model):
    """Describes a link"""
    href = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    pub_date = models.DateTimeField(u'date published', auto_now=True)
    RATING = (
        (u'5', u'*****'),
        (u'4', u'****'),
        (u'3', u'***'),
        (u'2', u'**'),
        (u'1', u'*'),
    )
    ratingz = models.CharField(max_length=5, choices=RATING)

    def __unicode__(self):
        return self.description
        
class Publication(models.Model):
    """Some form of published information"""
    href = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=200, blank=True)

    source = models.CharField(max_length=200)    

    RATING = (
        (u'5', u'*****'),
        (u'4', u'****'),
        (u'3', u'***'),
        (u'2', u'**'),
        (u'1', u'*'),
    )
    trustworthy = models.CharField(max_length=5, choices=RATING)
    
    def __unicode__(self):
        return self.title

class Source(models.Model):
    """A source of publication(s)"""
    name = models.CharField(max_length=200)
    source_type = models.CharField(max_length=200)
    tag = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    
    RATING = (
        (u'5', u'*****'),
        (u'4', u'****'),
        (u'3', u'***'),
        (u'2', u'**'),
        (u'1', u'*'),
    )
    rating = models.CharField(max_length=5, choices=RATING)
    
    def __unicode__(self):
        return self.name

class Daniel(models.Model):
	"""Describes a Daniel"""
	name = models.CharField(max_length=6)
	description = models.CharField(max_length=30)
	nose_job = models.BooleanField()

	def __unicode__(self):
		return self.name

	#    creator = models.ForeignKey(models.User)
	

